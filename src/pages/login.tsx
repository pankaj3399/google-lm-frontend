import { SignIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
    const { isSignedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSignedIn) {
            navigate("/home");
        }
    }, [isSignedIn, navigate]);

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <SignIn />
        </div>
    );
}
