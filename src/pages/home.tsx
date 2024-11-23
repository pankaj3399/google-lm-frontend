import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import Navigation from "../components/homeNav";
import Sidebar from "../components/sidebar";

const MyComponent = () => {
    const location = useLocation();

    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: location.pathname });
    }, [location]);
    return (
        <main className="flex flex-col bg-white overflow-x-hidden">
            <Navigation />
            <Sidebar />
        </main>
    );
};

export default MyComponent;
