import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import Table from "../components/Table";

const UsersManagement = () => {
  const [selectedRole, setSelectedRole] = useState("all");
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      role: "Administrator",
      status: "Active",
      lastLogin: "2024-01-15 10:30 AM",
      documents: 142,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@company.com",
      role: "Editor",
      status: "Active",
      lastLogin: "2024-01-15 09:15 AM",
      documents: 89,
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@company.com",
      role: "Viewer",
      status: "Inactive",
      lastLogin: "2024-01-12 03:45 PM",
      documents: 23,
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice.brown@company.com",
      role: "Editor",
      status: "Active",
      lastLogin: "2024-01-15 11:20 AM",
      documents: 156,
    },
  ]);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: "18%",
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: "22%",
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: "15%",
      editable: true,
      valueGetter: ({ value }) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            value === "Administrator"
              ? "bg-red-100 text-red-800"
              : value === "Editor"
              ? "bg-blue-100 text-blue-800"
              : value === "Viewer"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: "12%",
      editable: true,
      valueGetter: ({ value }) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            value === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      field: "lastLogin",
      headerName: "Last Login",
      width: "18%",
      editable: false,
    },
    {
      field: "documents",
      headerName: "Documents",
      width: "10%",
      editable: false,
    },
  ];

  const filteredUsers = users.filter(
    (user) => selectedRole === "all" || user.role === selectedRole
  );

  const handleRowUpdate = (updatedRow) => {
    setUsers((prev) =>
      prev.map((row) =>
        row.id === updatedRow.id ? { ...row, ...updatedRow } : row
      )
    );
  };
  const handleRowDelete = (row) => {
    setUsers((prev) => prev.filter((u) => u.id !== row.id));
  };
  const handleRowView = (row) => {
    alert(`Viewing user: ${row.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="mt-2 text-gray-600">
            Manage user accounts, roles, and permissions.
          </p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
          <PlusIcon className="h-5 w-5" />
          <span>Add User</span>
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
        <div className="flex-1" />
        <div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Roles</option>
            <option value="Administrator">Administrator</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>
      </div>
      <Table
        columns={columns}
        data={filteredUsers}
        loading={false}
        onRowUpdate={handleRowUpdate}
        onRowDelete={handleRowDelete}
        onRowView={handleRowView}
        defaultPageSize={10}
        fixedHeight="500px"
      />
    </div>
  );
};

export default UsersManagement;
