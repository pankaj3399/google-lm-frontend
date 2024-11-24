import {
    Info,
    CirclePlus,
    Link2,
    FileText,
    MessageSquare,
    Eye,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import useUserStore, { Source } from "../store/userStore";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import apiClient, { setAuthToken } from "../api/axiosClient";
import { useAuth } from "@clerk/clerk-react";
import { Brain, ChartNoAxesColumnIncreasing, Trash } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;
interface WorkspaceSidebarProps {
    handleAddSourceDisplay: () => void;
    handleCheckboxChange: (indx: number) => void;
}

const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
    handleAddSourceDisplay,
    handleCheckboxChange,
}) => {
    const {
        sources,
        setSource,
        setIntegrationPopup,
        googleAnalytics,
        openAiKey,
        deleteSource,
        updateSourceName,
    } = useUserStore();
    const { workspaceId } = useParams();
    const navigate = useNavigate();
    const { getToken } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSummary, setSelectedSummary] = useState<string | null>(null);
    const [editingSourceId, setEditingSourceId] = useState<string | null>(null);
    const [editedName, setEditedName] = useState<string>("");

    const openSummaryModal = (summary: string) => {
        setSelectedSummary(summary);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSummary(null);
    };

    useEffect(() => {
        fetchAllSources();
    }, []);

    const fetchAllSources = async () => {
        try {
            const token = await getToken();
            setAuthToken(token);

            const resp = await apiClient.get(
                `${API_URL}/api/users/getAllSources/${workspaceId}`
            );
            setSource(resp.data);
        } catch (err) {
            toast.error("Something went wrong, please try again later!");
            console.log(err);
        }
    };

    const handleViewClick = (source: Source) => {
        window.open(source.url, "_blank");
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
            console.log(error);
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
            console.log("Error updating source name", error);
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
                                        <Brain />
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
                            {googleAnalytics && (
                                <div className="flex justify-between mt-3">
                                    <div className="flex gap-1">
                                        <ChartNoAxesColumnIncreasing />
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
                            onClick={handleAddSourceDisplay}
                        />
                    </div>
                    <label className="flex items-center space-x-2 text-sm text-gray-600 justify-between">
                        <span>Select all Sources</span>
                        <input
                            type="checkbox"
                            className="rounded text-blue-500"
                            defaultChecked
                        />
                    </label>
                    {sources.length > 0 && (
                        <div className="flex flex-col gap-1 mt-3">
                            {sources.map((source, indx) => (
                                <div
                                    key={indx}
                                    className="flex justify-between"
                                >
                                    <div className="flex items-center relative cursor-pointer group">
                                        {source.uploadType === "file" ? (
                                            <FileText
                                                size={17}
                                                className="mr-1"
                                            />
                                        ) : (
                                            <Link2 size={17} className="mr-1" />
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
                                            <div
                                                className="flex gap-2 items-center hover:bg-slate-200 p-1 cursor-pointer"
                                                onClick={() =>
                                                    openSummaryModal(
                                                        source.summary
                                                    )
                                                }
                                            >
                                                <MessageSquare size={20} />
                                                <p>View Summary</p>
                                            </div>
                                            <div
                                                className="flex gap-2 items-center hover:bg-slate-200 p-1 cursor-pointer"
                                                onClick={() =>
                                                    handleViewClick(source)
                                                }
                                            >
                                                <Eye size={20} />
                                                <p>View</p>
                                            </div>
                                        </div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="rounded text-blue-500"
                                        defaultChecked
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
