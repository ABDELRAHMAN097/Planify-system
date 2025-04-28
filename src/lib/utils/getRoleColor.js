// utils/getRoleColor.js

const roleColors = {
  "مطورويب": "bg-blue-500",
  "webdeveloper": "bg-blue-500",
  "باكاند": "bg-purple-500",
  "backend": "bg-purple-500",
  "فرونتاند": "bg-green-500",
  "frontend": "bg-green-500",
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

const getRandomColor = () => {
  return randomColors[Math.floor(Math.random() * randomColors.length)];
};

export const getRoleColor = (role) => {
  const normalizedRole = normalizeRole(role);
  return roleColors[normalizedRole] || getRandomColor();
};

