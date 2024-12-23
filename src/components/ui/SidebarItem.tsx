import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";
import { Check, Trash } from "lucide-react";
import ReactGA from "react-ga4";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "./dialog";
import { Button } from "./button";

interface PreviousCreations {
    _id: string;
    name: string;
}

interface SidebarItemProps {
    title: string;
    type: "icon" | "button" | "otherType";
    buttonText?: string;
    iconSrc?: string;
    key: number;
    functionality: () => void;
    previousCreations: PreviousCreations[];
    deleteWorkspace?: (workspaceId: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    title,
    type,
    buttonText,
    iconSrc,
    functionality,
    previousCreations,
    deleteWorkspace
}) => {
    const navigate = useNavigate();
    const { openAiKey, propertyId } = useUserStore();
    const [workspaceToDelete, setWorkspaceToDelete] = useState<string | null>(null);

    const handleDeleteClick = (e: React.MouseEvent, workspaceId: string) => {
        e.stopPropagation(); // Prevent the parent div's click event
        setWorkspaceToDelete(workspaceId);
    };

    const handleDeleteConfirm = () => {
        if (workspaceToDelete && deleteWorkspace) {
            deleteWorkspace(workspaceToDelete);
        }
        setWorkspaceToDelete(null);
    };

    const handleWorkspaceClick = (workspaceId: string) => {
        ReactGA.event({
            category: "User",
            action: "Clicked Submit Button",
            label: "Submit Form",
        });
        navigate(`/workspace/${workspaceId}`);
    };

    return (
        <div>
            <h2 className="text-start text-2xl font-pops">{title}</h2>
            {type === "icon" && (
                <div className="flex shrink-0 mt-7 rounded-3xl border border-gray-300 border-solid h-[110px] w-[110px]" />
            )}
            {type === "button" && (
                <div className="flex gap-2 w-screen p-5 flex-wrap">
                    <button
                        className={`${title === 'Integrations' ? 'min-w-40 h-40' : 'min-w-48 h-48'} font-pops flex flex-col items-center justify-center px-4 py-4 text-lg font-medium rounded-3xl border border-gray-300 transition-transform duration-300 transform hover:scale-105 hover:bg-gray-200`}
                        onClick={functionality}
                    >
                        <img
                            loading="lazy"
                            src={iconSrc}
                            alt=""
                            className="object-contain w-12 h-12"
                        />
                        <span
                            data-layername={buttonText?.toLowerCase()}
                            className="mt-4 text-center text-gray-700"
                        >
                            {buttonText}
                        </span>
                    </button>
                    {previousCreations.length > 0 &&
                        previousCreations.map((previousCreation) => (
                            <div
                                key={previousCreation._id}
                                className="relative flex flex-col items-center justify-center w-48 h-48 px-4 py-4 text-lg font-medium rounded-3xl border border-gray-300 transition-transform duration-300 transform hover:scale-105 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleWorkspaceClick(previousCreation._id)}
                            >
                                <span className="text-gray-700 font-semibold text-center">
                                    {previousCreation.name}
                                </span>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute bottom-2 right-2 p-2 rounded-full text-destructive hover:text-destructive hover:bg-destructive/10"
                                            onClick={(e) => handleDeleteClick(e, previousCreation._id)}
                                        >
                                            <Trash size={18} />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="flex flex-col w-60">
                                        <h3>
                                            Are you sure you want to delete this workspace?
                                        </h3>
                                        <div className="flex justify-end gap-3 mt-4">
                                            <DialogClose asChild>
                                                <button 
                                                    className="p-3 hover:bg-slate-200 text-blue-600 rounded-md"
                                                    onClick={() => setWorkspaceToDelete(null)}
                                                >
                                                    Cancel
                                                </button>
                                            </DialogClose>
                                            <DialogClose asChild>
                                                <button
                                                    className="p-3 hover:bg-slate-200 text-blue-600 rounded-md"
                                                    onClick={(e)=>{
                                                        e.stopPropagation();
                                                        handleDeleteConfirm();
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </DialogClose>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        ))}

                    {openAiKey && title === "Integrations" && (
                        <div className="flex items-center justify-center w-40 h-40 px-4 py-4 text-lg font-medium rounded-3xl border border-gray-300 transition-transform duration-300 transform hover:scale-105 hover:bg-gray-200 cursor-pointer gap-1">
                            <span>ChatGpt</span>
                            <Check className="text-green-500" />
                        </div>
                    )}
                    {propertyId && title === "Integrations" && (
                        <div className="flex items-center justify-center w-40 h-40 px-4 py-4 text-lg font-medium rounded-3xl border border-gray-300 transition-transform duration-300 transform hover:scale-105 hover:bg-gray-200 cursor-pointer gap-1">
                            <span>Analytics</span>
                            <Check className="text-green-500" />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SidebarItem;