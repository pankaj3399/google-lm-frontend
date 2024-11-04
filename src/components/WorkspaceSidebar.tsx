import { Info, CirclePlus, Link2, FileText } from "lucide-react";
import React, { useEffect } from "react";
import useUserStore from "../store/userStore";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
interface WorkspaceSidebarProps {
    handleAddSourceDisplay: () => void;
}

const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
    handleAddSourceDisplay,
}) => {
    const { setSource, sources } = useUserStore();
    const { workspaceId } = useParams();

    useEffect(() => {
        fetchAllSources();
    }, []);

    const fetchAllSources = async () => {
        try {
            const resp = await axios.get(
                `${API_URL}/api/users/getAllSources/${workspaceId}`
            );
            setSource(resp.data);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="w-[20%] overflow-y-auto bg-white border-r border-gray-200 h-screen flex flex-col">
            <div className="flex items-center justify-center w-full h-14 border-b border-gray-200 text-xl text-[#1B2559]">
                <p className="font-bold">Metrics</p>
                <span>LM</span>
            </div>

            <div className="p-4 flex-1">
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                            <span className="font-medium">Integrations</span>
                            <Info className="w-4 h-4 text-gray-400" />
                        </div>
                        <CirclePlus className="w-4 h-4 text-gray-400" />
                    </div>
                    <label className="flex items-center justify-between space-x-2 text-sm text-gray-600">
                        <span>Select all integrations</span>
                        <input
                            type="checkbox"
                            className="rounded text-blue-500"
                            defaultChecked
                        />
                    </label>
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
                                    <div className="flex items-center">
                                        {source.uploadType === "file" ? (
                                            <FileText
                                                size={17}
                                                className="mr-1"
                                            />
                                        ) : (
                                            <Link2 size={17} className="mr-1" />
                                        )}
                                        <p>{source.name}</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="rounded text-blue-500"
                                        defaultChecked
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkspaceSidebar;
