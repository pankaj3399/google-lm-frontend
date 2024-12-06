import {
    Info,
    CirclePlus,
    MessageSquare,
    Eye,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import useUserStore from "../store/userStore";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import apiClient, { setAuthToken } from "../api/axiosClient";
import { useAuth } from "@clerk/clerk-react";
import {  Trash } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../components/ui/sheet";
import axios from "axios";
import icon2 from '../assets/icon2.svg';
import icon3 from '../assets/Icon3.svg';
import icon4 from '../assets/Icon4.svg';
import icon5 from '../assets/Icon5.svg';

const API_URL = import.meta.env.VITE_API_URL;
interface WorkspaceSidebarProps {
    handleCheckboxChange: (indx: number) => void;
    checkAllSources: () => void;
    uncheckAllSources: () => void;
    checkedSource: boolean[];
}

const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
    handleCheckboxChange,
    checkAllSources,
    uncheckAllSources,
    checkedSource,
}) => {
    const {
        sources,
        googleAnalytics,
        openAiKey,
        propertyId,
        deleteSource,
        updateSourceName,
        setSourcePopup,
        setSource,
        setIntegrationPopup,
    } = useUserStore();
    const { workspaceId } = useParams();
    const navigate = useNavigate();
    const { getToken } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSummary, setSelectedSummary] = useState<string | null>(null);
    const [editingSourceId, setEditingSourceId] = useState<string | null>(null);
    const [editedName, setEditedName] = useState<string>("");
    const [allSources, setAllSources] = useState(true);

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSummary(null);
    };

    useEffect(() => {
        fetchAllSources();
    }, []);

    useEffect(() => {
        if (!allSources) {
            uncheckAllSources();
        } else {
            checkAllSources();
        }
    }, [allSources]);

    const fetchAllSources = async () => {
        try {
            const token = await getToken();
            setAuthToken(token);

            const resp = await apiClient.get(
                `${API_URL}/api/users/getAllSources/${workspaceId}`
            );
            setSource(resp.data);
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

    const handleDeleteScource = async (id: string) => {
        try {
            const token = await getToken();
            setAuthToken(token);

            const resp = await apiClient.delete(
                `${API_URL}/api/users/remove-source`,
                {
                    data: {
                        _id: id,
                        workspaceId,
                    },
                }
            );
            console.log(resp.data);
            if (resp.status === 200) deleteSource(id);
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

    const handleSourceNameSubmit = async (sourceId: string) => {
        try {
            const token = await getToken();
            setAuthToken(token);

            const resp = await apiClient.put(
                `${API_URL}/api/users/rename-source`,
                {
                    _id: sourceId,
                    name: editedName,
                }
            );

            if (resp.status === 200) {
                updateSourceName(sourceId, editedName);
                setEditingSourceId(null);
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

    const handleSourceNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEditedName(event.target.value);
    };

    return (
        <div className="w-[20%] overflow-y-auto bg-white border-r border-gray-200 h-screen flex flex-col">
            <div className="flex items-center justify-center w-full h-14 border-b  border-gray-200 ">
                <div
                    className="flex cursor-pointer text-2xl text-[#1B2559]"
                    onClick={() => navigate("/home")}
                >
                    <p className="font-bold">Metrics</p>
                    <span>LM</span>
                </div>
            </div>

            <div className="p-4 flex-1">
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                            <span className="font-medium">Integrations</span>
                            <Info className="w-4 h-4 text-gray-400" />
                        </div>
                        <CirclePlus
                            className="w-4 h-4 text-gray-400 cursor-pointer"
                            onClick={setIntegrationPopup}
                        />
                    </div>
                    <label className="flex items-center justify-between space-x-2 text-sm text-gray-600">
                        <span>Select all integrations</span>
                        <input
                            type="checkbox"
                            className="rounded text-blue-500"
                            defaultChecked
                        />
                    </label>
                    {(openAiKey || googleAnalytics) && (
                        <div className="mt-3 mb-3 p-3 pr-0">
                            {openAiKey && (
                                <div className="flex justify-between">
                                    <div className="flex gap-1">
                                        <img src={icon2} alt="gpt icon" className="h-[22px]"/>
                                        <p>ChatGpt</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="rounded text-blue-500"
                                        defaultChecked
                                        disabled
                                    />
                                </div>
                            )}
                            {propertyId && (
                                <div className="flex justify-between mt-3">
                                    <div className="flex gap-1">
                                        <img src={icon5} alt="analytics"  className="h-[22px]"/>
                                        <p>Google Analytics</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="rounded text-blue-500"
                                        defaultChecked
                                        disabled
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div>
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                            <span className="font-medium">Sources</span>
                            <Info className="w-4 h-4 text-gray-400" />
                        </div>
                        <CirclePlus
                            className="w-4 h-4 text-gray-400 cursor-pointer"
                            onClick={setSourcePopup}
                        />
                    </div>
                    <label className="flex items-center space-x-2 text-sm text-gray-600 justify-between">
                        <span>Select all Sources</span>
                        <input
                            type="checkbox"
                            className="rounded text-blue-500"
                            checked={allSources}
                            onClick={() => setAllSources((prev) => !prev)}
                        />
                    </label>
                    {sources.length > 0 && (
                        <div className="flex flex-col gap-2 mt-3">
                            {sources.map((source, indx) => (
                                <div
                                    key={indx}
                                    className="flex justify-between"
                                >
                                    <div className="flex items-center relative cursor-pointer group gap-2">
                                        {source.uploadType === "file" ? (
                                            <img src={icon4} alt="file icon"  className="h-[20px] ml-1"/>
                                        ) : (
                                            <img src={icon3} alt="file icon"  className="h-[12px]"/>
                                        )}
                                        {editingSourceId === source._id ? (
                                            <input
                                                type="text"
                                                value={editedName}
                                                onChange={
                                                    handleSourceNameChange
                                                }
                                                onBlur={() =>
                                                    setEditingSourceId(null)
                                                }
                                                onKeyDown={(e) =>
                                                    e.key === "Enter" &&
                                                    handleSourceNameSubmit(
                                                        source._id
                                                    )
                                                }
                                                autoFocus
                                                className="text-gray-600 outline-none"
                                            />
                                        ) : (
                                            <p
                                                onClick={() => {
                                                    setEditingSourceId(
                                                        source._id
                                                    );
                                                    setEditedName(source.name);
                                                }}
                                            >
                                                {source.name}
                                            </p>
                                        )}
                                        <div
                                            className="flex flex-col gap-2 absolute bg-slate-100 p-3 top-[20px] left-0 
                    opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto 
                    shadow-md rounded-md z-10 transition-opacity duration-200"
                                        >
                                            <div
                                                className="flex gap-2 items-center hover:bg-slate-200 p-1 cursor-pointer"
                                                onClick={() =>
                                                    handleDeleteScource(
                                                        source._id
                                                    )
                                                }
                                            >
                                                <Trash size={20} />
                                                <p>Remove Item</p>
                                            </div>
                                            <Sheet>
                                                <SheetTrigger asChild>
                                                    <div className="flex gap-2 items-center hover:bg-slate-200 p-1 cursor-pointer">
                                                        <MessageSquare
                                                            size={20}
                                                        />
                                                        <p>View Summary</p>
                                                    </div>
                                                </SheetTrigger>
                                                <SheetContent
                                                    side="left"
                                                    className="h-screen w-[40rem] overflow-y-auto p-6 bg-gray-50 text-gray-800"
                                                >
                                                    <SheetHeader className="mb-4 border-b pb-4">
                                                        <SheetTitle className="text-2xl font-semibold text-gray-900">
                                                            Summary
                                                        </SheetTitle>
                                                    </SheetHeader>
                                                    <div className="space-y-4">
                                                        {source.summary ? (
                                                            source.summary
                                                                .split("\n")
                                                                .map(
                                                                    (
                                                                        paragraph,
                                                                        index
                                                                    ) => (
                                                                        <p
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="text-base leading-7 text-gray-700"
                                                                        >
                                                                            {
                                                                                paragraph
                                                                            }
                                                                        </p>
                                                                    )
                                                                )
                                                        ) : (
                                                            <p className="text-gray-500 italic">
                                                                No summary
                                                                available for
                                                                this source.
                                                            </p>
                                                        )}
                                                    </div>
                                                </SheetContent>
                                            </Sheet>
                                            <Sheet>
                                                <SheetTrigger asChild>
                                                    <div
                                                        className="flex gap-2 items-center hover:bg-slate-200 p-1 cursor-pointer"
                                                        onClick={() => {
                                                            if (
                                                                source.uploadType !==
                                                                "file"
                                                            ) {
                                                                window.open(
                                                                    source.url,
                                                                    "_blank",
                                                                    "noopener,noreferrer"
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <Eye size={20} />
                                                        <p>View</p>
                                                    </div>
                                                </SheetTrigger>
                                                {source.uploadType ===
                                                    "file" && (
                                                    <SheetContent
                                                        className="w-[50rem] overflow-y-auto h-screen absolute"
                                                        side={"left"}
                                                    >
                                                        <SheetHeader>
                                                            <SheetTitle>
                                                                Source View
                                                            </SheetTitle>
                                                        </SheetHeader>
                                                        <iframe
                                                            src={`${source.url}`}
                                                            height={630}
                                                            width={700}
                                                            className="w-full h-full"
                                                        ></iframe>
                                                    </SheetContent>
                                                )}
                                            </Sheet>
                                        </div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="rounded text-blue-500"
                                        checked={checkedSource[indx]}
                                        onClick={() =>
                                            handleCheckboxChange(indx)
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {isModalOpen && selectedSummary && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                        onClick={closeModal}
                    >
                        <div
                            className="bg-white p-5 rounded-lg shadow-lg w-4/5 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                                onClick={closeModal}
                            >
                                &times;
                            </button>
                            <h2 className="text-lg font-bold mb-4">Summary</h2>
                            <p className="text-gray-700 w-full">
                                {selectedSummary}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkspaceSidebar;
