import React, { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useUser, useAuth } from "@clerk/clerk-react";
import useUserStore from "../../store/userStore";
import apiClient, { setAuthToken } from "../../api/axiosClient";

interface WorkspacePopupProps {
    handleWorkSpacePopup: () => void; 
}

const API_URL = import.meta.env.VITE_API_URL;

const WorkspacePopup: React.FC<WorkspacePopupProps> = ({ handleWorkSpacePopup }) => {
    const { user } = useUser();
    const { getToken } = useAuth(); 
    const [workspaceName, setWorkspaceName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { addWorkspace } = useUserStore();

    const createNewWorkspace = async () => {
        if (!workspaceName.trim()) {
            toast.error("Workspace name cannot be empty.");
            return;
        }

        try {
            setIsLoading(true);

            const token = await getToken();
            setAuthToken(token);

            const resp = await apiClient.post(
                `${API_URL}/api/users/createNewWorkspace/${user?.id}`,
                { workspaceName }
            );

            addWorkspace(resp.data.workspace);
            toast.success("Workspace created successfully!");
            setWorkspaceName(""); 
            handleWorkSpacePopup(); 
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again later.";
            toast.error(`Error creating workspace: ${errorMessage}`);
            console.error(error);
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-100 shadow-lg shadow-slate-500 z-50"
            role="dialog"
            aria-labelledby="workspace-popup-title"
            aria-modal="true"
        >
            <div className="flex flex-col justify-center items-center p-8 rounded-lg gap-4 bg-white shadow-lg relative h-1/3 w-full max-w-md">
                <h2
                    id="workspace-popup-title"
                    className="text-2xl font-semibold text-gray-800"
                >
                    Create New Workspace
                </h2>
                <input
                    className="p-3 w-full border border-gray-300 rounded-md focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition duration-200"
                    type="text"
                    placeholder="Workspace name"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    disabled={isLoading}
                    aria-label="Workspace Name"
                />
                <button
                    className={`p-3 rounded-md w-full font-medium text-white transition duration-300 ${
                        isLoading
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    onClick={createNewWorkspace}
                    disabled={isLoading}
                >
                    {isLoading ? "Creating..." : "Submit"}
                </button>
                <X
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 cursor-pointer transition duration-200"
                    onClick={handleWorkSpacePopup}
                    aria-label="Close"
                />
            </div>
        </div>
    );
};

export default WorkspacePopup;
