import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'; 

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user')); 
        
        if (userData) {
          if (userData.isAdmin === true) {
            setIsAdmin(true);
            setIsAuthenticated(true);
          } else {
            setIsAdmin(false);
            setIsAuthenticated(true);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking user data", error);
        setIsAuthenticated(false);
      }

      setLoading(false);
    };

    checkUser();
  }, []);
  if (loading) {
    return <p>Loading...</p>; 
  }
  if (!isAuthenticated) {
    return <Navigate to="/Signin" />; 
  }
  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  return children; 
};

export default ProtectedRoute;
