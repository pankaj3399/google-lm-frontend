import { BarChart3, Pencil } from "lucide-react";
import React from "react";
import useUserStore from "../../store/userStore";

interface SingleNoteProps {
    heading: string;
    content: string;
    indx: number;
    handleNewNoteDisplay: () => void;
}

const SingleNote: React.FC<SingleNoteProps> = ({
    heading,
    content,
    handleNewNoteDisplay,
    indx,
}) => {
    const { setSelectedNote } = useUserStore();
    const getPlainText = (html: string): string => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };
    return (
        <div
            className=" w-[350px] m-2 bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl"
            key={indx}
        >
            <div className="p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                        <BarChart3 className="w-6 h-6" />
                        <h4 className="">Google Analytics</h4>
                        <span className="text-sm">23 Sep</span>
                    </div>
                    <div className="flex gap-2">
                        <Pencil
                            size={15}
                            className="cursor-pointer"
                            onClick={() => {
                                handleNewNoteDisplay();
                                setSelectedNote(indx);
                            }}
                        />
                        <input type="checkbox" />
                    </div>
                </div>

                {/* Title */}
                <h3 className="mb-5">{heading} - Last 30 days</h3>

                {/* Content */}
                <div className="space-y-6 tracking-wide">
                    <p className="text-[#5F6369]">{getPlainText(content)}</p>
                </div>
            </div>
        </div>
    );
};

export default SingleNote;
