import { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import Login from "./pages/login";
import SignUpPage from "./pages/signup";
import LandingPage from "./pages/landingPage";
import Home from "./pages/home";
import Workspace from "./pages/Workspace";
import PageNotFound from "./pages/PageNotFound";
import Condition from "./pages/condition";
import PrivacyPage from "./pages/privacy";
import useUserStore from "./store/userStore";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { user } = useUserStore();
    return user ? children : <Navigate to="/signup" />;
};

const App = () => {
    const { user, setUser } = useUserStore();
    const { user: clerkUser } = useUser();

    useEffect(() => {
        if (clerkUser && !user) {
            setUser({
                userId: clerkUser.id,
                email: clerkUser.primaryEmailAddress?.emailAddress || "",
            });
        }
    }, [clerkUser]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/terms" element={<Condition />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/workspace/:workspaceId"
                    element={
                        <ProtectedRoute>
                            <Workspace />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
