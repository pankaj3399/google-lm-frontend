import { useEffect, useState } from "react";
import WorkspaceSidebar from "../components/WorkspaceSidebar";
import WorkspaceMain from "../components/WorkspaceMain";
import NewNotePopup from "../components/ui/NewNotePopup";
import AddSourcePopup from "../components/ui/AddSourcePopup";
import useUserStore from "../store/userStore";
import IntegrationPopup from "../components/ui/IntegrationPopup.tsx";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

function Workspace() {
  const [checkedSource, setCheckedSource] = useState<boolean[]>([]);
  const { sources, integrationPopup, sourcePopup, setIntegrationPopup } =
    useUserStore();
  const location = useLocation();
  const [notesPopup, setNotesPopup] = useState(false);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  useEffect(() => {
    setCheckedSource(Array(sources.length).fill(true));
  }, [sources]);

  const checkAllSources = () => {
    setCheckedSource(Array(sources.length).fill(true));
  };
  const uncheckAllSources = () => {
    setCheckedSource(Array(sources.length).fill(false));
  };

  const handleCheckboxChange = (index: number) => {
    setCheckedSource((prevCheckedSource) => {
      const updatedCheckedSource = [...prevCheckedSource];
      updatedCheckedSource[index] = !updatedCheckedSource[index];
      return updatedCheckedSource;
    });
  };

  const handleNotesPopup = () => {
    setNotesPopup((prev) => !prev);
  };

  const handlePopup = () => {
    setIntegrationPopup();
  };

  return (
    <main className="flex w-screen h-screen relative">
      <WorkspaceSidebar
        handleCheckboxChange={handleCheckboxChange}
        checkedSource={checkedSource}
        checkAllSources={checkAllSources}
        uncheckAllSources={uncheckAllSources}
      />
      <WorkspaceMain
        handleNewNoteDisplay={handleNotesPopup}
        checkedSource={checkedSource}
      />
      {notesPopup && <NewNotePopup handleNewNoteDisplay={handleNotesPopup} />}
      {sourcePopup && <AddSourcePopup />}
      {integrationPopup && <IntegrationPopup handlePopup={handlePopup} />}
    </main>
  );
}

export default Workspace;
