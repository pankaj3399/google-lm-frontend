import React from 'react';
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();  
    navigate("/signup");
};

  return (
    <header data-layername="navV3Jira" className="flex flex-col pt-4 w-full text-2xl font-bold bg-white max-md:max-w-full">
      <nav className="flex flex-wrap gap-5 justify-between self-center ml-3.5 w-full max-w-[1364px] max-md:max-w-full">
        <div data-layername="metricsLm">
          Metrics<span>LM</span>
        </div>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/10323ea2395e338a2e439eb5aa8707c2b16f628adc554e198cd7d75a66167836?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95" alt="" className="object-contain shrink-0 w-8 aspect-square" onClick={handleLogout}/>
      </nav>
      <div data-layername="shadow" className="flex mt-4 w-full min-h-[4px] max-md:max-w-full" />
    </header>
  );
};

export default Navigation;