import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./features/dashboard/Dashboard.jsx";
import CreateProject from "./features/dashboard/CreateProject.jsx";
import TeamList from "./features/team/TeamList.jsx";
import TasksList from "./features/tasks/TaskList.jsx";
import MemberDetails from "./features/team/MemberDetails.jsx";
import ProjectTeam from "./features/projects/ProjectTeam.jsx";
import ProjectTeamManager from "./features/team/ProjectTeamManager.jsx";
import EditProject from "./features/projects/EditProject.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import ProtectedRoutes from "./lib/utils/ProtectedRoutes.jsx";

function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
         <Route 
          path="/projects/new" 
          element={
            <ProtectedRoutes>
              <CreateProject />
            </ProtectedRoutes>
          }
        />
      
        <Route path="/TeamList" element={<TeamList />} />
        <Route path="/tasks-list/:projectId" element={<TasksList />} />
        <Route path="/team/:id" element={<MemberDetails />} />
        <Route path="/project/:id/team" element={<ProjectTeam />} />
        <Route
          path="/project/:id/manage-team"
          element={<ProjectTeamManager />}
        />
        <Route path="/projects/edit/:projectId" element={<EditProject />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
