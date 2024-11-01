import React, { useState } from "react";
import WorkspaceSidebar from "../components/WorkspaceSidebar";
import WorkspaceMain from "../components/WorkspaceMain";
import NewNotePopup from "../components/ui/NewNotePopup";

function Workspace() {
    const [openNewNote, setOpenNewNote] = useState(false);
    const handleNewNoteDisplay = () => {
        setOpenNewNote((prev) => !prev);
    };
    return (
        <main className="flex w-screen h-screen relative">
            <WorkspaceSidebar />
            <WorkspaceMain handleNewNoteDisplay={handleNewNoteDisplay} />
            {openNewNote && <NewNotePopup handleNewNoteDisplay={handleNewNoteDisplay}/>}
        </main>
    );
}

export default Workspace;
