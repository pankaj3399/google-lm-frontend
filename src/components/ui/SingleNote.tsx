import { BarChart3 } from "lucide-react";
import React from "react";

interface SingleNoteProps {
    heading: string;
    content: string;
}

const SingleNote: React.FC<SingleNoteProps> = ({ heading, content }) => {
    const getPlainText = (html: string): string => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html"); // Parse HTML string
        return doc.body.textContent || ""; // Extract plain text
    };
    return (
        <div className=" w-[350px] m-2 bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
            <div className="p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                        <BarChart3 className="w-6 h-6" />
                        <h4 className="">Google Analytics</h4>
                        <span className="text-sm">23 Sep</span>
                    </div>
                    <input type="checkbox" />
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
