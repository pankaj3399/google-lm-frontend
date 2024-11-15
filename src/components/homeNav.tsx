import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
    const navigate = useNavigate();
    return (
        <nav className="flex p-4 w-screen justify-between">
            <div
                className="flex cursor-pointer text-2xl text-[#1B2559]"
                onClick={() => navigate("/")}
            >
                <p className="font-bold">Metrics</p>
                <span>LM</span>
            </div>
            <UserButton />
        </nav>
    );
};

export default Navigation;
