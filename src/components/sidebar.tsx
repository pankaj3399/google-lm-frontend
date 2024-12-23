import { useState, useEffect } from "react";
import SidebarItem from "./ui/SidebarItem";
import IntegrationPopup from "./ui/IntegrationPopup";
import { useUser, useAuth } from "@clerk/clerk-react";
import useUserStore from "../store/userStore";
import apiClient, { setAuthToken } from "../api/axiosClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Sidebar = () => {
    const {
        workspace,
        integrationPopup,
        setWorkspace,
        setIntegrationPopup,
        addWorkspace,
        setOpenAiKey,
        setGoogleAnalytics,
        setPropertyId,
    } = useUserStore();
    const [integrations, setIntegrations] = useState([]);
    const { user } = useUser();
    const { getToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.id) return;
        fetchAllWorkspaces();
        fetchApiKey();
    }, [user?.id]);

    const fetchApiKey = async () => {
        try {
            const token = await getToken();
            setAuthToken(token);

            const resp = await apiClient.get(
                `${API_URL}/api/users/getAiKey/${user?.id}`
            );
            setOpenAiKey(resp.data.api);
            setGoogleAnalytics(resp.data.googleAnalytics);
            setPropertyId(resp.data.propertyId);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.status);
                console.error(error.response);
                toast.error(
                    error.response?.data.message || "Something went wrong"
                );
            } else {
                console.error(error);
            }
        }
    };

    const handlePopup = () => {
        setIntegrationPopup();
        setIntegrations([]);
    };

    const createNewWorkspace = async () => {
        try {
            const token = await getToken();
            setAuthToken(token);

            const resp = await apiClient.post(
                `${API_URL}/api/users/createNewWorkspace/${user?.id}`,
                { workspaceName: "New Workspace" }
            );
            addWorkspace(resp.data.workspace);
            toast.success("Workspace created successfully!");
            navigate(`/workspace/${resp.data.workspace._id}`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.status);
                console.error(error.response);
                toast.error(
                    error.response?.data.message || "Something went wrong"
                );
            } else {
                console.error(error);
            }
        }
    };

    const fetchAllWorkspaces = async () => {
        try {
            const token = await getToken();
            setAuthToken(token);

            const resp = await apiClient.get(
                `${API_URL}/api/users/getAllWorkspaces/${user?.id}`
            );
            setWorkspace(resp.data.workspaces);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.status);
                console.error(error.response);
                toast.error(
                    error.response?.data.message || "Something went wrong"
                );
            } else {
                console.error(error);
            }
        }
    };

    // const deleteWorkspace = async (workspaceId:string) =>{
    //      try{
    //         const token = await getToken();
    //         setAuthToken(token);
    //         const loadingToast = toast.loading("Deleting Workspace...");
    //         await apiClient.delete(`${API_URL}/api/users/workspaces/${user?.id}/${workspaceId}`);
    //         setWorkspace(workspace.filter((workspace) => workspace._id !== workspaceId));
    //         toast.success("Workspace deleted successfully!");
    //     }catch(error){
    //         if (axios.isAxiosError(error)) {
    //             console.log(error.status);
    //             console.error(error.response);
    //             toast.error(
    //                 error.response?.data.message || "Something went wrong"
    //             );
    //         } else {
    //             console.error(error);
    //     }        
    // }
// }

const deleteWorkspace = async (workspaceId: string) => {
    try {
        const token = await getToken();
        setAuthToken(token);
        
        // Show loading toast
        const loadingToast = toast.loading('Deleting workspace...');
        
        await apiClient.delete(`${API_URL}/api/users/workspaces/${user?.id}/${workspaceId}`);
        
        // Update local state only after successful deletion
        setWorkspace(workspace.filter((ws) => ws._id !== workspaceId));
        
        // If user is currently on the deleted workspace's page, redirect to home
        if (window.location.pathname.includes(workspaceId)) {
            navigate('/');
        }
        
        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success("Workspace and all associated data deleted successfully");
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Delete workspace error:', error.response);
            toast.error(error.response?.data.message || "Failed to delete workspace");
        } else {
            console.error('Delete workspace error:', error);
            toast.error("An unexpected error occurred");
        }
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
            functionality: createNewWorkspace,
            previousCreations: workspace,
        },
    ];

    return (
        <aside className="flex flex-col items-start mt-14 pl-5 relative ]">
            {sidebarItems.map((item, index) => (
                <SidebarItem key={index} {...item} deleteWorkspace={deleteWorkspace} />
            ))}
            {/* {PopupSection &&  Integrations*/}
            {integrationPopup && <IntegrationPopup handlePopup={handlePopup} />}
        </aside>
    );
}
export default Sidebar;
