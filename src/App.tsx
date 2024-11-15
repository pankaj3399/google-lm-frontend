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
    }, [clerkUser, user, setUser]);

    return (
        <Router>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUpPage />} />
                <Route path="/" element={<LandingPage />} />

                <Route
                    path="home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="workspace/:workspaceId"
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
