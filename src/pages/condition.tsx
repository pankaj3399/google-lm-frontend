import Navbar from "../components/navBar";
import Footer from "../components/footer";
import { Terms } from "../components/Terms";

const Condition = () => {
    return (
        <div
            className="flex flex-col min-h-screen bg-white"
        >
            <header className="w-full bg-gray-200">
                <Navbar />
            </header>
            <main>
                <Terms />
            </main>
            <Footer />
        </div>
    );
};

export default Condition;
