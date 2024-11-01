// App.tsx
import Login from "./pages/login";
import SignUpPage from "./pages/signup";
import LandingPage from "./pages/landingPage";
import Home from "./pages/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Workspace from "./pages/Workspace";
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUpPage />} />
                <Route path="home" element={<Home />} />
                <Route path="workspace/:workspaceId" element={<Workspace />} />
                <Route path="/" element={<LandingPage />} />
            </Routes>
        </Router>
    );
};

export default App;
