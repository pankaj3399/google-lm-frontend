import { useState } from "react";
import { Minimize2, Pen } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface NewNotePopupProps {
    handleNewNoteDisplay: () => void;
}

const NewNotePopup: React.FC<NewNotePopupProps> = ({
    handleNewNoteDisplay,
}) => {
    const [value, setValue] = useState("");

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "link"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "link",
        "list",
        "bullet",
    ];

    return (
        <div className="absolute w-screen h-screen flex justify-center items-center backdrop-blur-sm">
            <div className=" w-[70%] h-[80%] rounded-md p-5 bg-slate-100">
                <div className="flex items-center justify-between pl-5 pr-5">
                    <div className="flex items-center space-x-2">
                        <Pen className="w-5 h-5 text-green-600" />
                        <span className="text-green-600 font-medium">
                            Written Note
                        </span>
                    </div>
                    <Minimize2
                        className="cursor-pointer"
                        onClick={handleNewNoteDisplay}
                    />
                </div>

                <div className="mt-2 mb-2">
                    <div className="flex justify-between pr-5">
                        <input
                            type="text"
                            value={"Identify points"}
                            className="w-1/4 px-4 py-2 focus:outline-none border-2"
                            disabled
                        />

                        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Save
                            </span>
                        </button>
                    </div>

                    <ReactQuill
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        modules={modules}
                        formats={formats}
                        className="h-[calc(100vh-280px)] pb-5"
                    />
                </div>
            </div>
        </div>
    );
};

export default NewNotePopup;
