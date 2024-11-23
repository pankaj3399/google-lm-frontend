import { SignIn, useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUserStore from "../store/userStore.ts";
import apiClient, { setAuthToken } from "../api/axiosClient";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";



export default function Login() {
    const { isSignedIn } = useAuth();
    const navigate = useNavigate();
    const { user: clerkUser } = useUser();
    const { setUser } = useUserStore();
    const { getToken } = useAuth();
    const location = useLocation();

    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: location.pathname });
    }, [location]);

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
            const token = await getToken();
            setAuthToken(token);
            const resp = await apiClient.get(
                `/api/users/getUser/${clerkId}`
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
            <SignIn 
                signUpUrl="/signup"
                forceRedirectUrl={'/home'}
            />
        </div>
    );
}
