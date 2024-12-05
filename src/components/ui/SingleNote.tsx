import {
    BarChart3,
    Pen,
    MessageSquare,
    NotepadText,
    ChartNoAxesColumnIncreasing,
} from "lucide-react";
import React from "react";
import moment from "moment";
import useUserStore from "../../store/userStore";
import markdownToTxt from "markdown-to-txt";

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
                return Pen;
            case "Saved":
                return MessageSquare;
            case "Report":
                return NotepadText;
            case "Analytics":
                return ChartNoAxesColumnIncreasing;
            default:
                return BarChart3;
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
                    <div className="flex items-center gap-2">
                        <IconComponent className="w-6 h-6" />
                        <h4 className="">{type}</h4>
                        <span className="text-sm text-gray-500">
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
                <h3 className="mb-5 font-bold">
                    {heading && heading.substring(0, 20)}
                    {heading && heading.length > 20 ? ".. " : ""}
                </h3>

                {/* Content */}
                <div className="space-y-6 tracking-wide">
                    <p className="text-gray-700">
                        {content && markdownToTxt(content.replace(/(<([^>]+)>)/ig, '').substring(0, 330)) || "No Data Available."}
                        {/* <ReactMarkdown>
                            {content.substring(0, 330) || "No Data Available."}
                        </ReactMarkdown> */}
                        {content && content.length > 330 ? "..." : ""}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SingleNote;
