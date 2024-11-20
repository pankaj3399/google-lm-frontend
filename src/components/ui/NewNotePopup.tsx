import { useEffect, useState } from "react";
import { Minimize2, Pen } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useUserStore from "../../store/userStore";
import apiClient, { setAuthToken } from "../../api/axiosClient";
import { useAuth } from "@clerk/clerk-react";

const API_URL = import.meta.env.VITE_API_URL;

interface NewNotePopupProps {
    handleNewNoteDisplay: () => void;
}

const NewNotePopup: React.FC<NewNotePopupProps> = ({
    handleNewNoteDisplay,
}) => {
    const [value, setValue] = useState("");
    const [heading, setHeading] = useState("");
    const { workspaceId } = useParams();
    const { addNote, selectedNote, notes, updateNote } = useUserStore();
    const { getToken } = useAuth();


    useEffect(() => {
        if(selectedNote != -1) {
            setHeading(notes[selectedNote].heading);
            setValue(notes[selectedNote].content)
        }
    }, []);

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

    const handleSaveNote = async () => {
        if(heading === '' || value=== '') {
            toast.error('Please fill the heading and description');
            return;
        }
        try {
            const token = await getToken();
            setAuthToken(token);
    
            if (selectedNote !== -1) {
                const resp = await apiClient.put(
                    `${API_URL}/api/users/updateNote/${notes[selectedNote]._id}`,
                    {
                        heading: heading,
                        content: value,
                        type: 'Written Note'
                    }
                );
                updateNote(selectedNote, resp.data.note);
                toast.success("Updated Note");
                setValue('');
                setHeading('');
                handleNewNoteDisplay();
            } else {
                const resp = await apiClient.post(
                    `${API_URL}/api/users/createNewNote/${workspaceId}`,
                    {
                        heading: heading,
                        content: value,
                        type: 'Written Note'
                    }
                );
                addNote(resp.data);
                toast.success("Created Note");
                setValue('');
                setHeading('');
                handleNewNoteDisplay();
            }
        } catch (err) {
            toast.error("Something went wrong, please try again later!");
            console.log(err);
        }
    };
    

    return (
        <div className="absolute w-screen h-screen flex justify-center items-center backdrop-blur-sm">
            <div className="w-[70%] h-[80%] rounded-md p-5 bg-slate-100 flex flex-col shadow-md border-2">
                <div className="flex items-center justify-between pl-5 pr-5">
                    <div className="flex items-center space-x-2">
                        <Pen className="w-5 h-5 text-green-600"/>
                        <span className="text-green-600 font-medium">
                    Written Note
                </span>
                    </div>
                    <Minimize2
                        className="cursor-pointer"
                        onClick={handleNewNoteDisplay}
                    />
                </div>

                <div className="mt-2 mb-2 flex-shrink-0">
                    <div className="flex justify-between pr-5">
                        <input
                            type="text"
                            value={heading}
                            placeholder="Heading"
                            className="w-1/4 px-4 py-2 focus:outline-none border-2"
                            onChange={(e) => setHeading(e.target.value)}
                        />
                        <button
                            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                            onClick={handleSaveNote}
                        >
                    <span
                        className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Save
                    </span>
                        </button>
                    </div>
                </div>

                <div className="flex-grow overflow-hidden pb-5">
                    <ReactQuill
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        modules={modules}
                        formats={formats}
                        className="h-[90%]"
                    />
                </div>
            </div>
        </div>

    );
};

export default NewNotePopup;
