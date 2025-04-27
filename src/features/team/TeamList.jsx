import { Link } from 'react-router-dom';
import TeamMemberCard from './MemberCard';
import { useEffect, useState } from 'react';

const TeamList = () => {
  const [team, setTeam] = useState([]);
  const [user, setUser] = useState(null); // سيتم إضافة المتغير الخاص بالـ user هنا

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser ? JSON.parse(storedUser) : null); // جلب الـ user من localStorage

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

  // دالة لحذف العضو
  const deleteMember = async (memberId) => {
    try {
      // إرسال طلب لحذف العضو من الـ API
      await fetch(`http://localhost:3000/team/${memberId}`, {
        method: 'DELETE',
      });
      
      // تحديث الـ state بعد الحذف
      setTeam(team.filter(member => member.id !== memberId));
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  // فحص إذا كان الـ user هو أدمن
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

            {/* فقط إذا كان المستخدم أدمن نعرض زر الحذف */}
            {isAdmin && (
              <button
                onClick={() => deleteMember(member.id)}
                className="absolute top-0 right-0 bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;
