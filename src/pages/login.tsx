import { SignIn, useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import useUserStore from "../store/userStore.ts";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
    const { isSignedIn } = useAuth();
    const navigate = useNavigate();
    const { user: clerkUser } = useUser();
    const { setUser } = useUserStore();

    useEffect(() => {
        if (isSignedIn === null || !clerkUser) return;

        const clerkId = clerkUser?.id;
        const email = clerkUser?.primaryEmailAddress?.emailAddress;

        if (clerkId && email) {
            getUser(clerkId);
            navigate("/home");
        }
    }, [isSignedIn, clerkUser]);

    const getUser = async (clerkId: string): Promise<void> => {
        try {
            const resp = await axios.get(
                `${API_URL}/api/users/getUser/${clerkId}`
            );
            const userData = {
                userId: resp.data.clerkId,
                email: resp.data.email,
                openAikey: resp.data.openAikey,
            };
            setUser(userData);
        } catch (error) {
            console.error("Error sending user data to backend:", error);
        }
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <SignIn />
        </div>
    );
}
