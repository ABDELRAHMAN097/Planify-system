import { useState, useEffect } from "react";
import { FaHome, FaTrello } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // استخدام useEffect لمراقبة حالة المستخدم
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // إذا كان هناك مستخدم في localStorage، قم بتعيينه
    }
  }, []);

  // عند تنفيذ Logout، نقوم بتحديث localStorage وحالة المستخدم
  const handleLogout = () => {
    localStorage.removeItem("user"); // إزالة المستخدم من localStorage
    setUser(null); // تحديث حالة المستخدم لتكون null بعد الخروج
  };

  const isAdmin = user?.isAdmin === true; // تحقق من أن المستخدم هو أدمن

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState); // التبديل بين القائمة المفتوحة والمغلقة
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

            {/* قائمة الديسكتوب */}
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/" className="text-gray-700 hover:text-purple-600">
                <FaHome className="text-xl" />
              </Link>
              <Link to="/TeamList" className="text-gray-700 hover:text-purple-600">
                Team
              </Link>

              {/* إظهار الداشبورد فقط إذا كان المستخدم أدمن */}
              {isAdmin && (
                <Link to="/dashboard" className="text-gray-700 hover:text-purple-600">
                  Dashboard
                </Link>
              )}

              {/* التبديل بين زر Logout و Getting Started */}
              {user ? (
                <button
                  className="w-full bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                  onClick={handleLogout} // إضافة وظيفة الخروج هنا
                >
                  <LogoutButton />
                </button>
              ) : (
                <Link to="/signup">
                  <button className="w-full bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                    Getting started
                  </button>
                </Link>
              )}
            </div>

            {/* زر القائمة للموبايل */}
            <button className="md:hidden p-2" onClick={handleMenuToggle}>
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* القائمة الخاصة بالموبايل */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-gray-700">
                Features
              </Link>
              <Link to="/TeamList" className="block px-3 py-2 text-gray-700">
                Team
              </Link>

              {/* إظهار الداشبورد فقط إذا كان المستخدم أدمن */}
              {isAdmin && (
                <Link to="/dashboard" className="block px-3 py-2 text-gray-700">
                  Dashboard
                </Link>
              )}

              {/* التبديل بين زر Logout و Getting Started */}
              {user ? (
                <button
                  className="w-full bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                  onClick={handleLogout} // إضافة وظيفة الخروج هنا
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
