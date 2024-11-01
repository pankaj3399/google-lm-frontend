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
                    <input
                        type="text"
                        value={"Identify points"}
                        className="w-1/4 px-4 py-2 focus:outline-none border-2"
                        disabled
                    />

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
