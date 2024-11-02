import { useState } from "react";
import WorkspaceSidebar from "../components/WorkspaceSidebar";
import WorkspaceMain from "../components/WorkspaceMain";
import NewNotePopup from "../components/ui/NewNotePopup";
import AddSourcePopup from "../components/ui/AddSourcePopup";

function Workspace() {
    const [openNewNote, setOpenNewNote] = useState(false);
    const [openSourceAdd, setOpenSourceAdd] = useState(false);

    const handleNewNoteDisplay = () => {
        setOpenNewNote((prev) => !prev);
    };

    const handleAddSourceDisplay = () => {
        setOpenSourceAdd((prev) => !prev);
    };
    return (
        <main className="flex w-screen h-screen relative">
            <WorkspaceSidebar handleAddSourceDisplay={handleAddSourceDisplay}/>
            <WorkspaceMain handleNewNoteDisplay={handleNewNoteDisplay} />
            {openNewNote && <NewNotePopup handleNewNoteDisplay={handleNewNoteDisplay}/>}
            {openSourceAdd && <AddSourcePopup handleAddSourceDisplay={handleAddSourceDisplay}/>}
        </main>
    );
}

export default Workspace;
