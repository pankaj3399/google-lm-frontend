import React from 'react';
import Navbar from '../components/navBar';
import HeroBanner from '../components/HeroBanner';
import SolutionSection from '../components/SolutionSection'
import PricingSection from '../components/PricingSection';
// import FaqSection from '../components/faqSection';
import Footer from '../components/footer';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const LandingPage: React.FC = () => {
  const location = useLocation();

    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: location.pathname });
    }, [location]);
  return (
    <div data-layername="landingPage" className="flex flex-col min-h-screen bg-white">
      <header className='w-full bg-gray-200'>
        <Navbar />
      </header>
      <main className="flex flex-col pb-16 w-full max-md:max-w-full">
        <HeroBanner />
        <SolutionSection />
        <PricingSection />
        {/* <FaqSection /> */}
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;