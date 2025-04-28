import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const MemberDetails = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const roleColors = {
    "مطورويب": "bg-blue-500",
    "webdeveloper": "bg-blue-500",
    "باكاند": "bg-purple-500",
    "backend": "bg-purple-500",
    "فرونت اند": "bg-green-500",
    "frontend": "bg-green-500",
    "uiux": "bg-pink-500",
    "مصممuiux": "bg-pink-500",
  };

  const normalizeRole = (role) => {
    return role?.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '') || '';
  };

  const getRoleColor = (role) => {
    const normalizedRole = normalizeRole(role);
    return roleColors[normalizedRole] || "bg-gray-500";
  };

  const calculateProjectProgress = (tasks) => {
    if (!tasks || tasks.length === 0) return 0;
    const completed = tasks.filter(task => task.status === "Completed").length;
    return Math.round((completed / tasks.length) * 100);
  };

  const handleTaskStatusChange = async (projectId, taskId, newStatus) => {
    try {
      // 1. تحديث حالة المهمة في الخادم
      const response = await fetch(`http://localhost:3000/projects/${projectId}`);
      const project = await response.json();
      
      const updatedTasks = project.tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      );

      await fetch(`http://localhost:3000/projects/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          ...project,
          tasks: updatedTasks,
          // تحديث حالة المشروع تلقائياً إذا اكتملت جميع المهام
          status: calculateProjectProgress(updatedTasks) === 100 ? "completed" : project.status
        }),
      });

      // 2. تحديث الحالة المحلية
      setProjects(prevProjects => 
        prevProjects.map(project => 
          project.id === projectId 
            ? { 
                ...project, 
                tasks: updatedTasks,
                status: calculateProjectProgress(updatedTasks) === 100 ? "completed" : project.status
              } 
            : project
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [memberRes, projectsRes] = await Promise.all([
          fetch(`http://localhost:3000/team/${id}`),
          fetch("http://localhost:3000/projects")
        ]);
        
        const memberData = await memberRes.json();
        const allProjects = await projectsRes.json();
        
        const memberProjects = allProjects.filter(project => 
          project.team?.includes(Number(id))
        ).map(project => ({
          ...project,
          progress: calculateProjectProgress(project.tasks)
        }));

        setMember(memberData);
        setProjects(memberProjects);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!member) {
    return <div className="flex justify-center items-center h-screen">العضو غير موجود</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/TeamList" className="inline-block mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          العودة للفريق
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className={`${getRoleColor(member.role)} p-6 text-white`}>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-5xl font-bold text-gray-800">
                {member.name?.charAt(0) || "?"}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{member.name || "No Name"}</h1>
                <p className="text-xl opacity-90">{member.role || "No Role"}</p>
                <p className="opacity-80">{member.email || "No Email"}</p>
              </div>
            </div>
          </div>

          <div className="p-6 grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">المشاريع المشارك فيها</h2>
              {projects.length > 0 ? (
                <ul className="space-y-4">
                  {projects.map(project => (
                    <li key={project.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{project.name}</h3>
                          <p className="text-gray-600 text-sm">{project.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          project.status === "completed" ? "bg-green-100 text-green-800" :
                          project.status === "in-progress" ? "bg-blue-100 text-blue-800" :
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {project.status || "planned"}
                        </span>
                      </div>

                      <div className="mt-3">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500" 
                            style={{ width: `${calculateProjectProgress(project.tasks)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {calculateProjectProgress(project.tasks)}% مكتمل
                        </p>
                      </div>

                      <div className="mt-3">
                        <h4 className="font-medium mb-2">المهام:</h4>
                        <ul className="space-y-2">
                          {project.tasks?.map(task => (
                            <li key={task.id} className="flex items-center justify-between">
                              <span>{task.title}</span>
                              <select
                                value={task.status}
                                onChange={(e) => handleTaskStatusChange(project.id, task.id, e.target.value)}
                                className={`px-2 py-1 rounded text-sm ${
                                  task.status === "Completed" ? "bg-green-100 text-green-800" :
                                  task.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                                  "bg-gray-100 text-gray-800"
                                }`}
                              >
                                <option value="Not Started">لم تبدأ</option>
                                <option value="In Progress">قيد التنفيذ</option>
                                <option value="Completed">مكتملة</option>
                              </select>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">لا يوجد مشاريع مشارك فيها</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-medium mb-2">المهارات</h3>
                <div className="flex flex-wrap gap-2">
                  {member.skills?.map((skill, index) => (
                    <span key={index} className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  )) || <span>لا توجد مهارات مسجلة</span>}
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-medium mb-2">معلومات التواصل</h3>
                <p className="text-sm">البريد: {member.email}</p>
                <p className="text-sm mt-1">الهاتف: {member.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;