import { useEffect } from "react";
import Login from "./pages/login";
import SignUpPage from "./pages/signup";
import LandingPage from "./pages/landingPage";
import Home from "./pages/home";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Workspace from "./pages/Workspace";
import useUserStore from "./store/userStore";
import { useUser } from "@clerk/clerk-react";
const App = () => {
    const { user, setUser } = useUserStore();
    const { user: clerkUser } = useUser();

    useEffect(() => {
        if (!user) {
            setUser({
                userId: clerkUser?.id as string,
                email: clerkUser?.primaryEmailAddress?.emailAddress as string,
            });
        }
    }, [user]);

    return (
        <Router>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUpPage />} />
                <Route
                    path="home"
                    element={user ? <Home /> : <Navigate to="/signup" />}
                />
                <Route
                    path="workspace/:workspaceId"
                    element={user ? <Workspace /> : <Navigate to="/signup" />}
                />
                <Route path="/" element={<LandingPage />} />
            </Routes>
        </Router>
    );
};

export default App;
