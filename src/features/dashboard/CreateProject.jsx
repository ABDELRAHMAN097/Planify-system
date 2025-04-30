import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateProject = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "planned",
    team: [],
    tasks: [],
  });

  const [taskInput, setTaskInput] = useState({
    title: "",
    status: "Not Started",
    assignedTo: "",
  });

  const handleTaskAdd = () => {
    if (taskInput.title.trim() === "" || !taskInput.assignedTo) return;

    setFormData((prev) => ({
      ...prev,
      tasks: [
        ...prev.tasks,
        {
          id: Date.now(),
          title: taskInput.title,
          status: taskInput.status,
          assignedTo: taskInput.assignedTo,
        },
      ],
    }));

    setTaskInput({ title: "", status: "Not Started", assignedTo: "" });
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/team");
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMemberSelect = (memberId) => {
    const isSelected = formData.team.includes(memberId);
    setFormData({
      ...formData,
      team: isSelected
        ? formData.team.filter((id) => id !== memberId)
        : [...formData.team, memberId],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/projects", {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      });
      alert("تم إنشاء المشروع بنجاح!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating project:", error);
      alert("حدث خطأ أثناء إنشاء المشروع");
    }
  };

  return (
    <div className="max-w-3xl border-2 my-3 mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl p-1 font-bold mb-8 text-center text-gray-800 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Create a new project
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full outline-none px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full outline-none px-4 py-2 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className="w-full outline-none px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              min={
                new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split("T")[0]
              }
              className="w-full outline-none px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              <option value="planned">planned</option>
              <option value="in-progress">in-progress</option>
              <option value="completed">completed</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Team members
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {members.map((member) => (
              <div
                key={member.id}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  formData.team.includes(member.id)
                    ? "bg-purple-100 border-purple-500"
                    : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                }`}
                onClick={() => handleMemberSelect(member.id)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center ${
                      formData.team.includes(member.id)
                        ? "bg-purple-600 text-white"
                        : "bg-white border border-gray-300"
                    }`}
                  >
                    {formData.team.includes(member.id) && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Tasks
          </label>
          <div className="flex flex-col md:flex-row gap-2 mb-4">
            <input
              type="text"
              value={taskInput.title}
              onChange={(e) =>
                setTaskInput({ ...taskInput, title: e.target.value })
              }
              placeholder="Task title"
              className="flex-1 px-3 py-2 border rounded-lg"
            />
            <select
              value={taskInput.status}
              onChange={(e) =>
                setTaskInput({ ...taskInput, status: e.target.value })
              }
              className="px-3 py-2 border rounded-lg"
            >
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <select
              value={taskInput.assignedTo}
              onChange={(e) =>
                setTaskInput({ ...taskInput, assignedTo: Number(e.target.value) })
              }
              className="px-3 py-2 border rounded-lg"
            >
              <option value="">Assign to...</option>
              {formData.team.map((id) => {
                const member = members.find((m) => m.id === id);
                return (
                  <option key={id} value={id}>
                    {member?.name}
                  </option>
                );
              })}
            </select>
            <button
              type="button"
              onClick={handleTaskAdd}
              className="bg-purple-600 text-white px-4 rounded-lg"
            >
              Add
            </button>
          </div>

          {formData.tasks.length > 0 && (
            <ul className="list-disc pl-6 space-y-1">
              {formData.tasks.map((task) => {
                const assignedMember = members.find(
                  (m) => m.id === task.assignedTo
                );
                return (
                  <li key={task.id}>
                    {task.title} - <span className="italic">{task.status}</span> -{' '}
                    <span className="text-sm text-gray-600">
                      {assignedMember?.name || "Unassigned"}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
