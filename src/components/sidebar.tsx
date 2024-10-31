import React, { useState } from "react";
import SidebarItem from "./ui/SidebarItem";
import IntegrationPopup from './ui/IntegrationPopup'

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const sidebarItems = [
        {
            title: "Integrations",
            type: "button" as const,
            iconSrc:
                "https://cdn.builder.io/api/v1/image/assets/TEMP/bb8c4a9d007bd61f491d62f7f6828ed33b25aa7b5b1edfaeb9d64afb94ad3535?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95",
        },
        {
            title: "Workspaces",
            type: "button" as const,
            buttonText: "New Workspaces",
            iconSrc:
                "https://cdn.builder.io/api/v1/image/assets/TEMP/bb8c4a9d007bd61f491d62f7f6828ed33b25aa7b5b1edfaeb9d64afb94ad3535?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95",
        },
    ];

    const handlePopup = () => {
        setIsPopupOpen((prev) => !prev);
    };

    return (
        <aside className="flex flex-col items-start mt-14 ml-14 max-w-full text-2xl w-[220px] max-md:mt-10 max-md:ml-2.5">
            {sidebarItems.map((item, index) => (
                <SidebarItem key={index} {...item} handlePopup={handlePopup} />
            ))}

            {/* {PopupSection &&  */}
            {isPopupOpen && <IntegrationPopup handlePopup={handlePopup} />}
        </aside>
    );
};

export default Sidebar;
