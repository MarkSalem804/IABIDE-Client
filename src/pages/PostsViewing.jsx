import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "../components/modals/CreatePostModal";
import Table from "../components/Table";
import PropTypes from "prop-types";

const mockRecipients = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Carol Davis" },
];

const initialPosts = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Active Post ${i + 1}`,
  deadline: `2024-12-${String(i + 10).padStart(2, "0")}`,
  recipients: [1, 2],
  type: i % 3 === 0 ? "softcopy" : i % 3 === 1 ? "hardcopy" : "link",
  link: i % 3 === 2 ? `https://forms.gle/active${i + 1}` : "",
  description: `This is the description for active post ${i + 1}.`,
}));

const PostsViewing = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [posts, setPosts] = useState(initialPosts);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    title: "",
    deadline: "",
    recipients: [""],
    type: "softcopy",
    reference: "",
    description: "",
    availability_start_date: "",
    availability_end_date: "",
    status: true,
  });

  const filterPosts = (postsArr) =>
    postsArr.filter((post) => {
      const matchesType = selectedType === "all" || post.type === selectedType;
      return matchesType;
    });

  const filteredPosts = filterPosts(posts);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleRecipientChange = (idx, value) => {
    setForm((f) => {
      const newRecipients = [...f.recipients];
      newRecipients[idx] = value;
      return { ...f, recipients: newRecipients };
    });
  };
  const addRecipientRow = () => {
    setForm((f) => ({ ...f, recipients: [...f.recipients, ""] }));
  };
  const removeRecipientRow = (idx) => {
    setForm((f) => {
      const newRecipients = f.recipients.filter((_, i) => i !== idx);
      return { ...f, recipients: newRecipients };
    });
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    setPosts([
      {
        ...form,
        id: posts.length + 1,
      },
      ...posts,
    ]);
    setShowCreate(false);
    setForm({
      title: "",
      deadline: "",
      recipients: [""],
      type: "softcopy",
      reference: "",
      description: "",
      availability_start_date: "",
      availability_end_date: "",
      status: true,
    });
  };

  // --- Type Filter Dropdown for Table ---
  const typeFilterDropdown = (
    <select
      value={selectedType}
      onChange={(e) => setSelectedType(e.target.value)}
      className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 min-w-[140px]"
    >
      <option value="all">All Types</option>
      <option value="softcopy">Softcopy</option>
      <option value="hardcopy">Hardcopy</option>
      <option value="link">Link</option>
    </select>
  );

  // --- Status Toggle Cell Renderer ---
  const StatusToggle = ({ value, row, onRowUpdate }) => (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onRowUpdate({ ...row, status: !row.status })}
        className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none border ${
          value ? "bg-green-400 border-green-500" : "bg-red-400 border-red-500"
        }`}
        title={value ? "Open" : "Closed"}
        type="button"
      >
        <span
          className={`absolute left-0 top-[-1px] w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ${
            value ? "translate-x-6" : "translate-x-0"
          }`}
        ></span>
      </button>
      <span
        className={`text-xs font-bold ${
          value ? "text-green-700" : "text-red-700"
        }`}
      >
        {value ? "Open" : "Closed"}
      </span>
    </div>
  );
  StatusToggle.propTypes = {
    value: PropTypes.bool.isRequired,
    row: PropTypes.object.isRequired,
    onRowUpdate: PropTypes.func.isRequired,
  };

  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: "15%",
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: "15%",
      editable: false,
      renderCell: StatusToggle,
    },
    {
      field: "deadline",
      headerName: "Deadline",
      width: "15%",
      editable: true,
    },
    {
      field: "type",
      headerName: "Type",
      width: "10%",
      editable: true,
      valueGetter: ({ value }) =>
        value.charAt(0).toUpperCase() + value.slice(1),
    },
    {
      field: "recipients",
      headerName: "Recipients",
      width: "20%",
      editable: false,
      valueGetter: ({ value }) =>
        value
          .map((id) => {
            const r = mockRecipients.find((r) => r.id === Number(id));
            return r ? r.name : "";
          })
          .join(", "),
    },
    {
      field: "description",
      headerName: "Description",
      width: "25%",
      editable: true,
    },
  ];

  const handleRowUpdate = (updatedRow) => {
    setPosts((prev) =>
      prev.map((row) =>
        row.id === updatedRow.id ? { ...row, ...updatedRow } : row
      )
    );
  };
  const handleRowDelete = (row) => {
    setPosts((prev) => prev.filter((p) => p.id !== row.id));
  };
  const handleRowView = (row) => {
    alert(`Viewing post: ${row.title}`);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        {/* <h1 className="text-lg font-semibold text-gray-800">Post Management</h1> */}
        <div className="mt-2">
          <h2 className="text-2xl font-bold text-gray-900">Posts Viewing</h2>
          <p className="mt-1 text-gray-500 text-base">
            Browse and view all active posts.
          </p>
        </div>
      </div>

      {/* Create Post Button */}
      <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          onClick={() => setShowCreate(true)}
        >
          <PencilSquareIcon className="h-5 w-5" />
          <span>Create Post</span>
        </button>
        <div className="flex-1" />
        {/* Removed filter dropdown from here */}
      </div>

      {/* Posts Table (replaced with reusable Table component) */}
      <Table
        columns={columns}
        data={filteredPosts}
        loading={false}
        onRowUpdate={handleRowUpdate}
        onRowDelete={handleRowDelete}
        onRowView={handleRowView}
        defaultPageSize={10}
        fixedHeight="530px"
        filterComponent={typeFilterDropdown}
      />

      {/* Pagination (static for now) removed, handled by Table */}

      <Modal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        padding={false}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b sticky top-0 bg-blue-600 z-10">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <PencilSquareIcon className="h-6 w-6" />
              Create Post
            </h2>
          </div>
          <div className="p-4 flex-1 overflow-y-auto">
            <form
              onSubmit={handleCreatePost}
              className="space-y-4 flex flex-col h-full text-sm"
            >
              {/* Title */}
              <div className="flex flex-col gap-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-md px-3 py-1.5 w-full transition"
                  placeholder="Enter post title"
                  required
                />
              </div>

              {/* Deadline & Availability */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="block text-sm font-semibold text-gray-700">
                    Deadline
                  </label>
                  <input
                    type="datetime-local"
                    name="deadline"
                    value={form.deadline}
                    onChange={handleFormChange}
                    className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-md px-3 py-1.5 w-full transition"
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label className="block text-sm font-semibold text-gray-700">
                    Availability
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="datetime-local"
                      name="availability_start_date"
                      value={form.availability_start_date}
                      onChange={handleFormChange}
                      className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-md px-3 py-1.5 w-full transition"
                    />
                    <span className="text-sm">to</span>
                    <input
                      type="datetime-local"
                      name="availability_end_date"
                      value={form.availability_end_date}
                      onChange={handleFormChange}
                      className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-md px-3 py-1.5 w-full transition"
                    />
                  </div>
                </div>
              </div>

              {/* Document Type & Status */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="block text-sm font-semibold text-gray-700">
                    Document Type
                  </label>
                  <div className="flex gap-2 mt-1">
                    <label className="flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded-md cursor-pointer hover:bg-blue-50 transition">
                      <input
                        type="radio"
                        name="type"
                        value="softcopy"
                        checked={form.type === "softcopy"}
                        onChange={handleFormChange}
                        className="accent-blue-600 h-3 w-3"
                      />
                      Softcopy
                    </label>
                    <label className="flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded-md cursor-pointer hover:bg-blue-50 transition">
                      <input
                        type="radio"
                        name="type"
                        value="hardcopy"
                        checked={form.type === "hardcopy"}
                        onChange={handleFormChange}
                        className="accent-blue-600 h-3 w-3"
                      />
                      Hardcopy
                    </label>
                    <label className="flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded-md cursor-pointer hover:bg-blue-50 transition">
                      <input
                        type="radio"
                        name="type"
                        value="link"
                        checked={form.type === "link"}
                        onChange={handleFormChange}
                        className="accent-blue-600 h-3 w-3"
                      />
                      Provided Link
                    </label>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label className="block text-sm font-semibold text-gray-700">
                    Status
                  </label>
                  <div className="flex items-center mt-1">
                    <label className="flex items-center cursor-pointer select-none">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={form.status}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, status: e.target.checked }))
                          }
                          className="sr-only peer"
                        />
                        <div
                          className={`w-9 h-4 rounded-full shadow-inner border transition-colors ${
                            form.status
                              ? "bg-green-400 border-green-500"
                              : "bg-red-400 border-red-500"
                          }`}
                        ></div>
                        <div
                          className={`absolute left-0 top-0 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                            form.status ? "translate-x-5" : "translate-x-0"
                          }`}
                        ></div>
                      </div>
                      <span
                        className={`ml-2 text-sm font-medium ${
                          form.status ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        {form.status ? "Open" : "Closed"}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Recipients */}
              <div className="flex-1 flex flex-col justify-end">
                <div className="flex flex-col gap-1 mt-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Recipients
                  </label>
                  <div className="space-y-2 h-48 overflow-y-auto pr-1 bg-gray-50 rounded-md p-2 border border-gray-200">
                    {form.recipients.map((recipient, idx) => {
                      const availableOptions = mockRecipients.filter(
                        (r) =>
                          !form.recipients.includes(r.id.toString()) ||
                          r.id.toString() === recipient
                      );
                      return (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">
                            Recipient {idx + 1}
                          </span>
                          <select
                            className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-md px-2 py-1 transition w-48 text-sm"
                            value={recipient}
                            onChange={(e) =>
                              handleRecipientChange(idx, e.target.value)
                            }
                            required
                          >
                            <option value="" disabled>
                              Select recipient
                            </option>
                            {availableOptions.map((r) => (
                              <option key={r.id} value={r.id}>
                                {r.name}
                              </option>
                            ))}
                          </select>
                          {form.recipients.length > 1 && (
                            <button
                              type="button"
                              className="text-red-500 hover:text-red-700 text-base px-1.5"
                              onClick={() => removeRecipientRow(idx)}
                              title="Remove recipient"
                            >
                              &times;
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    className="mt-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-md font-semibold hover:bg-blue-200 transition text-sm"
                    onClick={addRecipientRow}
                  >
                    + Add Recipient
                  </button>
                </div>
              </div>

              {/* Reference */}
              <div className="flex flex-col gap-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Reference
                </label>
                <input
                  type="text"
                  name="reference"
                  value={form.reference}
                  onChange={handleFormChange}
                  className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-md px-3 py-1.5 w-full transition"
                  placeholder="Add a reference link or code"
                />
              </div>

              {/* Instructions */}
              <div className="flex flex-col gap-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Instructions
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-md px-3 py-1.5 w-full transition"
                  rows={6}
                  placeholder="Add instructions (optional)"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="px-3 py-1.5 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-md font-semibold shadow hover:bg-blue-700 transition text-sm"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PostsViewing;
