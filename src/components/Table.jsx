import { useState, useMemo } from "react";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

const Table = ({
  columns,
  data,
  loading,
  onRowUpdate,
  onRowDelete,
  onRowView,
  pageSizeOptions = [5, 10, 20, 50],
  defaultPageSize = 10,
  fixedHeight = "500px",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [editRowId, setEditRowId] = useState(null);
  const [editRowData, setEditRowData] = useState({});

  // Global search filter
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lower = searchTerm.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        const value =
          typeof col.valueGetter === "function"
            ? col.valueGetter({ value: row[col.field], row })
            : row[col.field];
        return value && value.toString().toLowerCase().includes(lower);
      })
    );
  }, [searchTerm, data, columns]);

  // Pagination
  const totalRows = filteredData.length;
  const totalPages = Math.ceil(totalRows / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  // Inline editing handlers
  const handleEdit = (row) => {
    setEditRowId(row.id);
    setEditRowData(row);
  };
  const handleEditChange = (field, value) => {
    setEditRowData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSave = () => {
    onRowUpdate(editRowData);
    setEditRowId(null);
    setEditRowData({});
  };
  const handleCancel = () => {
    setEditRowId(null);
    setEditRowData({});
  };

  // Pagination controls
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow border border-gray-200 overflow-x-auto">
      {/* Search bar */}
      <div className="p-4 flex flex-col md:flex-row md:items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-80 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Rows per page:</span>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="px-2 py-1 border border-gray-300 rounded-md text-sm"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Table */}
      <div
        className="overflow-x-auto"
        style={{
          maxHeight: fixedHeight,
          minHeight: fixedHeight,
          overflowY: "auto",
        }}
      >
        <table className="w-full min-w-[900px] divide-y divide-gray-200">
          <thead className="bg-blue-600 sticky top-0 z-10">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.field}
                  className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider"
                  style={col.width ? { width: col.width } : {}}
                >
                  {col.headerName}
                </th>
              ))}
              <th className="px-15 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="text-center py-8 text-gray-400"
                >
                  Loading...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="text-center py-8 text-gray-400"
                >
                  No data found.
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td
                      key={col.field}
                      className="px-4 py-3 text-sm text-gray-900 truncate"
                    >
                      {editRowId === row.id && col.editable ? (
                        <input
                          type="text"
                          value={editRowData[col.field] ?? ""}
                          onChange={(e) =>
                            handleEditChange(col.field, e.target.value)
                          }
                          className="w-full px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />
                      ) : typeof col.valueGetter === "function" ? (
                        col.valueGetter({ value: row[col.field], row })
                      ) : (
                        row[col.field]
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {editRowId === row.id ? (
                        <>
                          <button
                            className="text-green-600 hover:text-green-800"
                            title="Save"
                            onClick={handleSave}
                          >
                            <CheckIcon className="h-5 w-5" />
                          </button>
                          <button
                            className="text-gray-400 hover:text-gray-600"
                            title="Cancel"
                            onClick={handleCancel}
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </>
                      ) : (
                        <>
                          {onRowView && (
                            <button
                              className="text-blue-500 hover:text-blue-700"
                              title="View"
                              onClick={() => onRowView(row)}
                            >
                              <EyeIcon className="h-5 w-5" />
                            </button>
                          )}
                          {onRowUpdate && (
                            <button
                              className="text-orange-500 hover:text-orange-700"
                              title="Edit"
                              onClick={() => handleEdit(row)}
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                          )}
                          {onRowDelete && (
                            <button
                              className="text-red-500 hover:text-red-700"
                              title="Delete"
                              onClick={() => onRowDelete(row)}
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white">
        <div className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-medium">
            {(currentPage - 1) * pageSize + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium">
            {Math.min(currentPage * pageSize, totalRows)}
          </span>{" "}
          of <span className="font-medium">{totalRows}</span> results
        </div>
        <div className="flex space-x-1">
          <button
            className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 rounded-md text-sm ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 text-gray-500 hover:bg-gray-50"
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50"
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      valueGetter: PropTypes.func,
      editable: PropTypes.bool,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
  onRowUpdate: PropTypes.func,
  onRowDelete: PropTypes.func,
  onRowView: PropTypes.func,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  defaultPageSize: PropTypes.number,
  fixedHeight: PropTypes.string,
};

export default Table;
