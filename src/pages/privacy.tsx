import Navbar from "../components/navBar";
import Footer from "../components/footer";
import { Privacy } from "../components/Privacy";

const PrivacyPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="w-full bg-gray-200">
        <Navbar />
      </header>
      <main>
        <Privacy />
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPage;
