import { useNavigate } from 'react-router-dom';
import { IoMdLogOut } from "react-icons/io";
import { toast } from 'react-hot-toast'; 

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');

    toast.success('You have successfully logged out ✅');

    setTimeout(() => {
      navigate('/signin');
    }, 1500); 
  };

  return (
    <button
      onClick={handleLogout}
      className='text-white flex justify-center items-center gap-1'
    >
      Logout <IoMdLogOut className='text-lg'/>
    </button>
  );
};

export default LogoutButton;
