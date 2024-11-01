import React from "react";
import { useNavigate } from "react-router-dom";


interface PreviousCreations {
    _id: string;
    name: string;
}

interface SidebarItemProps {
    title: string;
    type: "icon" | "button" | "otherType";
    buttonText?: string;
    iconSrc?: string;
    key: number;
    functionality: () => void;
    previousCreations: PreviousCreations[];
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    title,
    type,
    buttonText,
    iconSrc,
    functionality,
    previousCreations,
}) => {
    const navigate = useNavigate();

    return (
        <>
            <h2 data-layername={title.toLowerCase()}>{title}</h2>
            {type === "icon" && (
                <div className="flex shrink-0 mt-7 rounded-3xl border border-gray-300 border-solid h-[110px] w-[110px]" />
            )}
            {type === "button" && (
                <div className="flex items-center gap-2">
                    <button
                        className="flex flex-col self-stretch px-6 py-16 mt-7 text-lg rounded-3xl border border-gray-300 border-solid max-md:px-5 transition-transform duration-300 transform hover:scale-105 hover:bg-gray-200"
                        onClick={() => functionality()}
                    >
                        <img
                            loading="lazy"
                            src={iconSrc}
                            alt=""
                            className="object-contain self-center w-10 aspect-square"
                        />
                        <span 
                            data-layername={buttonText?.toLowerCase()}
                            className="mt-7"
                        >
                            {buttonText}
                        </span>
                    </button>
                    <div className="flex gap-3 ">
                        {previousCreations.length > 0 &&
                            previousCreations.map((previousCreation) => (
                                <div
                                    key={previousCreation._id}
                                    className="flex h-[230px] w-[210px] rounded-r-lg justify-center items-center border-2 cursor-pointer"
                                    onClick={() => navigate(`/workspace/${previousCreation._id}`)}
                                >
                                    <span>{previousCreation.name}</span>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default SidebarItem;
