import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  DocumentTextIcon,
  CogIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ShieldCheckIcon,
  KeyIcon,
  UserCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import depedLogo from "../assets/deped_logo.png";
import PropTypes from "prop-types";

const Sidebar = ({ collapsed, toggleMobileMenu }) => {
  const location = useLocation();
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "Posts Monitoring", href: "/posts", icon: DocumentTextIcon },
    { name: "Posts Viewing", href: "/posts-viewing", icon: DocumentTextIcon },
    { name: "Users Management", href: "/users", icon: UsersIcon },
    { name: "Document Management", href: "/documents", icon: DocumentTextIcon },
  ];

  const settingsNavigation = [
    {
      name: "Security Settings",
      href: "/settings/security",
      icon: ShieldCheckIcon,
    },
    { name: "Change Password", href: "/settings/password", icon: KeyIcon },
    { name: "Update Profile", href: "/settings/profile", icon: UserCircleIcon },
    {
      name: "Updates Checking",
      href: "/settings/updates",
      icon: ArrowPathIcon,
    },
  ];

  const isActive = (href) => location.pathname === href;
  const isSettingsActive = () => location.pathname.startsWith("/settings");

  return (
    // Sidebar as a flex child, never fixed
    <div
      className={`
        bg-blue-900 shadow-lg
        ${collapsed ? "w-16" : "w-64"}
        overflow-hidden transition-all duration-300 h-full flex flex-col
      `}
    >
      {/* Logo */}
      <div
        className={`flex items-center h-16 ${
          collapsed ? "px-4" : "px-4"
        } bg-blue-900 text-white`}
      >
        <div className="flex items-center">
          <img
            src={depedLogo}
            alt="DepEd Logo"
            className="h-8 w-8 object-contain"
          />
          {!collapsed && (
            <span className="ml-2 text-lg font-semibold">IABIDE</span>
          )}
        </div>
      </div>
      {/* Navigation */}
      <nav
        className={`flex-1 ${
          collapsed ? "px-2" : "px-2"
        } py-4 space-y-2 overflow-y-auto`}
      >
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            onClick={() => toggleMobileMenu && toggleMobileMenu()}
            className={`
              group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200
              ${
                isActive(item.href)
                  ? "bg-blue-700 text-white"
                  : "text-blue-100 hover:bg-blue-800 hover:text-white"
              }
            `}
          >
            {collapsed ? (
              <span className="flex items-center justify-center w-8">
                <item.icon className="h-5 w-5 flex-shrink-0 text-white" />
              </span>
            ) : (
              <>
                <item.icon className="h-5 w-5 flex-shrink-0 mr-3 text-white" />
                {item.name}
              </>
            )}
          </Link>
        ))}
        {/* Settings with submenu */}
        <div>
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className={`
              group flex items-center w-full ${
                collapsed ? "px-2" : "px-2"
              } py-2 text-sm font-medium rounded-md transition-colors duration-200
              ${
                isSettingsActive()
                  ? "bg-blue-700 text-white"
                  : "text-blue-100 hover:bg-blue-800 hover:text-white"
              }
            `}
          >
            {collapsed ? (
              <span className="flex items-center justify-center w-8">
                <CogIcon className="h-5 w-5 flex-shrink-0 text-white" />
              </span>
            ) : (
              <>
                <CogIcon className="h-5 w-5 flex-shrink-0 mr-3 text-white" />
                <span className="flex-1 text-left">Site Settings</span>
                {settingsOpen ? (
                  <ChevronDownIcon className="h-4 w-4 text-white" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4 text-white" />
                )}
              </>
            )}
          </button>
          {settingsOpen && !collapsed && (
            <div className="ml-6 mt-1 space-y-1">
              {settingsNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => toggleMobileMenu && toggleMobileMenu()}
                  className={`
                    group flex items-center px-2 py-2 text-sm rounded-md transition-colors duration-200
                    ${
                      isActive(item.href)
                        ? "bg-primary-100 text-primary-700"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    }
                  `}
                >
                  <span
                    className={`flex items-center justify-center${
                      collapsed ? " w-8" : " mr-1"
                    }`}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0 mr-1 text-white" />
                  </span>
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

Sidebar.propTypes = {
  collapsed: PropTypes.bool,
  toggleMobileMenu: PropTypes.func,
};

export default Sidebar;
