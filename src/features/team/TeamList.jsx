import { Link } from 'react-router-dom';
import TeamMemberCard from './MemberCard';
import { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { MdAdminPanelSettings } from "react-icons/md";
import { motion } from 'framer-motion'; // استيراد مكتبة framer-motion

const TeamList = () => {
  const [team, setTeam] = useState([]);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser ? JSON.parse(storedUser) : null); 

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

  const deleteMember = async (memberId) => {
    try {
      await fetch(`http://localhost:3000/team/${memberId}`, {
        method: 'DELETE',
      });
      setTeam(team.filter(member => member.id !== memberId));
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const editRoll = async (memberId) => {
    try {
      await fetch(`http://localhost:3000/team/${memberId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ isLead: true }), 
      });

      setTeam(team.map(member => 
        member.id === memberId ? { ...member, isLead: true } : member
      ));
    } catch (error) {
      console.error('Error updating member role:', error);
    }
  };

  const isAdmin = user?.isAdmin;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Team Work</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {team.map(member => (
          <div key={member.id} className="relative">
            <Link to={`/team/${member.id}`}>
              <TeamMemberCard member={member} />
            </Link>

            {/* إذا كان العضو تيم ليدر، قم بإظهار نص "Team Leader" */}
            {member.isLead && (
              <motion.div 
                className="absolute top-2 left-2 bg-white text-purple-500 px-2 py-1 rounded-full text-sm font-semibold"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }} // إضافة الأنيميشن للنص
              >
                Leader
              </motion.div>
            )}

            {/* admin only */}
            {isAdmin && (
              <motion.button
                onClick={() => deleteMember(member.id)}
                className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full hover:border-purple-600"
                whileHover={{ scale: 1.1 }} // الأنيميشن عند التحويم
                whileTap={{ scale: 0.95 }} // الأنيميشن عند الضغط
              >
                <AiFillDelete className="text-xl text-slate-500 hover:text-slate-600" />
              </motion.button>
            )}

            {isAdmin && (
              <motion.button
                onClick={() => editRoll(member.id)}
                className="absolute top-10 right-2 bg-white px-2 py-1 rounded-full hover:border-purple-600"
                whileHover={{ scale: 1.1 }} // الأنيميشن عند التحويم
                whileTap={{ scale: 0.95 }} // الأنيميشن عند الضغط
              >
                <MdAdminPanelSettings className="text-xl text-slate-500 hover:text-slate-600" />
              </motion.button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;
