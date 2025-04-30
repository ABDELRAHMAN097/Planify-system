import { MdAdminPanelSettings } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const statusColors = {
  "Not Started": "bg-gray-200 text-gray-700",
  "In Progress": "bg-yellow-200 text-yellow-800",
  Completed: "bg-green-200 text-green-800",
};

const TasksList = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [user, setUser] = useState(null);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, employeesRes] = await Promise.all([
          axios.get("http://localhost:3000/projects"),
          axios.get("http://localhost:3000/team"),
        ]);

        const project = projectsRes.data.find((p) => p.id === parseInt(projectId));
        if (project) {
          setTasks(project.tasks || []);
          setProjectName(project.name || "");
        }

        setEmployees(employeesRes.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [projectId]);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        📋 Tasks for Project: {projectName}
      </h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks registered for this project.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <li key={task.id} className="py-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                {task.assignedTo && (
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                    Developer:{" "}
                    {(() => {
                      const employee = employees.find((emp) => emp.id === task.assignedTo);
                      if (!employee) return "Unknown employee";
                      return (
                        <>
                          {employee.name}
                          {employee.isAdmin && (
                            <MdAdminPanelSettings
                              className="text-purple-600 text-xl ml-1"
                              title="Admin"
                            />
                          )}
                        </>
                      );
                    })()}
                  </p>
                )}
              </div>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  statusColors[task.status] || "bg-gray-100 text-gray-700"
                }`}
              >
                {task.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TasksList;