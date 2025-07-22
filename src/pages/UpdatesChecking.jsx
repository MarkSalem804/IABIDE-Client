import React, { useState } from 'react';
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  CogIcon,
} from '@heroicons/react/24/outline';

const UpdatesChecking = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleCheckUpdates = () => {
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
    }, 3000);
  };

  const updates = [
    {
      id: 1,
      name: 'Document System Core',
      currentVersion: 'v2.1.4',
      latestVersion: 'v2.1.5',
      status: 'available',
      description: 'Security improvements and bug fixes',
      size: '12.3 MB',
      releaseDate: '2024-01-20',
      critical: false,
    },
    {
      id: 2,
      name: 'User Management Module',
      currentVersion: 'v1.8.2',
      latestVersion: 'v1.8.2',
      status: 'current',
      description: 'Latest version installed',
      size: '5.7 MB',
      releaseDate: '2024-01-10',
      critical: false,
    },
    {
      id: 3,
      name: 'Security Patches',
      currentVersion: 'v3.2.1',
      latestVersion: 'v3.2.3',
      status: 'critical',
      description: 'Critical security vulnerability fixes',
      size: '2.1 MB',
      releaseDate: '2024-01-22',
      critical: true,
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'current':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'critical':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available':
        return 'Update Available';
      case 'current':
        return 'Up to Date';
      case 'critical':
        return 'Critical Update';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-yellow-100 text-yellow-800';
      case 'current':
        return 'bg-green-100 text-green-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Updates Checking</h1>
        <p className="mt-2 text-gray-600">Monitor and manage system updates and patches.</p>
      </div>

      {/* Update Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">System Updates</h3>
            <p className="text-sm text-gray-600">Last checked: 2 hours ago</p>
          </div>
          <button
            onClick={handleCheckUpdates}
            disabled={isChecking}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            <ArrowPathIcon className={`h-5 w-5 ${isChecking ? 'animate-spin' : ''}`} />
            <span>{isChecking ? 'Checking...' : 'Check for Updates'}</span>
          </button>
        </div>

        {/* Settings */}
        <div className="space-y-4 border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Automatic Updates</p>
              <p className="text-sm text-gray-500">Automatically download and install updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={autoUpdate}
                onChange={(e) => setAutoUpdate(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Maintenance Mode</p>
              <p className="text-sm text-gray-500">Enable maintenance mode during updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Available Updates */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Available Updates</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {updates.map((update) => (
            <div key={update.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(update.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-lg font-medium text-gray-900">{update.name}</h4>
                      {update.critical && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          Critical
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{update.description}</p>
                    
                    <div className="flex items-center space-x-6 mt-3 text-sm text-gray-500">
                      <span>Current: {update.currentVersion}</span>
                      {update.status !== 'current' && (
                        <span>Latest: {update.latestVersion}</span>
                      )}
                      <span>Size: {update.size}</span>
                      <span>Released: {update.releaseDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(update.status)}`}>
                    {getStatusText(update.status)}
                  </span>
                  
                  {update.status === 'available' || update.status === 'critical' ? (
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm">
                      Install Update
                    </button>
                  ) : (
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      View Details
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Update History */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Update History</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {[
            {
              name: 'Database Optimization Update',
              version: 'v2.1.4',
              date: '2024-01-15',
              status: 'Success',
              time: '10:30 AM',
            },
            {
              name: 'UI Framework Update',
              version: 'v1.9.1',
              date: '2024-01-10',
              status: 'Success',
              time: '02:15 PM',
            },
            {
              name: 'Security Patch',
              version: 'v3.2.1',
              date: '2024-01-05',
              status: 'Success',
              time: '11:45 AM',
            },
          ].map((history, index) => (
            <div key={index} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{history.name}</p>
                    <p className="text-sm text-gray-500">{history.version} • {history.date} at {history.time}</p>
                  </div>
                </div>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  {history.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled Maintenance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <CogIcon className="h-6 w-6 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Scheduled Maintenance</h3>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <ClockIcon className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Next Maintenance Window</p>
              <p className="text-sm text-blue-700 mt-1">
                Scheduled for Sunday, January 28, 2024 at 2:00 AM EST
              </p>
              <p className="text-sm text-blue-600 mt-1">
                Expected duration: 2-3 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatesChecking;