import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProgressBar from "../../components/ProgressBar";
import SearchFilter from "../../components/SearchFilter";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const calculateProgress = useCallback((tasks) => {
    if (!tasks || tasks.length === 0) return 0;
    const completed = tasks.filter(
      (task) => task.status === "Completed"
    ).length;
    return Math.round((completed / tasks.length) * 100);
  }, []);

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/projects");
      const updatedProjects = [];

      for (const project of response.data) {
        const progress = calculateProgress(project.tasks);

        if (progress === 100 && project.status !== "completed") {
          await axios.put(`http://localhost:3000/projects/${project.id}`, {
            ...project,
            status: "completed",
          });
          updatedProjects.push({ ...project, status: "completed" });
        } else {
          updatedProjects.push(project);
        }
      }

      setProjects(updatedProjects);
      setError(null);
    } catch (error) {
      console.error("Error loading projects:", error);
      setError("Failed to load projects. Please try again later.");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [calculateProgress]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`http://localhost:3000/projects/${id}`);
        await loadProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
        setError("Failed to delete project");
      }
    }
  };

  const filteredProjects = projects.filter((project) => {
    if (!project) return false;
    
    const name = project.name || "";
    const description = project.description || "";
    const currentStatus = project.status || "";

    const matchesSearch = 
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      matchesSearch &&
      (filterStatus === "all" || filterStatus === currentStatus)
    );
  });

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <button 
          onClick={loadProjects}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Project Management</h1>
        <Link
          to="/projects/new"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-full md:w-auto text-center"
        >
          Create New Project
        </Link>
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {filteredProjects.length === 0 && !loading ? (
        <div className="text-center py-8 text-gray-500">
          No projects found
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            project && project.id && (
              <div
                key={project.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{project.name || "Untitled Project"}</h3>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      project.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : project.status === "in-progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {project.status || "unknown"}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">
                  {project.description || "No description available"}
                </p>

                <div className="mb-4">
                  <ProgressBar progress={calculateProgress(project.tasks)} />
                  <span className="text-sm text-gray-500 mt-1 block">
                    {calculateProgress(project.tasks)}% completed
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link to={`/tasks-list/${project.id}`}>
                    <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                      Tasks: {project.tasks?.length || 0}
                    </span>
                  </Link>
                  <Link to={`/project/${project.id}/team`}>
                    <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                      Team: {project.team?.length || 0}
                    </span>
                  </Link>
                  <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                    Start: {project.startDate ? new Date(project.startDate).toLocaleDateString() : "Not set"}
                  </span>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="space-x-2 flex items-center justify-center gap-2">
                    <Link
                      to={`/projects/edit/${project.id}`}
                      className="text-green-500 hover:text-green-600 text-sm"
                    >
                      <FiEdit className="text-xl" />
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-slate-500 hover:text-slate-600 text-sm"
                    >
                      <AiFillDelete className="text-xl" />
                    </button>
                  </div>

                  <Link
                    to={`/project/${project.id}/manage-team`}
                    className="text-purple-500 hover:text-purple-600 hover:bg-slate-200 p-1 rounded-md border border-purple-500 text-sm"
                  >
                    Manage Team
                  </Link>
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;