import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactGA from 'react-ga4';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    ReactGA.event({
      category: 'User',
      action: 'Clicked Submit Button',
      label: 'Submit Form',
    });
    navigate('/signup');
  };
  
  return (
    <header data-layername="navbar1Fixed" className="flex justify-between items-center px-8 w-full bg-white max-md:px-5 max-md:max-w-full">
      <nav data-layername="content" className="flex flex-col flex-1 shrink self-stretch my-auto w-full border-b basis-0 border-slate-300  min-w-[240px] max-md:max-w-full mx-auto">
        <div data-layername="mainMenu" className="flex flex-wrap gap-10 justify-between py-5 w-full max-md:max-w-full">
          <div data-layername="l" className="flex gap-10 items-center h-full text-center min-w-[240px]">
            <h1 data-layername="text" className="self-stretch my-auto text-2xl font-bold leading-none rounded-none text-blue-950 w-[134px]">
              Metrics<span>LM</span>
            </h1>
            <div data-layername="menuList" className="flex gap-8 items-center self-stretch my-auto text-base font-medium leading-none text-gray-600 whitespace-nowrap">
              <button className="flex gap-1 items-center self-stretch my-auto">
                <span data-layername="label" className="overflow-hidden self-stretch my-auto">
                  Applications
                </span>
              </button>
              <button className="flex gap-1 items-center self-stretch my-auto">
                <span data-layername="label" className="overflow-hidden self-stretch my-auto">
                  Pricing
                </span>
              </button>
            </div>
          </div>
          <div data-layername="r" className="flex gap-2 items-center my-auto text-sm font-bold leading-none min-w-[240px]">
            <button data-layername="buttonText" className="flex overflow-hidden justify-center items-center self-stretch px-3 py-2 my-auto text-blue-500 bg-white rounded-lg border border-blue-200 border-solid">
              <span data-layername="text" className="overflow-hidden self-stretch px-2 my-auto min-h-[20px]">
                Get a demo
              </span>
            </button>
      {/* <SignedIn> */}

      <button
      data-layername="buttonText"
      className="flex overflow-hidden justify-center items-center self-stretch px-3 py-2 my-auto text-white bg-blue-500 rounded-lg transition transform hover:scale-105 hover:bg-blue-600"
      onClick={handleSignupClick}
    >
      <span data-layername="text" className="overflow-hidden self-stretch px-2 my-auto min-h-[20px]">
        Start your free trial
      </span>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff5f3c2f38c7488e478b3bd0b4fc258a66495360d8867fad0c6abf1c458ec895?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95"
        alt=""
        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
      />
    </button>

        {/* </SignedIn> */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;



