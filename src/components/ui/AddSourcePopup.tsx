import { useState, DragEvent, ChangeEvent, KeyboardEvent } from "react";
import { Upload, Link, X, FileCheck, Lock } from "lucide-react";
import { useParams } from "react-router-dom";
import useUserStore from "../../store/userStore";
import toast from "react-hot-toast";
import { ThreeDot } from "react-loading-indicators";
import apiClient, { setAuthToken } from "../../api/axiosClient";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AddSourcePopup = () => {
    const [url, setUrl] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const { workspaceId } = useParams();
    const { addSource, setSourcePopup } = useUserStore();
    const { getToken } = useAuth();
    const { user } = useUser();

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
        const file = files[0];
        if (file) {
            setUploadedFile(file);
            setUrl("");
            handleUrlSubmit(file);
        }
    };

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length > 0) {
            const maxFileSize = 5 * 1024 * 1024;
            if (files[0].size > maxFileSize) {
                alert("File size exceeds 5MB. Please upload a smaller file.");
                e.target.value = "";
                return;
            } else {
                console.log("File is within size limit:");
            }
            handleFileSelect(files);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleUrlSubmit();
        }
    };

    const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
        if (e.target.value) {
            setUploadedFile(null);
        }
    };

    const handleUrlSubmit = async (selectedFile?: File) => {
        const fileToUpload = selectedFile || uploadedFile;
        if (!url && !fileToUpload) return;
        setLoading(true);
        try {
            const token = await getToken();
            setAuthToken(token);

            const formData = new FormData();
            if (!user) {
                toast.error("Please signup first");
                return;
            }
            formData.append("clerkId", user.id);

            if (fileToUpload) {
                formData.append("file", fileToUpload);
                formData.append("uploadType", "file");
            } else if (url) {
                formData.append("url", url);
                formData.append("uploadType", "url");
            }

            const resp = await apiClient.post(
                `${API_URL}/api/users/createSource/${workspaceId}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            addSource(resp.data.newSource);
            toast.success(resp.data.message);
            setUrl("");
            setUploadedFile(null);
            setSourcePopup();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.status);
                console.log(error.response?.data.message);
                toast.error(
                    error.response?.data.message || "Something went wrong"
                );
            } else {
                console.error(error);
            }
        } finally {
            setLoading(false);
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
                        </div>
                        <button
                            onClick={setSourcePopup}
                            className="text-gray-400 hover:text-gray-500 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Modal Content */}
                    <div className="p-6 space-y-8">
                        {/* Upload Area */}
                        <div
                            className={`relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center ${
                                url ? "opacity-50 pointer-events-none" : ""
                            }`}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            {uploadedFile ? (
                                <div className="flex flex-col items-center gap-4">
                                    <FileCheck className="w-12 h-12 text-green-500" />
                                    <div className="text-xl font-medium text-gray-700">
                                        File Selected: {uploadedFile.name}
                                    </div>
                                </div>
                            ) : url ? (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 rounded-lg">
                                    <Lock className="w-8 h-8 text-gray-700" />
                                    <span className="text-gray-700 ml-2">
                                        File upload disabled
                                    </span>
                                </div>
                            ) : (
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
                                                accept=".pdf,.txt,.xls,.xlsx,.xlsm,.doc,.docx"
                                                disabled={!!url}
                                            />
                                        </label>{" "}
                                        to upload
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Supported file types: PDF, txt, xls(5
                                        Mb)
                                    </div>
                                </div>
                            )}
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
                                    onChange={handleUrlChange}
                                    onKeyDown={handleKeyDown}
                                    disabled={!!uploadedFile}
                                />
                            </div>
                            {loading ? (
                                <ThreeDot
                                    color="#101210"
                                    size="medium"
                                    text=""
                                    textColor=""
                                />
                            ) : (
                                <button
                                    onClick={() => handleUrlSubmit()}
                                    className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors"
                                    disabled={!url && !uploadedFile}
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
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSourcePopup;
