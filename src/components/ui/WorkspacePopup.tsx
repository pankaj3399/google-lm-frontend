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
            setWorkSpaceName('');
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
            <div className="flex flex-col justify-center items-center p-10 rounded-md gap-3 relative h-1/4">
                <h2>Create new workspace</h2>
                <input
                    className="p-3 outline-none"
                    type="text"
                    placeholder="Workspace name"
                    value={workspaceName}
                    onChange={(e) => setWorkSpaceName(e.target.value)}
                />
                <button
                    className="bg-slate-300 p-3 rounded-md w-32"
                    onClick={createNewWorkspace}
                >
                    Submit
                </button>
                <X
                    className="absolute right-2 top-2 cursor-pointer"
                    onClick={handleWorkSpacePopup}
                />
            </div>
        </div>
    );
};

export default WorkspacePopup;
