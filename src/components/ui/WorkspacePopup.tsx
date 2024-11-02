import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

interface WorkspacePopup {
    handleWorkSpacePopup: () => void;
}

const API_URL = import.meta.env.VITE_API_URL;

const WorkspacePopup: React.FC<WorkspacePopup> = ({ handleWorkSpacePopup }) => {
    const { user } = useUser();
    const [workspaceName, setWorkSpaceName] = useState("");
    const navigate = useNavigate();

    const createNewWorkspace = async () => {
        try {
            const resp = await axios.post(
                `${API_URL}/api/users/createNewWorkspace/${user?.id}`,
                {
                    workspaceName,
                }
            );
            toast.success("Success");
            setWorkSpaceName("");
            handleWorkSpacePopup();
            navigate(`/workspace/${resp.data.workspace._id}`);
        } catch (error) {
            let errorMessage = "Something went wrong. Please try again later.";
            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (
                axios.isAxiosError(error) &&
                error.response?.data?.message
            ) {
                errorMessage = error.response.data.message;
            }

            toast.error(`Error saving settings: ${errorMessage}`);
            console.error(error);
        }
    };
    return (
        <div className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-100 shadow-lg shadow-slate-500">
            <div className="flex flex-col justify-center items-center p-8 rounded-lg gap-4 bg-white shadow-lg relative h-1/3 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Create New Workspace
                </h2>
                <input
                    className="p-3 w-full border border-gray-300 rounded-md focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition duration-200"
                    type="text"
                    placeholder="Workspace name"
                    value={workspaceName}
                    onChange={(e) => setWorkSpaceName(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white p-3 rounded-md w-full font-medium hover:bg-blue-600 transition duration-300"
                    onClick={createNewWorkspace}
                >
                    Submit
                </button>
                <X
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 cursor-pointer transition duration-200"
                    onClick={handleWorkSpacePopup}
                />
            </div>
        </div>
    );
};

export default WorkspacePopup;
