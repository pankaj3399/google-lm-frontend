import { SignUp, useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function SignUpPage() {
    const { isSignedIn } = useAuth();
    const { user } = useUser();
    const navigate = useNavigate();
    const hasSentDataRef = useRef(false); 

    useEffect(() => {
        if (isSignedIn) {
            navigate("/home");
        }

        if (user && !hasSentDataRef.current) {
            const clerkId = user.id;
            const email = user.primaryEmailAddress?.emailAddress;

            if (clerkId && email) {
                sendUserDataToBackend(clerkId, email);
                hasSentDataRef.current = true; 
            }
        }
    }, [isSignedIn, user, navigate]);

    const sendUserDataToBackend = async (
        clerkId: string,
        email: string
    ): Promise<void> => {
        try {
            const resp = await axios.post(`${API_URL}/api/users/signup`, {
                email,
                clerkId,
            });
            console.log(resp.data.message);
        } catch (error) {
            console.error("Error sending user data to backend:", error);
        }
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <SignUp />
        </div>
    );
}
