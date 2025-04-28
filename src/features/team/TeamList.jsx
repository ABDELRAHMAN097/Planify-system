import TeamMemberCard from './MemberCard';
import { useEffect, useState, useCallback } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { MdAdminPanelSettings } from "react-icons/md";
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast'; 

const TeamList = () => {
  const [team, setTeam] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteMember = useCallback(async (memberId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete the member?");
      if (!confirmDelete) return;
  
      setIsLoading(true);
      const response = await fetch(`http://localhost:3000/team/${memberId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete member');
      }
  
      setTeam(prevTeam => prevTeam.filter(member => member.id !== memberId));
      toast.success("Member deleted successfully ✅");
    } catch (err) {
      console.error('Error deleting member:', err);
      setError(err.message);
      toast.error('An error occurred while deleting ❌');
    } finally {
      setIsLoading(false);
    }
  }, []);  
  
  useEffect(() => {
    const loadData = async () => {
      if (team.length > 0) return; 
      
      try {
        const storedUser = localStorage.getItem('user');
        setUser(storedUser ? JSON.parse(storedUser) : null);
  
        const response = await fetch('http://localhost:3000/team');
        if (!response.ok) {
          throw new Error('Failed to fetch team data');
        }
        const data = await response.json();
        setTeam(data);
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    loadData();
  }, [team.length]);
  

  const toggleLeaderRole = useCallback(async (memberId) => {
    try {
      const confirmRole = window.confirm('Do you want to change the members role?');
      if (!confirmRole) return;

      setIsLoading(true);

      const currentMember = team.find(member => member.id === memberId);
      if (!currentMember) return;

      const newRoleState = !currentMember.isLead;

      const response = await fetch(`http://localhost:3000/team/${memberId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isLead: newRoleState }),
      });

      if (!response.ok) {
        throw new Error('Failed to adjust role');
      }

      setTeam(prevTeam => prevTeam.map(member => 
        member.id === memberId ? { ...member, isLead: newRoleState } : member
      ));
      toast.success('Member role successfully modified ✅');
    } catch (err) {
      console.error('Error updating role:', err);
      setError(err.message);
      toast.error('An error occurred while editing the role ❌');
    } finally {
      setIsLoading(false);
    }
  }, [team]);

  const isAdmin = user?.isAdmin;

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Team Work</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {team.map(member => (
          <motion.div
            key={member.id}
            className="relative cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <TeamMemberCard member={member} />

            {member.isLead && (
              <motion.div 
                className="absolute top-2 left-2 bg-white text-purple-500 px-2 py-1 rounded-full text-sm font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Leader
              </motion.div>
            )}

            {isAdmin && (
              <>
                {/* delete*/}
                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    deleteMember(member.id);
                  }}
                  className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full hover:border-purple-600"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Delete member"
                  type="button"
                >
                  <AiFillDelete className="text-xl text-slate-500 hover:text-slate-600" />
                </motion.button>

                {/* toggleLeaderRole*/}
                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleLeaderRole(member.id);
                  }}
                  className="absolute top-10 right-2 bg-white px-2 py-1 rounded-full hover:border-purple-600"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Toggle leader role"
                  type="button"
                >
                  <MdAdminPanelSettings 
                    className={`text-xl ${member.isLead ? 'text-purple-600' : 'text-slate-500 hover:text-slate-600'}`} 
                  />
                </motion.button>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;
