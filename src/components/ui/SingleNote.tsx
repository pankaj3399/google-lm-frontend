import { BarChart3, Pen, MessageSquare, NotepadText } from "lucide-react";
import React from "react";
// import useUserStore from "../../store/userStore";
import moment from "moment";

interface SingleNoteProps {
    heading: string;
    content: string;
    indx: number;
    updatedAt: string;
    createdAt: string;
    type: string;
    selectedNotes: boolean[];
    handleNewNoteDisplay: () => void;
    handleToggleNote: (indx: number)=> void;
}

const SingleNote: React.FC<SingleNoteProps> = ({
    heading,
    content,
    // handleNewNoteDisplay,
    indx,
    updatedAt,
    createdAt,
    type,
    selectedNotes,
    handleToggleNote
}) => {
    // const { setSelectedNote } = useUserStore();
    const getPlainText = (html: string): string => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        return doc.body.textContent || "";
        
    };

    function getIcon(iconType: string) {
        switch(iconType) {
            case 'Written Note': return Pen;
            case 'Saved': return MessageSquare;
            case 'Report': return NotepadText;
            default: return BarChart3;
        }
    }
    const IconComponent = getIcon(type);
    return (
        <div
            className=" w-[350px] max-h-[350px] m-2 bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl"
            key={indx}
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
                        <input type="checkbox" checked={selectedNotes[indx]} onClick={() => handleToggleNote(indx)}/>
                    </div>
                </div>

                {/* Title */}
                <h3 className="mb-5 font-bold">
                    {heading.substring(0, 20)}{".. "}
                    <span className="text-gray-500 ml-2">
                        {moment(updatedAt).format("MMMM Do YYYY")}
                    </span>
                </h3>

                {/* Content */}
                <div className="space-y-6 tracking-wide">
                    <p className="text-gray-700">{getPlainText(content).substring(0, 300) + (content.length > 300 ? '...' : '')}</p>
                </div>
            </div>
        </div>
    );
};

export default SingleNote;
