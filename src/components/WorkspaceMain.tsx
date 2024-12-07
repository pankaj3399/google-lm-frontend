import {
    Info,
    X,
    Copy,
    Pin,
    ThumbsUp,
    ThumbsDown,
    Trash,
    Check,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { useParams } from "react-router-dom";
import SingleNote from "./ui/SingleNote";
import useUserStore from "../store/userStore";
import toast from "react-hot-toast";
import { UserButton, useUser } from "@clerk/clerk-react";
import apiClient, { setAuthToken } from "../api/axiosClient";
import { useAuth } from "@clerk/clerk-react";
import download from "../assets/download.svg";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import markdownToTxt from "markdown-to-txt";
import axios from "axios";
import {
    Dialog,
    DialogTrigger,
    DialogClose,
    DialogContent,
} from "../components/ui/dialog";
import ReactMarkdown from "react-markdown";
import icon6 from "../assets/icon6.svg";
import icon7 from "../assets/icon7.svg";

const API_URL = import.meta.env.VITE_API_URL;

interface Note {
    _id: string;
    heading: string;
    content: string;
    updatedAt: string;
    createdAt: string;
    type: string;
}

interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

interface WorkspaceMainProps {
    handleNewNoteDisplay: () => void;
    checkedSource: boolean[];
}

interface Chat {
    message: string;
    owner: string;
}

interface ReportCategory {
    category: string;
    options: string[];
}

const reportCategories: ReportCategory[] = [
    {
        category: "Product Performance Reports",
        options: [
            "Product Usage Analysis",
            "Product Quality and Error Tracking",
        ],
    },
    {
        category: "User Experience (UX) Reports",
        options: [
            "User Engagement and Behaviour Analysis",
            "User Frustration and Drop-off Points",
        ],
    },
    {
        category: "Sales Performance Reports",
        options: [
            "Sales Performance by Product Category",
            "Customer Acquisition Cost and ROI",
        ],
    },
    {
        category: "Conversion Funnel Reports",
        options: [
            "Funnel Conversion Rate Analysis",
            "Checkout Process Optimization Report",
        ],
    },
];

const suggestions = [
    "Summarise",
    "Help me understand",
    "Critique",
    "Key insights",
    "Audit",
];

const pullData = [
    {
        type: "activeUsers",
        isChecked: false,
    },
    {
        type: "eventCount",
        isChecked: false,
    },
    {
        type: "userEngagementDuration",
        isChecked: false,
    },
    {
        type: "sessions",
        isChecked: false,
    },
    {
        type: "newUsers",
        isChecked: false,
    },
    {
        type: "totalUsers",
        isChecked: false,
    },
    {
        type: "screenPageViews",
        isChecked: false,
    },
    {
        type: "bounceRate",
        isChecked: false,
    },
    {
        type: "averageSessionDuration",
        isChecked: false,
    },
    {
        type: "transactions",
        isChecked: false,
    },
    {
        type: "totalRevenue",
        isChecked: false,
    },
    {
        type: "itemListClickThroughRate",
        isChecked: false,
    },
];

const WorkspaceMain: React.FC<WorkspaceMainProps> = ({
    handleNewNoteDisplay,
    checkedSource,
}) => {
    const { workspaceId } = useParams();
    const [workspaceName, setWorkspaceName] = useState("");
    const [newWorkspaceName, setNewWorkspaceName] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [generateReportText, setGenerateReportText] = useState("");
    const {
        notes,
        sources,
        propertyId,
        setNotes,
        setSelectedNote,
        addNote,
        setIntegrationPopup,
        setSourcePopup,
        deleteNote,
        setGoogleAnalytics,
        setPropertyId,
    } = useUserStore();
    const [inputChat, setInputChat] = useState("");
    const [chats, setChats] = useState<Chat[]>([]);
    const [chatSection, setChatSection] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { getToken } = useAuth();
    const { user } = useUser();
    const [selectedSummary, setSelectedSummary] = useState<string | null>(null);
    const [firstScreen, setFirstScreen] = useState(false);
    const [secondScreen, setSecondScreen] = useState(false);
    const [pullDataLoading, setPullDataLoading] = useState(false);
    const [generateReportLoading, setGenerateReportLoading] = useState(false);
    const [pullDataResponse, setPullDataResponse] = useState("");
    const [dataToShowOnPull, setDataToShowOnPull] = useState(pullData);
    const [dates, setDates] = useState<DateRange>({
        startDate: null,
        endDate: null,
    });
    const [selectedNotes, setSelectedNotes] = useState<boolean[]>(
        new Array(notes.length).fill(false)
    );
    const handleSelectAll = () => {
        setSelectedNotes(new Array(notes.length).fill(true));
    };
    const handleDeselectAll = () => {
        setSelectedNotes(new Array(notes.length).fill(false));
    };
    const handleToggleNote = (index: number) => {
        setSelectedNotes((prev) =>
            prev.map((selected, i) => (i === index ? !selected : selected))
        );
    };
    const [selected, setSelected] = useState<{
        category: string;
        option: string;
    } | null>(null);

    const handleSelection = (category: string, option: string) => {
        setSelected({ category, option });
    };

    useEffect(() => {
        setSelectedNotes((prevSelected) => {
            const newSelected = new Array(notes.length).fill(false);
            for (
                let i = 0;
                i < Math.min(prevSelected.length, newSelected.length);
                i++
            ) {
                newSelected[i] = prevSelected[i];
            }
            return newSelected;
        });
    }, [notes]);

    useEffect(() => {
        fetchWorkspace();
        fetchAllNotes();
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [chats]);

    const deleteSelectedNotes = async () => {
        const selectedIds = notes
            .filter((_, index) => selectedNotes[index])
            .map((note) => note._id);

        if (selectedIds.length === 0) {
            toast.error("No notes selected for deletion.");
            return;
        }
        const token = await getToken();
        setAuthToken(token);

        try {
            const response = await apiClient.delete(
                `${API_URL}/api/users/deleteNotes`,
                {
                    data: { noteIds: selectedIds, workspaceId },
                }
            );

            if (response.status === 200) {
                toast.success(response.data.message);
                deleteNote(selectedIds);
                handleDeselectAll();
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.status);
                console.error(error.response);
                toast.error(error.response?.data.message);
            } else {
                console.error(error);
            }
        }
    };

    const fetchAllNotes = async () => {
        try {
            const token = await getToken();
            setAuthToken(token);

            const resp = await apiClient.get(
                `${API_URL}/api/users/getAllNotes/${workspaceId}`
            );
            setNotes(resp.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.status);
                console.error(error.response);
                toast.error(error.response?.data.message);
            } else {
                console.error(error);
            }
        }
    };

    const fetchWorkspace = async () => {
        try {
            const token = await getToken();
            setAuthToken(token);

            const resp = await apiClient.get(
                `${API_URL}/api/users/getWorkspace/${workspaceId}`
            );
            setWorkspaceName(resp.data.workspace.name);
            setNewWorkspaceName(resp.data.workspace.name);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.status);
                console.error(error.response);
                toast.error(error.response?.data.message);
            } else {
                console.error(error);
            }
        }
    };

    function addChat(message: string, owner: string) {
        setChats((prevChats) => [...prevChats, { message, owner }]);
    }

    const handleChat = async () => {
        if (inputChat === "") {
            toast.error("Please provide some context");
            return;
        }
        try {
            setChatSection(true);
            let content = "";
            content += checkedSource.map((isChecked, index) => {
                if (isChecked) {
                    return sources[index].summary;
                }
                return null;
            });
            content += selectedNotes.map((isChecked, index) => {
                if (isChecked) {
                    return notes[index].content;
                }
                return null;
            });
            addChat(inputChat, "Me");

            const token = await getToken();
            setAuthToken(token);

            const resp = await apiClient.post(
                `${API_URL}/api/users/createConversation`,
                {
                    question: inputChat,
                    context: content,
                    clerkId: user?.id,
                }
            );
            setInputChat("");
            addChat(resp.data.message, "GPT");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.status);
                console.error(error.response);
                toast.error(error.response?.data.message);
            } else {
                console.error(error);
            }
        }
    };

    function getContext(content: string, Word: string) {
        switch (Word) {
            case "Summarise":
                return `Summarise the information in Title with this content ${content}.
Make sure that it’s easy to understand and contains the primary information in bullet points.`;
            case "Help me understand":
                return `Help me understand the Title information from the following data ${content}. Give simple examples which make sense in this case.`;
            case "Combine":
                return `Combine the following information into one easy-to-understand content.Use the following: ${content}`;
            case "Critique":
                return `Critique the content provided below and see if there is something we can improve.Title Content: ${content}`;
            case "Key insights":
                return `Provide the key insights for the data below. Title ${content}`;
            case "Audit":
                return `Audit the content and help me understand the Title data provided here: ${content}`;
            default:
                return "";
        }
    }

    const handleChatWithSuggestion = async (Word: string) => {
        try {
            setChatSection(true);
            let content = "";
            content += checkedSource.map((isChecked, index) => {
                if (isChecked) {
                    return sources[index].summary;
                }
                return null;
            });
            content += selectedNotes.map((isChecked, index) => {
                if (isChecked) {
                    return notes[index].content;
                }
                return null;
            });
            if (content === "") {
                toast.error("Please select some context");
                return;
            }
            addChat(Word, "Me");

            const token = await getToken();
            setAuthToken(token);

            const questions = getContext(content, Word);

            const resp = await apiClient.post(
                `${API_URL}/api/users/createConversation/suggestion`,
                {
                    question: questions,
                    clerkId: user?.id,
                }
            );
            setInputChat("");
            addChat(resp.data.message, "GPT");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.status);
                console.error(error.response);
                toast.error(error.response?.data.message);
            } else {
                console.error(error);
            }
        }
    };

    const handleSaveNote = async (content: string, indx: number) => {
        try {
            const token = await getToken();
            setAuthToken(token);

            const resp = await apiClient.post(
                `${API_URL}/api/users/createNewNote/${workspaceId}`,
                {
                    heading: chats[indx - 1].message,
                    content: content,
                    type: "Saved",
                }
            );
            addNote(resp.data.savedNote);
            toast.success("Successfully added");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.status);
                console.error(error.response);
                toast.error(error.response?.data.message);
            } else {
                console.error(error);
            }
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewWorkspaceName(e.target.value);
    };

    const handleSaveName = async () => {
        if (newWorkspaceName.trim() === "") {
            toast.error("Workspace name cannot be empty.");
            setNewWorkspaceName(workspaceName);
            setIsEditing(false);
            return;
        }

        try {
            const token = await getToken();
            setAuthToken(token);

            const resp = await apiClient.put(
                `${API_URL}/api/users/rename-workspace`,
                {
                    _id: workspaceId,
                    name: newWorkspaceName,
                }
            );

            if (resp.status === 200) {
                setWorkspaceName(newWorkspaceName);
                toast.success("Workspace name updated successfully!");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.status);
                console.error(error.response);
                toast.error(error.response?.data.message);
            } else {
                console.error(error);
            }
        } finally {
            setIsEditing(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSaveName();
        } else if (e.key === "Escape") {
            setNewWorkspaceName(workspaceName);
            setIsEditing(false);
        }
    };

    const handleBlur = () => {
        setNewWorkspaceName(workspaceName);
        setIsEditing(false);
    };

    const handleGenerateReport = async () => {
        const { startDate, endDate } = dates;

        if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }

        const data = {
            startDate: dayjs(startDate).format("YYYY-MM-DD"),
            endDate: dayjs(endDate).format("YYYY-MM-DD"),
            generateReportText: generateReportText + selected?.option,
            clerkId: user?.id,
        };
        try {
            const token = await getToken();
            setAuthToken(token);
            setGenerateReportLoading(true);

            const resp = await apiClient.post(
                `${API_URL}/api/users/getWorkspace-report/${workspaceId}`,
                data
            );
            setSelectedSummary(resp.data.summary);
            setFirstScreen(true);
            setGenerateReportText("");
            setDates({
                startDate: null,
                endDate: null,
            });
            setGenerateReportLoading(false);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.status);
                console.error(error.response);
                toast.error(error.response?.data.message);
            } else {
                console.error(error);
            }
        }
    };

    const handleSaveReport = async (
        content: string,
        heading: string,
        type: string
    ) => {
        try {
            const token = await getToken();
            setAuthToken(token);

            const resp = await apiClient.post(
                `${API_URL}/api/users/createNewNote/${workspaceId}`,
                {
                    heading: heading,
                    content: content,
                    type: type,
                }
            );
            addNote(resp.data.savedNote);
            toast.success("Successfully added");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.status);
                console.error(error.response);
                toast.error(error.response?.data.message);
            } else {
                console.error(error);
            }
        }
    };

    const handlePullDataCheck = (index: number) => {
        setDataToShowOnPull((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, isChecked: !item.isChecked } : item
            )
        );
    };

    const handlePullData = async () => {
        if (!propertyId) {
            toast.error("Please link your Google Analytics account.");
            return;
        }

        const selectedMetrics = dataToShowOnPull
            .filter((item) => item.isChecked)
            .map((item) => item.type);

        if (
            !dates.startDate ||
            !dates.endDate ||
            selectedMetrics.length === 0
        ) {
            toast.error("Please select a date range and at least one metric.");
            return;
        }

        if (selectedMetrics.length > 10) {
            toast.error("Please select only 10 metrics at a time.");
            return;
        }

        try {
            const token = await getToken();
            setAuthToken(token);
            setPullDataLoading(true);
            const response = await apiClient.post(
                `${API_URL}/api/users/analytics/report-for-workspace`,
                {
                    clerkId: user?.id,
                    startDate: dates.startDate.toISOString().split("T")[0],
                    endDate: dates.endDate.toISOString().split("T")[0],
                    metrics: selectedMetrics,
                }
            );

            setSecondScreen(true);
            setPullDataResponse(response.data);
            setPullDataLoading(false);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const statusCode = error.response?.status;

                if (statusCode === 410) {
                    toast.error(
                        "Your Google Analytics token has expired. Please re-link your account."
                    );
                    setGoogleAnalytics(false);
                    setPropertyId(false);
                } else {
                    toast.error(
                        error.response?.data?.message ||
                            "An error occurred while fetching the report."
                    );
                }
            } else {
                console.error(error);
                toast.error("An unexpected error occurred.");
            }
        }
    };

    const handleDownload = () => {
        const doc = new jsPDF();
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        const text = selectedSummary;
        const margin = 10; 
        const pageWidth = doc.internal.pageSize.getWidth(); 
        const maxWidth = pageWidth - 2 * margin;
    
        const textLines = doc.splitTextToSize(text as string, maxWidth);
    
        doc.text(textLines, margin, margin + 10);
    
        doc.save("summary.pdf");
    };

    return (
        <div className="h-screen w-[80%] flex flex-col">
            <div className="h-14 flex items-center justify-between border-b border-gray-200 bg-white pl-5 pr-5">
                {isEditing ? (
                    <input
                        className="text-gray-600 text-xl outline-none px-2 py-1"
                        value={newWorkspaceName}
                        onChange={handleNameChange}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        autoFocus
                    />
                ) : (
                    <p
                        className="text-gray-600 text-xl cursor-pointer"
                        onClick={() => setIsEditing(true)}
                    >
                        {workspaceName || "Untitled Workspace"}
                    </p>
                )}
                <UserButton />
            </div>

            <div
                className="flex-1 w-full p-6 overflow-y-auto relative"
                ref={containerRef}
            >
                {chatSection ? (
                    <>
                        {chats.length > 0 ? (
                            chats.map((chat, indx) => (
                                <div
                                    key={indx}
                                    className={`w-full flex ${
                                        chat.owner === "Me"
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >
                                    <p
                                        className={`max-w-[80%] bg-slate-100 p-3 mt-5 rounded-b-md listItem tracking-wide shadow-lg`}
                                    >
                                        {chat.owner === "GPT" ? (
                                            <ReactMarkdown>
                                                {chat.message}
                                            </ReactMarkdown>
                                        ) : (
                                            chat.message
                                        )}
                                        {chat.owner === "GPT" ? (
                                            <div className="flex justify-between pt-2 items-center">
                                                <div className="flex gap-1">
                                                    <Copy
                                                        size={15}
                                                        className="cursor-pointer"
                                                    />
                                                    <ThumbsUp
                                                        size={15}
                                                        className="cursor-pointer"
                                                    />
                                                    <ThumbsDown
                                                        size={15}
                                                        className="cursor-pointer"
                                                    />
                                                </div>
                                                <div
                                                    className="flex items-center bg-[#FFFFFF] p-2 gap-1 rounded-md cursor-pointer hover:bg-gray-200"
                                                    onClick={() =>
                                                        handleSaveNote(
                                                            chat.message,
                                                            indx
                                                        )
                                                    }
                                                >
                                                    <Pin size={16} />
                                                    <span>
                                                        Save to Workspace
                                                    </span>
                                                </div>
                                            </div>
                                        ) : null}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div>
                                <h1 className="text-2xl text-gray-500">
                                    Please start conversation
                                </h1>
                            </div>
                        )}

                        <X
                            className="fixed right-5 top-16 cursor-pointer"
                            onClick={() => setChatSection(false)}
                        />
                    </>
                ) : (
                    <>
                        <div className="flex w-full gap-5  h-4">
                            <div
                                className="flex items-center cursor-pointer gap-1"
                                onClick={() => {
                                    setSelectedNote(-1);
                                    handleNewNoteDisplay();
                                }}
                            >
                                <img src={icon7} alt="add note" className="h-[18px]"/>
                                <span className="text-gray-600">Add Note</span>
                            </div>
                            {notes.length > 0 && (
                                <>
                                    <Dialog>
                                        <DialogTrigger className="flex items-center">
                                            <div className="flex items-center cursor-pointer">
                                                <Trash className="h-5 text-gray-600" />
                                                <span>Delete</span>
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent className="flex flex-col w-60">
                                            <h3>Delete Selected Notes</h3>
                                            <DialogClose className="flex gap-2">
                                                <button className="p-3 hover:bg-slate-200 text-blue-600 rounded-md">
                                                    Cancel
                                                </button>
                                                <button
                                                    className="p-3 hover:bg-slate-200 text-blue-600 rounded-md"
                                                    onClick={
                                                        deleteSelectedNotes
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </DialogClose>
                                        </DialogContent>
                                    </Dialog>
                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={handleSelectAll}
                                    >
                                        <Check className="h-5 text-gray-600" />
                                        <span>Select all</span>
                                    </div>
                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={handleDeselectAll}
                                    >
                                        <X className="h-5 text-gray-600" />
                                        <span>Deselect all</span>
                                    </div>
                                </>
                            )}
                        </div>
                        {notes.length > 0 ? (
                            <div className="flex mt-2 w-full  flex-wrap">
                                {notes.map((note: Note, indx) => (
                                    <SingleNote
                                        key={note._id}
                                        indx={indx}
                                        heading={note?.heading}
                                        content={note?.content}
                                        type={note?.type}
                                        updatedAt={note?.updatedAt}
                                        createdAt={note?.createdAt}
                                        selectedNotes={selectedNotes}
                                        handleToggleNote={handleToggleNote}
                                        handleNewNoteDisplay={
                                            handleNewNoteDisplay
                                        }
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[calc(100vh-250px)]">
                                <h2 className="text-4xl text-gray-700 mb-2">
                                    Your saved work will appear here
                                </h2>
                                <p className="text-gray-600 mb-6 w-96 text-center">
                                    Thanks for choosing MetricsLM. Your next
                                    steps are to add integrations or sources in
                                    your workspace.
                                </p>
                                <div className="flex">
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                        onClick={setIntegrationPopup}
                                    >
                                        Add Integrations
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-white text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50"
                                        onClick={setSourcePopup}
                                    >
                                        Add Sources
                                    </button>
                                </div>
                                <a
                                    href="#"
                                    className="text-blue-500 hover:underline mt-4"
                                >
                                    Learn how
                                </a>
                            </div>
                        )}
                    </>
                )}
            </div>

            <div className="w-full h-32">
                <div className="flex flex-col w-[90%] p-5 border-t bg-white border-gray-200 rounded-t-xl shadow-lg shadow-blue-500/50 items-center h-full justify-center mx-auto">
                    <div className="flex gap-2">
                        {(selectedNotes.some(Boolean) ||
                            checkedSource.some(Boolean)) &&
                            suggestions.map((suggestion, indx) => (
                                <div
                                    className="p-2 bg-slate-100 text-blue-400 rounded-md cursor-pointer"
                                    onClick={() =>
                                        handleChatWithSuggestion(suggestion)
                                    }
                                    key={indx}
                                >
                                    {suggestion}
                                </div>
                            ))}
                    </div>
                    <div className="flex w-full mt-2 mb-2">
                        <div
                            className="flex items-center space-x-2 text-gray-500 cursor-pointer"
                            onClick={() => setChatSection((prev) => !prev)}
                        >
                            <span className="text-blue-500">
                                {chatSection ? "Close chat" : "Open chat"}
                            </span>
                            <Info className="w-4 h-4" />
                        </div>
                        <div className="flex-1 mx-4 relative">
                            <input
                                type="text"
                                placeholder="Add an integration or a source to get started"
                                className="w-full rounded-md outline-none border-2 p-2 text-gray-700"
                                value={inputChat}
                                onChange={(e) => setInputChat(e.target.value)}
                            />
                            <div
                                className="flex justify-center items-center p-1 border-2 absolute top-1.5 bg-[#E5EBF2] right-1 rounded-md cursor-pointer"
                                onClick={handleChat}
                            >
                                <img
                                    src={icon6}
                                    alt="sendIcon"
                                    className="p-1"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <Sheet>
                                <SheetTrigger>
                                    <button className="text-blue-500">
                                        Pull data
                                    </button>
                                </SheetTrigger>
                                <SheetContent
                                    side={"right"}
                                    className="w-[500px] overflow-y-auto"
                                >
                                    <SheetHeader>
                                        <SheetTitle className="border-b-2">
                                            Pull Data
                                        </SheetTitle>
                                    </SheetHeader>
                                    <div className="mt-5">
                                        <h3>Select data from analytics</h3>
                                        <div className="flex gap-2 mt-5 justify-center">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-600">
                                                    Start Date
                                                </label>
                                                <DatePicker
                                                    selected={dates.startDate}
                                                    onChange={(date) =>
                                                        setDates((prev) => ({
                                                            ...prev,
                                                            startDate: date,
                                                        }))
                                                    }
                                                    selectsStart
                                                    startDate={
                                                        dates.startDate as Date
                                                    }
                                                    endDate={
                                                        dates.endDate as Date
                                                    }
                                                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                                                />
                                            </div>
                                            <div className="space-y-2 mb-5">
                                                <label className="block text-sm font-medium text-gray-600">
                                                    End Date
                                                </label>
                                                <DatePicker
                                                    selected={dates.endDate}
                                                    onChange={(date) =>
                                                        setDates((prev) => ({
                                                            ...prev,
                                                            endDate: date,
                                                        }))
                                                    }
                                                    selectsEnd
                                                    startDate={
                                                        dates.startDate as Date
                                                    }
                                                    endDate={
                                                        dates.endDate as Date
                                                    }
                                                    minDate={
                                                        dates.startDate as Date
                                                    }
                                                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                                                />
                                            </div>
                                        </div>
                                        {dataToShowOnPull.map((data, indx) => {
                                            return (
                                                <div
                                                    className="flex gap-2 pt-2"
                                                    key={indx}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={data.isChecked}
                                                        onClick={() =>
                                                            handlePullDataCheck(
                                                                indx
                                                            )
                                                        }
                                                    />
                                                    <p>{data.type}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <button
                                        className={`p-2 rounded-md w-4/5 mt-5 ${
                                            pullDataLoading
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-blue-600"
                                        } text-white`}
                                        onClick={handlePullData}
                                        disabled={pullDataLoading}
                                    >
                                        Pull Data
                                    </button>
                                </SheetContent>
                            </Sheet>
                            <Sheet>
                                <SheetTrigger>
                                    <button className="text-blue-500">
                                        Generate
                                    </button>
                                </SheetTrigger>
                                <SheetContent className="w-[30rem] flex flex-col items-center overflow-y-auto">
                                    <SheetHeader className="w-full text-start">
                                        <SheetTitle className="text-2xl font-light">
                                            Generate
                                        </SheetTitle>
                                        <p className="border-b-2 mt-2">
                                            Report
                                        </p>
                                    </SheetHeader>
                                    <div className="flex gap-2 justify-center">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-600">
                                                Start Date
                                            </label>
                                            <DatePicker
                                                selected={dates.startDate}
                                                onChange={(date) =>
                                                    setDates((prev) => ({
                                                        ...prev,
                                                        startDate: date,
                                                    }))
                                                }
                                                selectsStart
                                                startDate={
                                                    dates.startDate as Date
                                                }
                                                endDate={dates.endDate as Date}
                                                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-600">
                                                End Date
                                            </label>
                                            <DatePicker
                                                selected={dates.endDate}
                                                onChange={(date) =>
                                                    setDates((prev) => ({
                                                        ...prev,
                                                        endDate: date,
                                                    }))
                                                }
                                                selectsEnd
                                                startDate={
                                                    dates.startDate as Date
                                                }
                                                endDate={dates.endDate as Date}
                                                minDate={
                                                    dates.startDate as Date
                                                }
                                                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col w-full ml-20">
                                        {reportCategories.map((category) => (
                                            <div
                                                key={category.category}
                                                className="mb-5"
                                            >
                                                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                                    {category.category}
                                                </h3>
                                                <div className="space-y-2">
                                                    {category.options.map(
                                                        (option) => (
                                                            <label
                                                                key={option}
                                                                className="flex items-center space-x-2 cursor-pointer"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name="reportOptions"
                                                                    value={
                                                                        option
                                                                    }
                                                                    checked={
                                                                        selected?.option ===
                                                                        option
                                                                    }
                                                                    onChange={() =>
                                                                        handleSelection(
                                                                            category.category,
                                                                            option
                                                                        )
                                                                    }
                                                                    className="form-radio h-4 w-4 text-blue-600"
                                                                />
                                                                <span className="text-gray-800 text-sm">
                                                                    {option}
                                                                </span>
                                                            </label>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <textarea
                                        className="shadow-lg w-4/5 border-2 rounded-md min-h-20 outline-none p-1"
                                        style={{ resize: "none" }}
                                        placeholder="Query about report"
                                        value={generateReportText}
                                        onChange={(e) =>
                                            setGenerateReportText(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <button
                                        className={`p-2 rounded-md w-4/5 mt-5 ${
                                            generateReportLoading
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-blue-600"
                                        } text-white`}
                                        onClick={handleGenerateReport}
                                        disabled={generateReportLoading}
                                    >
                                        Generate Report
                                    </button>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
            <Sheet
                open={firstScreen}
                onOpenChange={() => setFirstScreen(false)}
            >
                <SheetContent
                    side={"left"}
                    className="w-[40rem] p-5 overflow-y-auto"
                >
                    <SheetHeader>
                        <SheetTitle>Report Summary</SheetTitle>
                    </SheetHeader>
                    <div className="mt-5">
                        <p className="text-gray-700 whitespace-pre-line">
                            {markdownToTxt(selectedSummary || "")}
                        </p>
                    </div>
                    <div className="flex gap-2 mt-5 justify-center">
                        <button
                            className="p-3 bg-slate-200 rounded-md"
                            onClick={() =>
                                handleSaveReport(
                                    selectedSummary as string,
                                    "Report",
                                    "Report"
                                )
                            }
                        >
                            Save As Note
                        </button>
                        <button className="p-3 bg-slate-200 rounded-md flex" onClick={handleDownload}>
                            <img src={download} />
                            Download
                        </button>
                    </div>
                </SheetContent>
            </Sheet>
            <Sheet
                open={secondScreen}
                onOpenChange={() => setSecondScreen(false)}
            >
                <SheetContent
                    side={"left"}
                    className="w-[40rem] p-5 overflow-y-auto"
                >
                    <SheetHeader>
                        <SheetTitle>Pulled Data</SheetTitle>
                    </SheetHeader>
                    <div className="mt-5">
                        <p className="text-gray-700 whitespace-pre-line">
                            {markdownToTxt(pullDataResponse)}
                        </p>
                    </div>
                    <button
                        className="p-3 bg-slate-200 rounded-md"
                        onClick={() =>
                            handleSaveReport(
                                pullDataResponse,
                                "Analitics",
                                "Analitics"
                            )
                        }
                    >
                        Save As Note
                    </button>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default WorkspaceMain;
