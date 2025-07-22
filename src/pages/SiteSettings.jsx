import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheckIcon,
  KeyIcon,
  UserCircleIcon,
  ArrowPathIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

const SiteSettings = () => {
  const settingsCategories = [
    {
      name: 'Security Settings',
      description: 'Manage two-factor authentication and security preferences',
      href: '/settings/security',
      icon: ShieldCheckIcon,
      color: 'text-red-600 bg-red-100',
    },
    {
      name: 'Change Password',
      description: 'Update your account password and security credentials',
      href: '/settings/password',
      icon: KeyIcon,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      name: 'Update Profile',
      description: 'Modify your personal information and account details',
      href: '/settings/profile',
      icon: UserCircleIcon,
      color: 'text-green-600 bg-green-100',
    },
    {
      name: 'Updates Checking',
      description: 'System updates and version management',
      href: '/settings/updates',
      icon: ArrowPathIcon,
      color: 'text-purple-600 bg-purple-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
        <p className="mt-2 text-gray-600">Manage your system preferences and account settings.</p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsCategories.map((category) => (
          <Link
            key={category.name}
            to={category.href}
            className="block bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${category.color}`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{category.description}</p>
                </div>
              </div>
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
            </div>
          </Link>
        ))}
      </div>

      {/* System Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Application Version</h4>
            <p className="text-sm text-gray-900">v2.1.4</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Last Updated</h4>
            <p className="text-sm text-gray-900">January 15, 2024</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Database Version</h4>
            <p className="text-sm text-gray-900">PostgreSQL 14.2</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Server Status</h4>
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              Online
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">Backup System Data</span>
              <span className="text-sm text-gray-500">Export all data</span>
            </div>
          </button>
          <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">Clear Cache</span>
              <span className="text-sm text-gray-500">Improve performance</span>
            </div>
          </button>
          <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">System Maintenance</span>
              <span className="text-sm text-gray-500">Schedule maintenance</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SiteSettings;