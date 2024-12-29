import { useEffect, useState } from "react";
import { Minimize2, Pen } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useUserStore from "../../store/userStore";
import apiClient, { setAuthToken } from "../../api/axiosClient";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { marked } from "marked";
import DOMPurify from "dompurify";

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
    const convertMarkdownToHtml = () => {
      if (selectedNote !== -1) {
        const markdownContent = notes[selectedNote].content;
        const parsedHtml = marked(markdownContent);
        const sanitizedHtml = DOMPurify.sanitize(parsedHtml as string);
        setValue(sanitizedHtml);
        setHeading(notes[selectedNote].heading);
      }
    };

    convertMarkdownToHtml();
  }, [notes, selectedNote]);

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
    console.log("Handle save");
    
    
    if (value === "" || selectedNote !== -1) {
      if(selectedNote && (heading !== notes[selectedNote].heading || value !== notes[selectedNote].content)){
        try {
          const token = await getToken();
          setAuthToken(token);
          const resp = await apiClient.put(
            `${API_URL}/api/users/updateNote/${notes[selectedNote]._id}`,
            {
              heading: heading || "New Note",
              content: value,
            },
          );
          updateNote(selectedNote,resp.data.note);
          toast.success("Updated Note");
          setValue("");
          setHeading("");
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log(error.status);
            console.error(error.response);
            toast.error(error.response?.data.message || "Something went wrong");
          } else {
            console.error(error);
          }
        }
      }
      return;
    }
   
    try {
      const token = await getToken();
      setAuthToken(token);
      const resp = await apiClient.post(
        `${API_URL}/api/users/createNewNote/${workspaceId}`,
        {
          heading: heading || "New Note",
          content: value,
          type: "Written Note",
        },
      );
      addNote(resp.data.savedNote);
      toast.success("Created Note");
      setValue("");
      setHeading("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
        toast.error(error.response?.data.message || "Something went wrong");
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div
      className="absolute w-screen h-screen flex justify-center items-center left-0 top-0"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      onClick={() => {
        handleSaveNote();
        handleNewNoteDisplay();
      }}
    >
      <div
        className="w-[70%] h-[80%] rounded-md p-5 bg-slate-100 flex flex-col shadow-md border-2"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex items-center justify-between pl-5 pr-5">
          <div className="flex items-center space-x-2">
            <Pen className="w-5 h-5 text-green-600" />
            <span className="text-[#26AF36] font-semibold  font-sfpro">
              Written Note
            </span>
          </div>
          <Minimize2
            className="cursor-pointer"
            onClick={() => {
              handleSaveNote();
              handleNewNoteDisplay();
            }}
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
          </div>
        </div>

        <div className="flex-grow overflow-hidden pb-5">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
            className="h-[90%] rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default NewNotePopup;