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
                <div className="flex h-60 items-center gap-2">
                    <button
                        className="flex flex-col items-center justify-center w-48 h-48 px-4 py-4 text-lg font-medium rounded-3xl border border-gray-300 transition-transform duration-300 transform hover:scale-105 hover:bg-gray-200"
                        onClick={() => functionality()}
                    >
                        <img
                            loading="lazy"
                            src={iconSrc}
                            alt=""
                            className="object-contain w-12 h-12"
                        />
                        <span
                            data-layername={buttonText?.toLowerCase()}
                            className="mt-4 text-center text-gray-700"
                        >
                            {buttonText}
                        </span>
                    </button>
                    <div className="flex w-screen flex-wrap gap-4">
                        {previousCreations.length > 0 &&
                            previousCreations.map((previousCreation) => (
                                <div
                                    key={previousCreation._id}
                                    className="flex flex-col h-52 w-52 rounded-lg justify-center items-center border border-gray-300 bg-white shadow-md cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
                                    onClick={() =>
                                        navigate(
                                            `/workspace/${previousCreation._id}`
                                        )
                                    }
                                >
                                    <span className="text-gray-700 font-semibold text-center">
                                        {previousCreation.name}
                                    </span>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default SidebarItem;
