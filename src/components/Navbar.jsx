import { useState } from "react";
import { FaHome, FaTrello } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      <nav className="bg-white shadow-sm">
        <div className="mx-14">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <FaTrello className="text-purple-600 h-8 w-8" />
              <span className="ml-2 text-xl font-bold">Planify</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/dashboard" className="text-gray-700 hover:text-purple-600">
                Dashboard  
              </Link>
              <Link to="/TeamList" className="text-gray-700 hover:text-purple-600">
                Team
              </Link>
              <Link to="/" className="text-gray-700 hover:text-purple-600">
              <FaHome className="text-xl"/>
              </Link>
              <Link to="Signup">
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                بدء الاستخدام
              </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-gray-700">
                المميزات
              </a>
              <a href="#" className="block px-3 py-2 text-gray-700">
                المقارنة
              </a>
              <a href="#" className="block px-3 py-2 text-gray-700">
                التسعير
              </a>
              <button className="w-full bg-purple-600 text-white px-6 py-2 rounded-lg">
                بدء الاستخدام
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
