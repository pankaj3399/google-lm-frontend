import React from "react";
import moment from "moment";
import useUserStore from "../../store/userStore";
import markdownToTxt from "markdown-to-txt";
// import icon5 from "../../assets/Icon5.svg";
// import Edit from "../../assets/Edit.svg";
// import File from "../../assets/File.svg";
// import Message from "../../assets/Message.svg";

interface SingleNoteProps {
    heading: string;
    content: string;
    indx: number;
    updatedAt: string;
    createdAt: string;
    type: string;
    selectedNotes: boolean[];
    handleNewNoteDisplay: () => void;
    handleToggleNote: (indx: number) => void;
}

const SingleNote: React.FC<SingleNoteProps> = ({
    heading,
    content,
    indx,
    createdAt,
    type,
    selectedNotes,
    handleToggleNote,
    handleNewNoteDisplay,
}) => {
    function getIcon(iconType: string) {
        switch (iconType) {
            case "Written Note":
                return '/Edit.svg';
            case "Saved":
                return '/Message.svg';
            case "Report":
                return '/File.svg';
            case "Analytics":
                return '/icon5.svg';
            default:
                return '/icon5.svg';
        }
    }
    const IconComponent = getIcon(type);
    const { setSelectedNote } = useUserStore();
    return (
        <div
            className=" w-[350px] max-h-[350px] m-2 bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl cursor-pointer"
            key={indx}
            onClick={() => {
                handleNewNoteDisplay();
                setSelectedNote(indx);
            }}
        >
            <div className="p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-1">
                        <img src={IconComponent} alt="icon" className="h-5" />
                        <h4
                            className={`${
                                type === "Written Note"
                                    ? "text-[#26AF36]"
                                    : type === "Saved"
                                    ? "text-[#6DA2FF]"
                                    : type === "Report"
                                    ? "text-[#6DA2FF]"
                                    : "text-[#42526E]"
                            }`}
                        >
                            {type}
                        </h4>
                        <span className="text-sm text-gray-500 ml-2">
                            {moment(createdAt).format(" Do MMM")}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="checkbox"
                            checked={selectedNotes[indx]}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleToggleNote(indx);
                            }}
                        />
                    </div>
                </div>

                {/* Title */}
                <h3 className="mb-5 text-[#5F6369]">
                    {heading && heading.substring(0, 20)}
                    {heading && heading.length > 20 ? ".. " : ""}
                </h3>

                {/* Content */}
                <div className="space-y-6 tracking-wide">
                    <p className="text-gray-700">
                        {(content &&
                            markdownToTxt(
                                content
                                    .replace(/(<([^>]+)>)/gi, "")
                                    .substring(0, 330)
                            )) ||
                            "No Data Available."}
                        {content && content.length > 330 ? "..." : ""}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SingleNote;
