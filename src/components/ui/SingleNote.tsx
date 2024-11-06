import { BarChart3, Pencil } from "lucide-react";
import React from "react";
import useUserStore from "../../store/userStore";
import moment from "moment";

interface SingleNoteProps {
    heading: string;
    content: string;
    indx: number;
    updatedAt: string;
    createdAt: string;
    handleNewNoteDisplay: () => void;
}

const SingleNote: React.FC<SingleNoteProps> = ({
    heading,
    content,
    handleNewNoteDisplay,
    indx,
    updatedAt,
    createdAt,
}) => {
    const { setSelectedNote } = useUserStore();
    const getPlainText = (html: string): string => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };
    return (
        <div
            className=" w-[350px] max-h-[350px] m-2 bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl"
            key={indx}
        >
            <div className="p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                        <BarChart3 className="w-6 h-6" />
                        <h4 className="">Google Analytics</h4>
                        <span className="text-sm text-gray-500">
                            {moment(createdAt).format(" Do MMM")}
                        </span>
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
                <h3 className="mb-5">
                    {heading}{" "}
                    <span className="text-gray-500 ml-2">
                        {moment(updatedAt).format("MMMM Do YYYY")}
                    </span>
                </h3>

                {/* Content */}
                <div className="space-y-6 tracking-wide">
                    <p className="text-gray-700">{getPlainText(content)}</p>
                </div>
            </div>
        </div>
    );
};

export default SingleNote;
