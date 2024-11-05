import { useEffect, useState } from "react";
import WorkspaceSidebar from "../components/WorkspaceSidebar";
import WorkspaceMain from "../components/WorkspaceMain";
import NewNotePopup from "../components/ui/NewNotePopup";
import AddSourcePopup from "../components/ui/AddSourcePopup";
import useUserStore from "../store/userStore";

function Workspace() {
    const [openNewNote, setOpenNewNote] = useState(false);
    const [openSourceAdd, setOpenSourceAdd] = useState(false);
    const [checkedSource, setCheckedSource] = useState<boolean[]>([]);
    const { sources } = useUserStore();

    useEffect(() => {
        setCheckedSource(Array(sources.length).fill(true));
    }, [sources]);

    const handleNewNoteDisplay = () => {
        setOpenNewNote((prev) => !prev);
    };

    const handleAddSourceDisplay = () => {
        setOpenSourceAdd((prev) => !prev);
    };

    const handleCheckboxChange = (index: number) => {
        setCheckedSource((prevCheckedSource) => {
            const updatedCheckedSource = [...prevCheckedSource];
            updatedCheckedSource[index] = !updatedCheckedSource[index];
            return updatedCheckedSource;
        });
    };

    return (
        <main className="flex w-screen h-screen relative">
            <WorkspaceSidebar handleAddSourceDisplay={handleAddSourceDisplay} handleCheckboxChange={handleCheckboxChange}/>
            <WorkspaceMain handleNewNoteDisplay={handleNewNoteDisplay} checkedSource={checkedSource}/>
            {openNewNote && (
                <NewNotePopup handleNewNoteDisplay={handleNewNoteDisplay} />
            )}
            {openSourceAdd && (
                <AddSourcePopup
                    handleAddSourceDisplay={handleAddSourceDisplay}
                />
            )}
        </main>
    );
}

export default Workspace;
