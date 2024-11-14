import  { useEffect, useState } from "react";
import WorkspaceSidebar from "../components/WorkspaceSidebar";
import WorkspaceMain from "../components/WorkspaceMain";
import NewNotePopup from "../components/ui/NewNotePopup";
import AddSourcePopup from "../components/ui/AddSourcePopup";
import useUserStore from "../store/userStore";
import IntegrationPopup from "../components/ui/IntegrationPopup.tsx";

function Workspace() {
    // const [openNewNote, setOpenNewNote] = useState(false);
    const [openSourceAdd, setOpenSourceAdd] = useState(false);
    const [checkedSource, setCheckedSource] = useState<boolean[]>([]);
    const { sources, integrationPopup, sourcePopup, setIntegrationPopup, setSourcePopup } = useUserStore();

    useEffect(() => {
        setCheckedSource(Array(sources.length).fill(true));
    }, [sources]);

    const handleNewNoteDisplay = () => {
        setSourcePopup();
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

    const handlePopup = () => {
        setIntegrationPopup();
    };

    return (
        <main className="flex w-screen h-screen relative">
            <WorkspaceSidebar handleAddSourceDisplay={handleAddSourceDisplay} handleCheckboxChange={handleCheckboxChange}/>
            <WorkspaceMain handleNewNoteDisplay={handleNewNoteDisplay} checkedSource={checkedSource}/>
            {sourcePopup && (
                <NewNotePopup handleNewNoteDisplay={handleNewNoteDisplay} />
            )}
            {openSourceAdd && (
                <AddSourcePopup
                    handleAddSourceDisplay={handleAddSourceDisplay}
                />
            )}
            {integrationPopup && <IntegrationPopup handlePopup={handlePopup} />}
        </main>
    );
}

export default Workspace;
