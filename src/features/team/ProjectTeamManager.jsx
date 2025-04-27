import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

const ProjectTeamManager = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const fetchProjectAndTeam = useCallback(async () => {
    try {
      const [projRes, teamRes] = await Promise.all([
        fetch(`http://localhost:3000/projects/${id}`),
        fetch(`http://localhost:3000/team`),
      ]);

      if (!projRes.ok || !teamRes.ok)
        throw new Error("حدث خطأ أثناء تحميل البيانات");

      const projectData = await projRes.json();
      const teamData = await teamRes.json();

      setProject(projectData);
      setAllMembers(teamData);

      const members = teamData.filter((member) =>
        projectData.team.includes(member.id)
      );
      setTeamMembers(members);
    } catch (err) {
      console.error(err);
      setError("فشل تحميل البيانات");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProjectAndTeam();
  }, [fetchProjectAndTeam]);

  useEffect(() => {
    
    setIsMobile(window.innerWidth <= 768);
    
    window.addEventListener("resize", () =>
      setIsMobile(window.innerWidth <= 768)
    );
    return () => {
      window.removeEventListener("resize", () =>
        setIsMobile(window.innerWidth <= 768)
      );
    };
  }, []);

  const handleRemove = async (memberId) => {
    if (!project) return;

    const updatedTeam = project.team.filter((id) => id !== memberId);
    const updatedProject = { ...project, team: updatedTeam };

    try {
      const res = await fetch(`http://localhost:3000/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProject),
      });

      if (!res.ok) throw new Error("فشل الحذف");

      setProject(updatedProject);
      setTeamMembers((prev) => prev.filter((m) => m.id !== memberId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToTeam = async (memberId) => {
    if (!project || project.team.includes(memberId)) return;

    const updatedTeam = [...project.team, memberId];
    const updatedProject = { ...project, team: updatedTeam };

    try {
      const res = await fetch(`http://localhost:3000/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProject),
      });

      if (!res.ok) throw new Error("Add failed");

      setProject(updatedProject);
      const addedMember = allMembers.find((m) => m.id === memberId);
      if (addedMember) {
        setTeamMembers((prev) => [...prev, addedMember]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading data...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto py-8 px-6 bg-white">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
        Project Team Management
      </h1>

      {project && (
        <>
          <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
            Project: {project.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4 text-center text-gray-700">
                All Employees
              </h3>
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {allMembers
                  .filter((m) => !project.team.includes(m.id))
                  .map((member) => (
                    <div
                      key={member.id}
                      className="p-4 border rounded shadow-md bg-gray-50"
                    >
                      <p className="font-bold text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.role}</p>
                      {isMobile ? (
                        <button
                          onClick={() => handleAddToTeam(member.id)}
                          className="bg-blue-500 text-white px-3 py-1 rounded mt-2 hover:bg-blue-600"
                        >
                          Add to the team
                        </button>
                      ) : (
                        <div className="cursor-move text-gray-600">
                          Withdraw Members Here
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4 text-center text-gray-700">
                Team Members
              </h3>
              <div>
                {teamMembers.length === 0 ? (
                  <p className="text-center text-gray-500">No team members</p>
                ) : (
                  <ul className="space-y-3">
                    {teamMembers.map((member) => (
                      <li
                        key={member.id}
                        className="flex items-center justify-between p-4 bg-white border rounded shadow-md"
                      >
                        <div>
                          <p className="font-bold text-gray-900">
                            {member.name}
                          </p>
                          <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                        <button
                          onClick={() => handleRemove(member.id)}
                          className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                        >
                          <AiFillDelete className="text-xl" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectTeamManager;
