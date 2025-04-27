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

  useEffect(() => {
    const fetchProjectTasks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/projects");
        const project = res.data.find((p) => p.id === parseInt(projectId));
        if (project) {
          setTasks(project.tasks || []);
        }
      } catch (error) {
        console.error("Error fetching project tasks:", error);
      }
    };

    fetchProjectTasks();
  }, [projectId]);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 المهام</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500">لا توجد مهام في هذا المشروع.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <li key={task.id} className="py-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
              </div>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[task.status] || "bg-gray-100 text-gray-700"}`}
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
