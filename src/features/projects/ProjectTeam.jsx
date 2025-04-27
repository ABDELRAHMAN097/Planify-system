// components/ProjectTeam.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import TeamMemberCard from '../team/MemberCard';

const ProjectTeam = () => {
  const { id } = useParams(); 
  const [project, setProject] = useState(null);
  const [allMembers, setAllMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);

  useEffect(() => {
    const fetchProjectAndTeam = async () => {
      try {
        
        const projectRes = await fetch(`http://localhost:3000/projects/${id}`);
        const projectData = await projectRes.json();
        setProject(projectData);

        // allMembers
        const teamRes = await fetch(`http://localhost:3000/team`);
        const teamData = await teamRes.json();
        setAllMembers(teamData);

        // Members-filter
        const teamForProject = teamData.filter(member => projectData.team.includes(member.id));
        setFilteredMembers(teamForProject);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    if (id) fetchProjectAndTeam();
  }, [id]);

  if (!project) return <div className="w-full h-screen bg-black text-white text-center py-10">loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        فريق عمل مشروع: <span className="text-indigo-600">{project.name}</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {filteredMembers.map(member => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default ProjectTeam;
