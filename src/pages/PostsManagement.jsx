import { useState } from "react";
import Modal from "../components/modals/CreatePostModal";
import {
  DocumentTextIcon,
  ClockIcon,
  ArchiveBoxIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

const mockRecipients = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Carol Davis" },
];

const mockActivePosts = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Active Post ${i + 1}`,
  deadline: `2024-12-${String(i + 10).padStart(2, "0")}`,
  recipients: [1, 2],
  type: i % 3 === 0 ? "softcopy" : i % 3 === 1 ? "hardcopy" : "link",
  link: i % 3 === 2 ? `https://forms.gle/active${i + 1}` : "",
  description: `This is the description for active post ${i + 1}.`,
}));

const mockMostRecentPosts = Array.from({ length: 10 }, (_, i) => ({
  id: i + 101,
  title: `Most Recent Post ${i + 1}`,
  deadline: `2024-11-${String(i + 10).padStart(2, "0")}`,
  recipients: [2, 3],
  type: i % 3 === 0 ? "softcopy" : i % 3 === 1 ? "hardcopy" : "link",
  link: i % 3 === 2 ? `https://forms.gle/recent${i + 1}` : "",
  description: `This is the description for most recent post ${i + 1}.`,
}));

const mockPassedPosts = Array.from({ length: 10 }, (_, i) => ({
  id: i + 201,
  title: `Passed Post ${i + 1}`,
  deadline: `2024-10-${String(i + 10).padStart(2, "0")}`,
  recipients: [1, 3],
  type: i % 3 === 0 ? "softcopy" : i % 3 === 1 ? "hardcopy" : "link",
  link: i % 3 === 2 ? `https://forms.gle/passed${i + 1}` : "",
  description: `This is the description for passed/closed post ${i + 1}.`,
}));

const mockSubmissionsLogs = Array.from({ length: 10 }, (_, i) => ({
  id: i + 301,
  title: `Submission Log ${i + 1}`,
  date: `2024-09-${String(i + 10).padStart(2, "0")}`,
  user: ["Alice Johnson", "Bob Smith", "Carol Davis"][i % 3],
  status: "Pending",
  description: `This is the description for submission log ${i + 1}.`,
}));

function getDeadlineInfo(dateStr) {
  const now = new Date();
  const deadline = new Date(dateStr);
  const diff = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
  const diffAbs = Math.abs(diff);
  const dateLabel = deadline.toLocaleDateString();
  if (diff > 0) {
    return {
      status: "Active",
      labelClass: "bg-green-100 text-green-700",
      dateLabel,
      daysText: `${diff} day${diff > 1 ? "s" : ""} to deadline`,
    };
  } else {
    return {
      status: "Passed",
      labelClass: "bg-red-100 text-red-700",
      dateLabel,
      daysText: `${diffAbs} day${diffAbs > 1 ? "s" : ""} ago`,
    };
  }
}

const PostsManagement = () => {
  const [showCreate, setShowCreate] = useState(false);
  // For demo, only use the separate arrays for each section
  const [activePosts] = useState(mockActivePosts);
  const [mostRecentPosts] = useState(mockMostRecentPosts);
  const [passedPosts] = useState(mockPassedPosts);
  const [form, setForm] = useState({
    title: "",
    deadline: "",
    recipients: [""], // Start with one empty recipient
    type: "softcopy",
    reference: "",
    description: "",
    availability_start_date: "",
    availability_end_date: "",
    status: true, // true for Open, false for Closed
  });
  const [viewPost, setViewPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [postStatus, setPostStatus] = useState(() =>
    Object.fromEntries(activePosts.map((p) => [p.id, true]))
  ); // true=open, false=closed
  const [submissionsLogs, setSubmissionsLogs] = useState(mockSubmissionsLogs);
  // Track status: 'Pending', 'Approved', 'Rejected'
  const [submissionStatus, setSubmissionStatus] = useState(() =>
    Object.fromEntries(mockSubmissionsLogs.map((log) => [log.id, "Pending"]))
  );
  // Track open/close status for passed posts
  const [passedPostStatus, setPassedPostStatus] = useState(() =>
    Object.fromEntries(mockPassedPosts.map((post) => [post.id, "Closed"]))
  );

  const handleToggleStatus = (id) => {
    setPostStatus((s) => ({ ...s, [id]: !s[id] }));
  };

  // Handler for open/close toggle
  const handlePassedPostToggle = (id, action) => {
    setPassedPostStatus((prev) => {
      let nextStatus;
      if (action === "Open") {
        nextStatus = prev[id] === "Open" ? "Closed" : "Open";
      } else {
        nextStatus = prev[id] === "Closed" ? "Open" : "Closed";
      }
      return { ...prev, [id]: nextStatus };
    });
  };

  // Filter posts by search term (title, description, or recipient name) for each section
  const filterPosts = (postsArr) =>
    postsArr.filter((post) => {
      const lower = searchTerm.toLowerCase();
      const inTitle = post.title.toLowerCase().includes(lower);
      const inDesc = post.description.toLowerCase().includes(lower);
      const inRecipients = post.recipients.some((id) => {
        const r = mockRecipients.find((r) => r.id === Number(id));
        return r && r.name.toLowerCase().includes(lower);
      });
      return inTitle || inDesc || inRecipients;
    });
  const filteredActivePosts = filterPosts(activePosts);
  const filteredMostRecentPosts = filterPosts(mostRecentPosts);
  const filteredPassedPosts = filterPosts(passedPosts);
  const filteredSubmissionsLogs = submissionsLogs.filter((log) => {
    const lower = searchTerm.toLowerCase();
    return (
      log.title.toLowerCase().includes(lower) ||
      log.user.toLowerCase().includes(lower) ||
      log.status.toLowerCase().includes(lower) ||
      log.description.toLowerCase().includes(lower)
    );
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // For dynamic recipient dropdowns
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
    // This part of the logic needs to be updated to add to the correct array
    // For now, it will add to the activePosts array as a placeholder
    // In a real application, you'd have a state for the current section's posts
    // and add to that state.
    // setPosts([
    //   ...posts,
    //   {
    //     ...form,
    //     id: posts.length + 1,
    //   },
    // ]);
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

  return (
    <div className="space-y-6">
      <div className="mb-8">
        {/* <h1 className="text-lg font-semibold text-gray-800">Post Management</h1> */}
        <div className="mt-2">
          <h2 className="text-2xl font-bold text-gray-900">Posts Monitoring</h2>
          <p className="mt-1 text-gray-500 text-base">
            Monitor and customize your posts, track submissions, and preview
            post and submissions history.
          </p>
        </div>
      </div>

      {/* Search Bar and Create Button Row */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
        <div className="flex-1">
          <div className="relative w-full">
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
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 w-full md:w-auto"
          onClick={() => setShowCreate(true)}
        >
          <span>Create Post</span>
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 gap-y-8">
        {/* Active Posts Section */}
        <div className="flex-1 min-w-0">
          <div className="relative flex flex-col h-[600px] w-full bg-white border border-gray-300 shadow">
            {/* Sticky Title/Header */}
            <div className="border-b px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-400">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <DocumentTextIcon className="h-6 w-6 text-white opacity-90" />
                Active Posts
              </h2>
            </div>
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-2 py-2 mb-2">
              {filteredActivePosts.length === 0 ? (
                <div className="flex flex-col items-center justify-center flex-1 text-gray-500 text-center py-8">
                  <DocumentTextIcon className="h-10 w-10 mb-2 opacity-60" />
                  <div className="text-base font-medium">No Active Post</div>
                </div>
              ) : (
                filteredActivePosts.map((post) => {
                  const deadlineInfo = getDeadlineInfo(post.deadline);
                  return (
                    <div
                      key={post.id}
                      className="bg-white shadow p-3 border border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between hover:shadow-md transition-shadow text-sm mb-3"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="font-semibold text-base text-gray-900">
                            {post.title}
                          </h2>
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-semibold ${deadlineInfo.labelClass}`}
                          >
                            {deadlineInfo.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-1 text-xs text-gray-700">
                          <div>
                            <span className="font-medium">Deadline:</span>{" "}
                            {deadlineInfo.dateLabel}{" "}
                            <span className="text-xs text-gray-500">
                              ({deadlineInfo.daysText})
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Type:</span>{" "}
                            {post.type.charAt(0).toUpperCase() +
                              post.type.slice(1)}
                          </div>
                          <div>
                            <span className="font-medium">Recipients:</span>{" "}
                            {post.recipients
                              .map((id) => {
                                const r = mockRecipients.find(
                                  (r) => r.id === Number(id)
                                );
                                return r ? r.name : "";
                              })
                              .join(", ")}
                          </div>
                        </div>
                        <div className="text-gray-600 mb-1 text-xs">
                          {post.description}
                        </div>
                        {post.type === "link" && post.link && (
                          <div>
                            <a
                              href={post.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline text-xs"
                            >
                              Provided Link
                            </a>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-row md:flex-col gap-2 mt-2 md:mt-0 md:ml-8 justify-end items-center">
                        <button
                          className="w-28 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                          title="View Submissions"
                        >
                          Submissions
                        </button>
                        <button
                          className="w-28 px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                          title="Edit Post"
                        >
                          Edit
                        </button>
                        <button
                          className="w-28 px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                          title="Delete Post"
                        >
                          Delete
                        </button>
                        <button
                          className={`w-28 px-2 py-1 text-xs font-medium rounded border transition ${
                            postStatus[post.id] !== false
                              ? "bg-white text-green-700 border-green-400 hover:bg-green-50"
                              : "bg-white text-gray-500 border-gray-300 hover:bg-gray-100"
                          }`}
                          onClick={() => handleToggleStatus(post.id)}
                          title={
                            postStatus[post.id] !== false
                              ? "Close Post"
                              : "Open Post"
                          }
                        >
                          {postStatus[post.id] !== false ? "Open" : "Closed"}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        {/* Most Recent Posts Section */}
        <div className="flex-1 min-w-0">
          <div className="relative flex flex-col h-[600px] w-full bg-white border border-gray-300 shadow">
            {/* Sticky Title/Header */}
            <div className="border-b px-4 py-3 bg-gradient-to-r from-green-600 to-green-400">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <ClockIcon className="h-6 w-6 text-white opacity-90" />
                Most Recent Posts
              </h2>
            </div>
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-2 py-2 mb-2">
              {filteredMostRecentPosts.length === 0 ? (
                <div className="text-gray-500 text-center py-8 bg-white shadow-sm border border-gray-200">
                  No posts found.
                </div>
              ) : (
                filteredMostRecentPosts.map((post) => {
                  const deadlineInfo = getDeadlineInfo(post.deadline);
                  return (
                    <div
                      key={post.id}
                      className="bg-white shadow p-3 border border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between hover:shadow-md transition-shadow text-sm mb-3"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="font-semibold text-base text-gray-900">
                            {post.title}
                          </h2>
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-semibold ${deadlineInfo.labelClass}`}
                          >
                            {deadlineInfo.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-1 text-xs text-gray-700">
                          <div>
                            <span className="font-medium">Deadline:</span>{" "}
                            {deadlineInfo.dateLabel}{" "}
                            <span className="text-xs text-gray-500">
                              ({deadlineInfo.daysText})
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Type:</span>{" "}
                            {post.type.charAt(0).toUpperCase() +
                              post.type.slice(1)}
                          </div>
                          <div>
                            <span className="font-medium">Recipients:</span>{" "}
                            {post.recipients
                              .map((id) => {
                                const r = mockRecipients.find(
                                  (r) => r.id === Number(id)
                                );
                                return r ? r.name : "";
                              })
                              .join(", ")}
                          </div>
                        </div>
                        <div className="text-gray-600 mb-1 text-xs">
                          {post.description}
                        </div>
                        {post.type === "link" && post.link && (
                          <div>
                            <a
                              href={post.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline text-xs"
                            >
                              Provided Link
                            </a>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-row md:flex-col gap-2 mt-2 md:mt-0 md:ml-8 justify-end items-center"></div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Passed/Closed Posts Section */}
      <div className="flex-1 min-w-0 flex flex-row gap-8">
        {/* Passed/Closed Posts Section */}
        <div className="flex-1 min-w-0">
          <div className="relative flex flex-col h-[600px] w-full bg-white border border-gray-300 shadow">
            {/* Sticky Title/Header */}
            <div className="border-b px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-400">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <ArchiveBoxIcon className="h-6 w-6 text-white opacity-90" />
                Passed/Closed Posts
              </h2>
            </div>
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-2 py-2 mb-2">
              {filteredPassedPosts.length === 0 ? (
                <div className="text-gray-500 text-center py-8 bg-white shadow-sm border border-gray-200">
                  No passed/closed posts.
                </div>
              ) : (
                filteredPassedPosts.map((post) => {
                  const deadlineInfo = getDeadlineInfo(post.deadline);
                  const isOpen = passedPostStatus[post.id] === "Open";
                  return (
                    <div
                      key={post.id}
                      className="bg-white shadow p-3 border border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between hover:shadow-md transition-shadow text-sm mb-3"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="font-semibold text-base text-gray-900">
                            {post.title}
                          </h2>
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-semibold
                            ${
                              isOpen
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {isOpen ? "Open" : "Closed"}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-1 text-xs text-gray-700">
                          <div>
                            <span className="font-medium">Deadline:</span>{" "}
                            {deadlineInfo.dateLabel}{" "}
                            <span className="text-xs text-gray-500">
                              ({deadlineInfo.daysText})
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Type:</span>{" "}
                            {post.type.charAt(0).toUpperCase() +
                              post.type.slice(1)}
                          </div>
                          <div>
                            <span className="font-medium">Recipients:</span>{" "}
                            {post.recipients
                              .map((id) => {
                                const r = mockRecipients.find(
                                  (r) => r.id === Number(id)
                                );
                                return r ? r.name : "";
                              })
                              .join(", ")}
                          </div>
                        </div>
                        <div className="text-gray-600 mb-1 text-xs">
                          {post.description}
                        </div>
                        {post.type === "link" && post.link && (
                          <div>
                            <a
                              href={post.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline text-xs"
                            >
                              Provided Link
                            </a>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-2 md:mt-0 md:ml-8 justify-end">
                        <label className="flex items-center cursor-pointer select-none">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={isOpen}
                              onChange={() =>
                                handlePassedPostToggle(post.id, "Open")
                              }
                              className="sr-only peer"
                            />
                            <div
                              className={`w-10 h-5 rounded-full shadow-inner border transition-colors
                              ${
                                isOpen
                                  ? "bg-green-400 border-green-600"
                                  : "bg-red-400 border-red-600"
                              }`}
                            ></div>
                            <div
                              className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform
                              ${isOpen ? "translate-x-5" : ""}`}
                            ></div>
                          </div>
                          <span
                            className={`ml-3 text-xs font-medium ${
                              isOpen ? "text-green-700" : "text-red-700"
                            }`}
                          >
                            {isOpen ? "Open" : "Closed"}
                          </span>
                        </label>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        {/* Submissions Logs Section */}
        <div className="flex-1 min-w-0">
          <div className="relative flex flex-col h-[600px] w-full bg-white border border-gray-300 shadow">
            {/* Sticky Title/Header */}
            <div className="border-b px-4 py-3 bg-gradient-to-r from-purple-700 to-purple-400">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                {/* You can use an icon here if desired */}
                Submissions Logs
              </h2>
            </div>
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-2 py-2 mb-2">
              {filteredSubmissionsLogs.length === 0 ? (
                <div className="text-gray-500 text-center py-8 bg-white shadow-sm border border-gray-200">
                  No submissions logs.
                </div>
              ) : (
                filteredSubmissionsLogs.map((log) => (
                  <div
                    key={log.id}
                    className="bg-white shadow p-3 border border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between hover:shadow-md transition-shadow text-sm mb-3"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="font-semibold text-base text-gray-900">
                          {log.title}
                        </h2>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-semibold
                            ${
                              log.status === "Approved"
                                ? "bg-green-100 text-green-700"
                                : log.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                          {log.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-1 text-xs text-gray-700">
                        <div>
                          <span className="font-medium">Date:</span> {log.date}
                        </div>
                        <div>
                          <span className="font-medium">User:</span> {log.user}
                        </div>
                      </div>
                      <div className="text-gray-600 mb-1 text-xs">
                        {log.description}
                      </div>
                    </div>
                    <div className="flex flex-row md:flex-col gap-2 mt-2 md:mt-0 md:ml-8 justify-end items-center">
                      <div className="flex items-center gap-2">
                        <button
                          className={`w-20 px-2 py-1 text-xs font-medium rounded border transition
                            ${
                              submissionStatus[log.id] === "Approved"
                                ? "bg-green-500 text-white border-green-600"
                                : "bg-white text-green-700 border-green-400 hover:bg-green-50"
                            }
                          `}
                          onClick={() => {
                            const next =
                              submissionStatus[log.id] === "Approved"
                                ? "Pending"
                                : "Approved";
                            setSubmissionStatus((prev) => {
                              setSubmissionsLogs((logs) =>
                                logs.map((l) =>
                                  l.id === log.id ? { ...l, status: next } : l
                                )
                              );
                              return { ...prev, [log.id]: next };
                            });
                          }}
                        >
                          Approve
                        </button>
                        <button
                          className={`w-20 px-2 py-1 text-xs font-medium rounded border transition
                            ${
                              submissionStatus[log.id] === "Rejected"
                                ? "bg-red-500 text-white border-red-600"
                                : "bg-white text-red-700 border-red-400 hover:bg-red-50"
                            }
                          `}
                          onClick={() => {
                            const next =
                              submissionStatus[log.id] === "Rejected"
                                ? "Pending"
                                : "Rejected";
                            setSubmissionStatus((prev) => {
                              setSubmissionsLogs((logs) =>
                                logs.map((l) =>
                                  l.id === log.id ? { ...l, status: next } : l
                                )
                              );
                              return { ...prev, [log.id]: next };
                            });
                          }}
                        >
                          Reject
                        </button>
                      </div>
                      <button
                        className="w-24 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                        title="View Submission"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        padding={false}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b sticky top-0 bg-gradient-to-r from-blue-600 to-blue-400 z-10">
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

      {/* View Post Modal for Recipient POV */}
      {viewPost && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setViewPost(null)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2">{viewPost.title}</h2>
            <p className="text-gray-600 text-sm mb-2">{viewPost.description}</p>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-2 py-0.5 rounded text-xs font-semibold ${
                  getDeadlineInfo(viewPost.deadline).labelClass
                }`}
              >
                {getDeadlineInfo(viewPost.deadline).status}
              </span>
              <span className="text-xs text-gray-700">
                {getDeadlineInfo(viewPost.deadline).dateLabel}
              </span>
              <span className="text-xs text-gray-500">
                {getDeadlineInfo(viewPost.deadline).daysText}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-2">
              Type:{" "}
              {viewPost.type.charAt(0).toUpperCase() + viewPost.type.slice(1)}
            </p>
            {viewPost.type === "softcopy" && (
              <form>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="block mb-2"
                />
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                  Upload
                </button>
              </form>
            )}
            {viewPost.type === "hardcopy" && (
              <div className="text-xs text-gray-700">
                Submit hardcopy to division office.
              </div>
            )}
            {viewPost.type === "link" && (
              <form>
                <input
                  type="url"
                  placeholder="Paste your link here"
                  className="border rounded px-2 py-1 text-sm mr-2"
                />
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsManagement;
