import React, { useState, useEffect } from "react";
import SidebarItem from "./ui/SidebarItem";
import IntegrationPopup from "./ui/IntegrationPopup";
import WorkspacePopup from "./ui/WorkspacePopup";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import useUserStore from "../store/userStore";
import toast from "react-hot-toast";

interface SidebarProps {}
const API_URL = import.meta.env.VITE_API_URL;

const Sidebar: React.FC<SidebarProps> = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [workspacePopup, setWorkspacePopup] = useState(false);
    const { workspace, setWorkspace } = useUserStore();
    const [integrations, setIntegrations] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        fetchAllWorkspaces();
    }, []);

    const handlePopup = () => {
        setIsPopupOpen((prev) => !prev);
        setIntegrations([]);
    };

    const handleWorkSpacePopup = () => {
        setWorkspacePopup((prev) => !prev);
    };

    const fetchAllWorkspaces = async () => {
        try {
            const resp = await axios.get(
                `${API_URL}/api/users/getAllWorkspaces/${user?.id}`
            );
            setWorkspace(resp.data.workspaces);
        } catch (error) {
            toast.error("Something went wront please try after some time!!");
            console.log(error);
        }
    };

    const sidebarItems = [
        {
            title: "Integrations",
            type: "button" as const,
            iconSrc:
                "https://cdn.builder.io/api/v1/image/assets/TEMP/bb8c4a9d007bd61f491d62f7f6828ed33b25aa7b5b1edfaeb9d64afb94ad3535?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95",
            functionality: handlePopup,
            previousCreations: integrations,
        },
        {
            title: "Workspaces",
            type: "button" as const,
            buttonText: "New Workspaces",
            iconSrc:
                "https://cdn.builder.io/api/v1/image/assets/TEMP/bb8c4a9d007bd61f491d62f7f6828ed33b25aa7b5b1edfaeb9d64afb94ad3535?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95",
            functionality: handleWorkSpacePopup,
            previousCreations: workspace,
        },
    ];

    return (
        <aside className="flex flex-col items-start mt-14 ml-14 max-w-full text-2xl w-[220px] max-md:mt-10 max-md:ml-2.5">
            {sidebarItems.map((item, index) => (
                <SidebarItem key={index} {...item} />
            ))}
            {/* {PopupSection &&  Integrations*/}
            {isPopupOpen && <IntegrationPopup handlePopup={handlePopup} />}
            {workspacePopup && (
                <WorkspacePopup handleWorkSpacePopup={handleWorkSpacePopup} />
            )}
        </aside>
    );
};

export default Sidebar;
