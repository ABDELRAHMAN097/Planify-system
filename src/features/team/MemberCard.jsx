import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

const MemberCard = ({ member }) => {

  const roleColor = useMemo(() => {
    const roleColors = {
      "مطورويب": "bg-blue-500",
      "webdeveloper": "bg-blue-500",
      "باك اند": "bg-purple-500",
      "backend": "bg-purple-500",
      "back-end": "bg-purple-500",
      "Back-End": "bg-purple-500",
      "فرونت اند": "bg-green-500",
      "frontend": "bg-green-500",
      "frontendend": "bg-green-500",
      "uiux": "bg-pink-500",
      "مصممuiux": "bg-pink-500",
    };

    const randomColors = [
      "bg-red-400",
      "bg-yellow-400",
      "bg-green-400",
      "bg-blue-400",
      "bg-purple-400",
      "bg-pink-400",
      "bg-indigo-400",
      "bg-teal-400",
      "bg-orange-400",
    ];

    const normalizeRole = (role) => {
      if (!role) return '';
      return role
        .toLowerCase()
        .replace(/\s+/g, '')  
        .replace(/[^a-z0-9أ-ي]/g, '');
    };

    const normalizedRole = normalizeRole(member?.role);
    return roleColors[normalizedRole] || 
           randomColors[(member?.id?.toString()?.charCodeAt(0) || 0) % randomColors.length];
  }, [member?.role, member?.id]);

  const safeMember = {
    id: member?.id || 0,
    name: member?.name || 'عضو غير معروف',
    role: member?.role || 'دور غير محدد',
    email: member?.email || 'لا يوجد بريد'
  };

  return (
    <div className="relative w-64 h-auto py-5 mx-auto rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl shine-effect">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-800 opacity-80"></div>

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-xl">
        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-4xl">
          {safeMember.name.charAt(0)}
        </div>
      </div>

      <div className="relative pt-32 h-full flex flex-col items-center text-white">
        <div className={`${roleColor} w-full py-2 text-center font-bold`}>
          {safeMember.role}
        </div>

        <h3 className="mt-4 text-2xl font-bold text-center px-2">{safeMember.name}</h3>
        <p className="mt-2 text-sm opacity-80">{safeMember.email}</p>

        <div className="mt-4 flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={`star-${i}-${safeMember.id}`}
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        <Link
          to={`/team/${safeMember.id}`}
          className="mt-6 px-6 py-2 bg-white text-indigo-800 rounded-full font-bold hover:bg-indigo-100 transition-all"
          aria-label={`عرض ملف ${safeMember.name} الشخصي`}
        >
          Profile
        </Link>
      </div>
    </div>
  );
};

MemberCard.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    role: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default MemberCard;