 import { useParams } from "react-router-dom";

import LibraryPanel from "./components/LibraryPanel";
import AccountsPanel from "./components/AccountsPanel";
import TpPanel from "./components/TpPanel";
import HostelPanel from "./components/HostelPanel";
import SportsPanel from "./components/SportsPanel";
import HodPanel from "./components/HodPanel";
import ExamPanel from "./components/ExamPanel";

export default function DepartmentDashboard() {
  const { dept } = useParams();

  return (
    // <div className="min-h-screen bg-gray-100 p-8">
    <> 
      {dept === "library" && <LibraryPanel />}
      {dept === "accounts" && <AccountsPanel />}
      {dept === "tp" && <TpPanel />}
      {dept === "hostel" && <HostelPanel />}
      {dept === "sports" && <SportsPanel />}
      {dept === "hod" && <HodPanel />}
      {dept === "exam" && <ExamPanel />}
     
    </>
  );
}
