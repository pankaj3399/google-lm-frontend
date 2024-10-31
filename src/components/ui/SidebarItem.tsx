import React from "react";

interface SidebarItemProps {
  title: string;
  type: "icon" | "button" | "otherType";
  buttonText?: string;
  iconSrc?: string;
  key: number;
  handlePopup: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  title,
  type,
  buttonText,
  iconSrc,
  handlePopup
}) => {
  return (
    <>
      <h2 data-layername={title.toLowerCase()}>{title}</h2>
      {type === "icon" && (
        <div className="flex shrink-0 mt-7 rounded-3xl border border-gray-300 border-solid h-[110px] w-[110px]" />
      )}
      {type === "button" && (
        <button className="flex flex-col self-stretch px-6 py-16 mt-7 text-lg rounded-3xl border border-gray-300 border-solid max-md:px-5 transition-transform duration-300 transform hover:scale-105 hover:bg-gray-200"
          onClick={() => handlePopup()}
        >
        <img
          loading="lazy"
          src={iconSrc}
          alt=""
          className="object-contain self-center w-10 aspect-square"
        />
        <span data-layername={buttonText?.toLowerCase()} className="mt-7">
          {buttonText}
        </span>
      </button>
      )}
    </>
  );
};

export default SidebarItem;
