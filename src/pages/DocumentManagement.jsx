import { useState } from "react";
import {
  CloudArrowUpIcon,
  DocumentTextIcon,
  CalendarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Table from "../components/Table";

const DocumentManagement = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Q1_Financial_Report.pdf",
      type: "PDF",
      size: "2.4 MB",
      status: "Processed",
      uploadedBy: "John Doe",
      uploadDate: "2024-01-15",
      lastModified: "2024-01-15 10:30 AM",
    },
    {
      id: 2,
      name: "Project_Proposal.docx",
      type: "Word",
      size: "1.8 MB",
      status: "Processing",
      uploadedBy: "Jane Smith",
      uploadDate: "2024-01-15",
      lastModified: "2024-01-15 09:45 AM",
    },
    {
      id: 3,
      name: "Budget_Analysis.xlsx",
      type: "Excel",
      size: "3.2 MB",
      status: "Failed",
      uploadedBy: "Bob Johnson",
      uploadDate: "2024-01-14",
      lastModified: "2024-01-14 04:20 PM",
    },
    {
      id: 4,
      name: "Company_Logo.png",
      type: "Image",
      size: "512 KB",
      status: "Processed",
      uploadedBy: "Alice Brown",
      uploadDate: "2024-01-14",
      lastModified: "2024-01-14 02:15 PM",
    },
  ]);

  const columns = [
    {
      field: "name",
      headerName: "Document",
      width: "22%",
      editable: true,
      valueGetter: ({ row }) => (
        <div className="flex items-center">
          <DocumentTextIcon className="h-8 w-8 text-gray-400 mr-3" />
          <div>
            <div className="text-sm font-medium text-gray-900">{row.name}</div>
            <div className="text-sm text-gray-500">
              Modified: {row.lastModified}
            </div>
          </div>
        </div>
      ),
    },
    {
      field: "type",
      headerName: "Type",
      width: "10%",
      editable: true,
    },
    {
      field: "size",
      headerName: "Size",
      width: "10%",
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      width: "13%",
      editable: true,
      valueGetter: ({ value }) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            value === "Processed"
              ? "bg-green-100 text-green-800"
              : value === "Processing"
              ? "bg-yellow-100 text-yellow-800"
              : value === "Failed"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      field: "uploadedBy",
      headerName: "Uploaded By",
      width: "15%",
      editable: false,
      valueGetter: ({ value }) => (
        <div className="flex items-center">
          <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-900">{value}</span>
        </div>
      ),
    },
    {
      field: "uploadDate",
      headerName: "Date",
      width: "13%",
      editable: false,
      valueGetter: ({ value }) => (
        <div className="flex items-center">
          <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-900">{value}</span>
        </div>
      ),
    },
  ];

  const filteredDocuments = documents.filter((doc) => {
    const matchesStatus =
      selectedStatus === "all" || doc.status === selectedStatus;
    const matchesType = selectedType === "all" || doc.type === selectedType;
    return matchesStatus && matchesType;
  });

  const handleRowUpdate = (updatedRow) => {
    setDocuments((prev) =>
      prev.map((row) =>
        row.id === updatedRow.id ? { ...row, ...updatedRow } : row
      )
    );
  };
  const handleRowDelete = (row) => {
    setDocuments((prev) => prev.filter((d) => d.id !== row.id));
  };
  const handleRowView = (row) => {
    alert(`Viewing document: ${row.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Document Management
          </h1>
          <p className="mt-2 text-gray-600">
            Track and manage all document uploads and processing.
          </p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
          <CloudArrowUpIcon className="h-5 w-5" />
          <span>Upload Document</span>
        </button>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Documents
              </p>
              <p className="text-2xl font-bold text-gray-900">18,329</p>
            </div>
            <DocumentTextIcon className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Processing</p>
              <p className="text-2xl font-bold text-yellow-600">142</p>
            </div>
            <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <div className="h-4 w-4 bg-yellow-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Processed Today
              </p>
              <p className="text-2xl font-bold text-green-600">89</p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="h-4 w-4 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-red-600">12</p>
            </div>
            <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
              <div className="h-4 w-4 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 items-center mb-6">
        <div className="flex-1" />
        <div className="flex gap-4">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="block px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Status</option>
            <option value="Processed">Processed</option>
            <option value="Processing">Processing</option>
            <option value="Failed">Failed</option>
          </select>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="block px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Types</option>
            <option value="PDF">PDF</option>
            <option value="Word">Word</option>
            <option value="Excel">Excel</option>
            <option value="Image">Image</option>
          </select>
        </div>
      </div>
      <Table
        columns={columns}
        data={filteredDocuments}
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

export default DocumentManagement;
