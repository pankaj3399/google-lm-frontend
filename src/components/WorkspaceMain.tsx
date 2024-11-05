import axios from "axios";
import { Info, SendHorizontal, FileText, X, FilePlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleNote from "./ui/SingleNote";
import useUserStore from "../store/userStore";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

interface Note {
    _id: string;
    heading: string;
    content: string;
}

interface WorkspaceMainProps {
    handleNewNoteDisplay: () => void;
    checkedSource: boolean[];
}

interface Chat {
    message: string;
    owner: string;
}

const WorkspaceMain: React.FC<WorkspaceMainProps> = ({
    handleNewNoteDisplay,
    checkedSource,
}) => {
    const { workspaceId } = useParams();
    const [workspaceName, setWorkspaceName] = useState("");
    const { notes, sources, setNotes, setSelectedNote, addNote } = useUserStore();
    const [inputChat, setInputChat] = useState("");
    const [chats, setChats] = useState<Chat[]>([]);

    useEffect(() => {
        fetchWorkspace();
        fetchAllNotes();
    }, []);

    const fetchAllNotes = async () => {
        try {
            const resp = await axios.get(
                `${API_URL}/api/users/getAllNotes/${workspaceId}`
            );
            setNotes(resp.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchWorkspace = async () => {
        try {
            const resp = await axios.get(
                `${API_URL}/api/users/getWorkspace/${workspaceId}`
            );
            setWorkspaceName(resp.data.workspace.name);
        } catch (error) {
            console.log(error);
        }
    };

    function addChat(message: string, owner: string) {
        setChats((prevChats) => [...prevChats, { message, owner }]);
    }

    const handleChat = async () => {
        if (inputChat == "") return;
        try {
            let content = "";
            content += checkedSource.map((isChecked, index) => {
                if (isChecked) {
                    return sources[index].summary;
                }
                return null;
            });
            if (content === "") {
                toast.error("Please select some source!!");
                return;
            }
            addChat(inputChat, "Me");
            const resp = await axios.post(
                `${API_URL}/api/users/createConversation`,
                {
                    question: inputChat,
                    context: content,
                }
            );
            setInputChat("");
            addChat(resp.data.message, "GPT");
        } catch (err) {
            console.log(err);
        }
    };

    const handleSaveNote = async (content: string) => {
        try {
            const resp = await axios.post(
                `${API_URL}/api/users/createNewNote/${workspaceId}`,
                {
                    heading: 'Saved Response',
                    content: content,
                }
            );
            addNote(resp.data);
            toast.success("Successfully added");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="h-screen w-[80%] flex flex-col">
            <div className="h-14 flex items-center justify-between border-b border-gray-200 bg-white pl-5 pr-5">
                <p className="text-gray-600">
                    {workspaceName !== ""
                        ? workspaceName
                        : "Untitled Workspace"}
                </p>
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/10323ea2395e338a2e439eb5aa8707c2b16f628adc554e198cd7d75a66167836?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95"
                    alt=""
                    className="object-contain shrink-0 w-8 aspect-square"
                />
            </div>

            <div className="flex-1 w-full p-6 overflow-y-auto relative ">
                {chats.length > 0 ? (
                    <>
                        {chats.map((chat, indx) => (
                            <div
                                key={indx}
                                className={`w-full flex relative ${
                                    chat.owner === "Me"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <p
                                    className={`max-w-10/12 bg-slate-100 p-5 mt-2 rounded-b-md listItem`}
                                >
                                    {chat.message}
                                </p>
                                {chat.owner === "GPT" ? (
                                    <FilePlus
                                        size={16}
                                        className="absolute bottom-2 right-2 cursor-pointer"
                                        onClick={() => handleSaveNote(chat.message)}
                                    />
                                ) : null}
                            </div>
                        ))}
                        <X
                            className="absolute right-5 top-1 cursor-pointer"
                            onClick={() => setChats([])}
                        />
                    </>
                ) : (
                    <>
                        <div
                            className="flex w-full gap-1 items-center h-4"
                            onClick={() => {
                                setSelectedNote(-1);
                                handleNewNoteDisplay();
                            }}
                        >
                            <FileText className=" h-5 text-gray-600" />
                            <span className="text-gray-600 cursor-pointer">
                                Add Note
                            </span>
                        </div>

                        {notes.length > 0 ? (
                            <div className="flex mt-2 w-full  flex-wrap">
                                {notes.map((note: Note, indx) => (
                                    <SingleNote
                                        key={note._id}
                                        indx={indx}
                                        heading={note?.heading}
                                        content={note?.content}
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
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                        Add Integrations
                                    </button>
                                    <button className="px-4 py-2 bg-white text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50">
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

            <div className="w-full h-28">
                <div className="flex w-[90%] p-5 border-t bg-white border-gray-200 rounded-t-xl shadow-lg shadow-blue-500/50 items-center h-full justify-center mx-auto">
                    <div className="flex items-center space-x-2 text-gray-500">
                        <span>Open chat</span>
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
                            className="p-1 border-2 absolute top-1.5 bg-[#E5EBF2] right-1 rounded-md cursor-pointer"
                            onClick={handleChat}
                        >
                            <SendHorizontal className="w-5 h-5" color="black" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <button className="text-blue-500">Pull data</button>
                        <button className="text-blue-500">Generate</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkspaceMain;
