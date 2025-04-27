import { Link } from 'react-router-dom';
import TeamMemberCard from './MemberCard';
import { useEffect, useState } from 'react';

const TeamList = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch('http://localhost:3000/team');
        const data = await response.json();
        setTeam(data);
      } catch (error) {
        console.error('Error fetching team:', error);
      }
    };
    fetchTeam();
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Team Work</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {team.map(member => (
          <Link to={`/team/${member.id}`} key={member.id}>
            <TeamMemberCard member={member} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TeamList;
