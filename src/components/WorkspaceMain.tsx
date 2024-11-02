import axios from "axios";
import { Info, SendHorizontal, FileText } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleNote from "./ui/SingleNote";
import useUserStore from "../store/userStore";

const API_URL = import.meta.env.VITE_API_URL;

interface Note {
    _id: string;
    heading: string;
    content: string;
}

interface WorkspaceMainProps {
    handleNewNoteDisplay: () => void;
}

const WorkspaceMain: React.FC<WorkspaceMainProps> = ({
    handleNewNoteDisplay,
}) => {
    const { workspaceId } = useParams();
    const [workspaceName, setWorkspaceName] = useState("");
    const {notes, setNotes} = useUserStore();

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

            <div className="flex-1 w-full p-6 overflow-y-auto">
                <div
                    className="flex gap-1 items-center h-4"
                    onClick={handleNewNoteDisplay}
                >
                    <FileText className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-600 cursor-pointer">
                        Add Note
                    </span>
                </div>

                {notes.length > 0 ? (
                    <div className="flex mt-2 w-full  flex-wrap">
                        {notes.map((note: Note) => (
                            <SingleNote
                                key={note?._id}
                                heading={note?.heading}
                                content={note?.content}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-[calc(100vh-250px)]">
                        <h2 className="text-4xl text-gray-700 mb-2">
                            Your saved work will appear here
                        </h2>
                        <p className="text-gray-600 mb-6 w-96 text-center">
                            Thanks for choosing MetricsLM. Your next steps are
                            to add integrations or sources in your workspace.
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
                        />
                        <div className="p-1 border-2 absolute top-1.5 bg-[#E5EBF2] right-1 rounded-md cursor-pointer">
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
