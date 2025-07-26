import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Bars3Icon,
  BellIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";

const Header = ({ toggleSidebar, toggleMobileMenu }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-10 bg-blue-900 shadow-sm border-b border-blue-800">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-white hover:text-blue-200 hover:bg-blue-800 lg:hidden"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          {/* Desktop sidebar toggle */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:block p-2 rounded-md text-white hover:text-blue-200 hover:bg-blue-800"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        {/* Title Centered */}
        <div className="flex-1 flex">
          <h1 className="text-lg font-semibold text-white text-center uppercase">
            IMUS ADMINISTRATIVE BULLETIN FOR INTEGRATED DOCUMENT EXCHANGE
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 rounded-md text-white hover:text-blue-200 hover:bg-blue-800 relative">
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
          </button>

          {/* User menu */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-white">
                {user?.email || "Admin"}
              </p>
              <p className="text-xs text-blue-100">Administrator</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-1 rounded-full text-white hover:text-blue-200">
                <UserCircleIcon className="h-8 w-8" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 rounded-md text-white hover:text-blue-200 hover:bg-blue-800 transition-colors"
                title="Logout"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  toggleMobileMenu: PropTypes.func.isRequired,
};

export default Header;
