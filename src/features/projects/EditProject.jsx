import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const res = await axios.get(`http://localhost:3000/projects/${projectId}`);
      setProject(res.data);
    };
    fetchProject();
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTaskChange = (index, field, value) => {
    const updatedTasks = [...project.tasks];
    updatedTasks[index][field] = value;
    setProject({ ...project, tasks: updatedTasks });
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...project.tasks];
    updatedTasks.splice(index, 1);
    setProject({ ...project, tasks: updatedTasks });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // تحقق إذا كانت كل المهام مكتملة
    const allTasksCompleted =
      project.tasks.length > 0 &&
      project.tasks.every((task) => task.status === "Completed");
  
    // لو كل المهام مكتملة، غير حالة المشروع تلقائيًا
    const updatedProject = {
      ...project,
      status: allTasksCompleted ? "completed" : project.status,
    };
  
    await axios.put(`http://localhost:3000/projects/${projectId}`, updatedProject);
    navigate("/dashboard");
  };
  

  if (!project) return <p>جارٍ التحميل...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">تعديل المشروع</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={project.name}
          onChange={handleChange}
          placeholder="اسم المشروع"
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="description"
          value={project.description}
          onChange={handleChange}
          placeholder="وصف المشروع"
          className="w-full border px-4 py-2 rounded"
        />
        <select
          name="status"
          value={project.status}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="planned">مخطط</option>
          <option value="in-progress">قيد التنفيذ</option>
          <option value="completed">مكتمل</option>
        </select>

        <h3 className="text-lg font-semibold mt-6">المهام</h3>
        {project.tasks.map((task, index) => (
          <div
            key={index}
            className="border rounded p-3 mb-2 flex flex-col gap-2 bg-gray-50"
          >
            <input
              value={task.title}
              onChange={(e) =>
                handleTaskChange(index, "title", e.target.value)
              }
              className="w-full border px-3 py-1 rounded"
              placeholder="عنوان المهمة"
            />
            <select
              value={task.status}
              onChange={(e) =>
                handleTaskChange(index, "status", e.target.value)
              }
              className="w-full border px-3 py-1 rounded"
            >
              <option value="Not Started">لم تبدأ</option>
              <option value="In Progress">قيد التنفيذ</option>
              <option value="Completed">مكتملة</option>
            </select>
            <button
              type="button"
              onClick={() => handleDeleteTask(index)}
              className="text-red-600 hover:underline self-start"
            >
              حذف المهمة
            </button>
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          حفظ التعديلات
        </button>
      </form>
    </div>
  );
};

export default EditProject;
