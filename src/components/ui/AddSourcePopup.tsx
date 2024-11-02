import React, { useState, DragEvent, ChangeEvent, KeyboardEvent } from "react";
import { Upload, Link, X } from "lucide-react";

interface AddSourcePopupProps {
    handleAddSourceDisplay: () => void;
}

const AddSourcePopup: React.FC<AddSourcePopupProps> = ({
    handleAddSourceDisplay,
}) => {
    const [url, setUrl] = useState<string>("");

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const { files } = e.dataTransfer;
        if (files && files.length > 0) {
            handleFileSelect(files);
        }
    };

    const handleFileSelect = (files: FileList) => {
        console.log("Files selected:", files);
    };

    const handleUrlSubmit = () => {
        console.log("URL submitted:", url);
    };

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length > 0) {
            handleFileSelect(files);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleUrlSubmit();
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-6 border-b">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Add Sources
                            </h2>
                            <div className="bg-gray-100 rounded-full p-1">
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-4 h-4 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 16v-4" />
                                    <path d="M12 8h.01" />
                                </svg>
                            </div>
                        </div>
                        <button
                            onClick={() => console.log("Close clicked")}
                            className="text-gray-400 hover:text-gray-500 transition-colors"
                        >
                            <X
                                className="w-6 h-6"
                                onClick={handleAddSourceDisplay}
                            />
                        </button>
                    </div>

                    {/* Modal Content */}
                    <div className="p-6 space-y-8">
                        {/* Upload Area */}
                        <div
                            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <div className="flex flex-col items-center gap-4">
                                <Upload className="w-12 h-12 text-gray-400" />
                                <div className="text-xl font-medium text-gray-700">
                                    Upload sources
                                </div>
                                <div className="text-sm text-gray-500">
                                    Drag and Drop or{" "}
                                    <label className="text-blue-600 hover:text-blue-700 cursor-pointer">
                                        <span>choose file</span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileInputChange}
                                            accept=".pdf,.txt,.xls"
                                        />
                                    </label>{" "}
                                    to upload
                                </div>
                                <div className="text-xs text-gray-500">
                                    Supported file types: PDF, txt, xls
                                </div>
                            </div>
                        </div>

                        {/* Website Input */}
                        <div className="flex items-center gap-3 w-full">
                            <div className="flex items-center gap-2 flex-grow bg-white rounded-lg border border-gray-300">
                                <div className="pl-3">
                                    <Link className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="url"
                                    placeholder='Example: "www.xyz.com/blog-post"'
                                    className="w-full py-2 px-2 text-gray-700 focus:outline-none rounded-lg"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            <button
                                onClick={handleUrlSubmit}
                                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-6 h-6 text-gray-600"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSourcePopup;
