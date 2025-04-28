import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AiFillDelete } from 'react-icons/ai';

const ItemType = {
  MEMBER: 'member',
};

const DraggableMember = ({ member }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType.MEMBER,
    item: { id: member.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-4 border rounded shadow cursor-move bg-white transition-opacity ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <p className="font-bold">{member.name}</p>
      <p className="text-sm text-gray-600">{member.role}</p>
    </div>
  );
};

const DropZone = ({ onDrop, children }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemType.MEMBER,
    drop: (item) => onDrop(item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`min-h-[300px] p-4 border-2 border-dashed rounded transition-all ${
        isOver ? 'bg-green-100 border-green-400' : 'bg-gray-50 border-gray-300'
      }`}
    >
      {children}
    </div>
  );
};

const ProjectTeamManager = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjectAndTeam = useCallback(async () => {
    try {
      const [projRes, teamRes] = await Promise.all([
        fetch(`http://localhost:3000/projects/${id}`),
        fetch(`http://localhost:3000/team`),
      ]);

      if (!projRes.ok || !teamRes.ok) throw new Error('حدث خطأ أثناء تحميل البيانات');

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
      setError('فشل تحميل البيانات');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProjectAndTeam();
  }, [fetchProjectAndTeam]);

  const handleRemove = async (memberId) => {
    if (!project) return;

    const updatedTeam = project.team.filter((id) => id !== memberId);
    const updatedProject = { ...project, team: updatedTeam };

    try {
      const res = await fetch(`http://localhost:3000/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProject),
      });

      if (!res.ok) throw new Error('فشل الحذف');

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
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProject),
      });

      if (!res.ok) throw new Error('فشل الإضافة');

      setProject(updatedProject);
      const addedMember = allMembers.find((m) => m.id === memberId);
      if (addedMember) {
        setTeamMembers((prev) => [...prev, addedMember]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">جاري تحميل البيانات...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-6xl mx-auto py-8 px-6">
        <h1 className="text-3xl font-bold text-center mb-8">Project team management</h1>

        {project && (
          <>
            <h2 className="text-xl font-semibold mb-6 text-center">
            Project : {project.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4 text-center">All employees</h3>
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {allMembers
                    .filter((m) => !project.team.includes(m.id))
                    .map((member) => (
                      <DraggableMember key={member.id} member={member} />
                    ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4 text-center">Team members</h3>
                <DropZone onDrop={handleAddToTeam}>
                  {teamMembers.length === 0 ? (
                    <p className="text-center text-gray-500">Drag the staff here</p>
                  ) : (
                    <ul className="space-y-3">
                      {teamMembers.map((member) => (
                        <li
                          key={member.id}
                          className="flex items-center justify-between p-4 bg-white border rounded shadow"
                        >
                          <div>
                            <p className="font-bold">{member.name}</p>
                            <p className="text-sm text-gray-600">{member.role}</p>
                          </div>
                          <button
                            onClick={() => handleRemove(member.id)}
                            className="bg-slate-500 text-white px-3 py-1 rounded hover:bg-slate-600"
                          >
                            <AiFillDelete className="text-xl" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </DropZone>
              </div>
            </div>
          </>
        )}
      </div>
    </DndProvider>
  );
};

export default ProjectTeamManager;