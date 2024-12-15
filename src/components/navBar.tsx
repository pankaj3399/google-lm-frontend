import React from "react";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";
import { useUser } from "@clerk/clerk-react";
import { UserButton } from "@clerk/clerk-react";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const { user: clerkUser } = useUser();
    const clerkId = clerkUser?.id;

    const handleSignupClick = () => {
        ReactGA.event({
            category: "User",
            action: "Clicked Submit Button",
            label: "Submit Form",
        });
        navigate("/signup");
    };

    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header
            data-layername="navbar1Fixed"
            className="flex justify-between items-center px-20 w-full bg-white max-md:px-5 max-md:max-w-full"
        >
            <nav
                data-layername="content"
                className="flex flex-col flex-1 shrink self-stretch my-auto w-full border-b basis-0 border-slate-300 min-w-[240px] max-md:max-w-full mx-auto"
            >
                <div
                    data-layername="mainMenu"
                    className="flex flex-wrap gap-10 justify-between py-5 w-full max-md:max-w-full"
                >
                    <div
                        data-layername="l"
                        className="flex gap-10 items-center h-full text-center min-w-[240px]"
                    >
                        <div
                            className="flex cursor-pointer text-2xl text-[#1B2559]"
                            onClick={() => navigate("/")}
                        >
                            <p className="font-bold">Metrics</p>
                            <span>LM</span>
                        </div>
                        <div
                            data-layername="menuList"
                            className="flex gap-8 items-center self-stretch my-auto text-base font-medium leading-none text-gray-600 whitespace-nowrap"
                        >
                            <button
                                className="flex gap-1 items-center self-stretch my-auto"
                                onClick={() => handleScroll("_application")}
                            >
                                <span
                                    data-layername="label"
                                    className="self-stretch my-auto"
                                >
                                    Applications
                                </span>
                            </button>
                            <button
                                className="flex gap-1 items-center self-stretch my-auto"
                                onClick={() => handleScroll("_price")}
                            >
                                <span
                                    data-layername="label"
                                    className="self-stretch my-auto"
                                >
                                    Pricing
                                </span>
                            </button>
                        </div>
                    </div>
                    {clerkId ? (
                        <>
                        <div className="flex space-x-3">
                         <button
                             className="self-stretch my-auto text-base font-medium leading-none text-gray-600 whitespace-nowrap "
                             onClick={() => navigate("/home")}
                         >
                             <span className="overflow-hidden px-2">Go to Home Page</span>
                         </button>
                         <UserButton />
                         </div>
                         </>
                    ) : (
                        <div
                            data-layername="r"
                            className="flex gap-2 items-center my-auto text-sm font-bold leading-none min-w-[240px]"
                        >
                            <button
                                data-layername="buttonText"
                                className="flex justify-center items-center self-stretch px-3 py-2 my-auto text-blue-500 bg-white rounded-lg border border-blue-200 border-solid"
                            >
                                <a
                                    data-layername="text"
                                    className="self-stretch px-2 my-auto min-h-[20px] flex items-center"
                                    href="https://calendar.app.google/pBHL5sBQvYxvcjCg7"
                                    target="_blank"
                                >
                                    Get a demo
                                </a>
                            </button>
                            <button
                                data-layername="buttonText"
                                className="flex overflow-hidden justify-center items-center self-stretch px-3 py-2 my-auto text-white bg-blue-500 rounded-lg transition transform hover:scale-105 hover:bg-blue-600"
                                onClick={handleSignupClick}
                            >
                                <span
                                    data-layername="text"
                                    className="overflow-hidden self-stretch px-2 my-auto min-h-[20px] flex items-center"
                                >
                                    Start your free trial
                                </span>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff5f3c2f38c7488e478b3bd0b4fc258a66495360d8867fad0c6abf1c458ec895?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95"
                                    alt=""
                                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                                />
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
