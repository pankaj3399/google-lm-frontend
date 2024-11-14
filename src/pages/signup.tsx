import { SignUp, useUser, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import axios from "axios";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function SignUpPage() {
    const { isSignedIn } = useAuth();
    const { user: clerkUser } = useUser();
    const { setUser, user } = useUserStore();
    const navigate = useNavigate();

    useEffect(() => {
        if(isSignedIn === null) return;

        if (isSignedIn) {
            navigate("/home");
        }

        if (clerkUser && user) {
            const clerkId = clerkUser.id;
            const email = clerkUser.primaryEmailAddress?.emailAddress;

            if (clerkId && email) {
                sendUserDataToBackend(clerkId, email);
            }
        }
    }, [isSignedIn, clerkUser]);

    const sendUserDataToBackend = async (
        clerkId: string,
        email: string
    ): Promise<void> => {
        try {
            const resp = await axios.post(`${API_URL}/api/users/signup`, {
                email,
                clerkId,
            });
            const userData = {
                userId: resp.data.clerkId,
                email: resp.data.email,
                openAikey: resp.data.openAikey,
            };
            // localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
        } catch (error) {
            console.error("Error sending user data to backend:", error);
        }
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <SignUp afterSignUpUrl={import.meta.env.CLERK_SIGN_UP_FORCE_REDIRECT_URL} />;
        </div>
    );
}
