import { useState, useEffect } from "react";
import { FaHome, FaTrello } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // دالة لتحميل حالة المستخدم
  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  useEffect(() => {
    // تحميل المستخدم عند التحميل الأولي
    loadUser();

    // إضافة مستمع لتغيرات localStorage
    window.addEventListener('storage', loadUser);

    return () => {
      window.removeEventListener('storage', loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload(); // إعادة تحميل الصفحة فورًا
  };

  const isAdmin = user?.isAdmin === true;

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div>
      <nav className="bg-white shadow-sm">
        <div className="mx-14">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <FaTrello className="text-purple-600 h-8 w-8" />
              <span className="ml-2 text-xl font-bold">Planify</span>
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <Link to="/" className="text-gray-700 hover:text-purple-600">
                <FaHome className="text-xl" />
              </Link>
              <Link to="/TeamList" className="text-gray-700 hover:text-purple-600">
                Team
              </Link>

              {isAdmin && (
                <Link to="/dashboard" className="text-gray-700 hover:text-purple-600">
                  Dashboard
                </Link>
              )}

              {user ? (
                <button
                  className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600"
                  onClick={handleLogout}
                >
                  <LogoutButton />
                </button>
              ) : (
                <Link to="/signup">
                  <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                    Getting started
                  </button>
                </Link>
              )}
            </div>

            <button className="md:hidden p-2" onClick={handleMenuToggle}>
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-gray-700">
                Features
              </Link>
              <Link to="/TeamList" className="block px-3 py-2 text-gray-700">
                Team
              </Link>

              {isAdmin && (
                <Link to="/dashboard" className="block px-3 py-2 text-gray-700">
                  Dashboard
                </Link>
              )}

              {user ? (
                <button
                  className="w-full bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600"
                  onClick={handleLogout}
                >
                  <LogoutButton />
                </button>
              ) : (
                <Link to="/Signup">
                  <button className="w-full bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                    Getting started
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;