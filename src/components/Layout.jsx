import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    // Main flex row: sidebar and content are siblings
    <div className="flex h-screen bg-gray-50 overflow-x-hidden">
      {/* Sidebar as a flex child, never fixed */}
      <Sidebar
        collapsed={sidebarCollapsed}
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      {/* Main content area fills remaining space */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          toggleSidebar={toggleSidebar}
          toggleMobileMenu={toggleMobileMenu}
          sidebarCollapsed={sidebarCollapsed}
        />
        <main className="flex-1 overflow-auto p-6 min-w-0">
          {/* Search Bar (hidden on /dashboard, /posts, and /posts-viewing) */}
          {location.pathname !== "/dashboard" &&
            location.pathname !== "/posts" &&
            location.pathname !== "/posts-viewing" && (
              <div className="hidden md:flex mb-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="block w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            )}
          {/* End Search Bar */}
          {children}
        </main>
      </div>
      {/* Mobile overlay for sidebar */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
