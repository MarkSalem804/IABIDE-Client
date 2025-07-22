import { useState } from "react";
import Modal from "../../components/modals/CreatePostModal";

const mockRecipients = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Carol Davis" },
];

const mockPosts = [
  {
    id: 1,
    title: "Submit Q2 Report",
    deadline: "2024-07-25",
    recipients: [1, 2],
    type: "softcopy",
    link: "",
    description: "Upload your Q2 report as PDF or Word.",
  },
  {
    id: 2,
    title: "Division Memo 2024-10",
    deadline: "2024-07-20",
    recipients: [2, 3],
    type: "hardcopy",
    link: "",
    description: "Submit the signed memo in hardcopy to the division office.",
  },
  {
    id: 3,
    title: "Online Survey",
    deadline: "2024-07-30",
    recipients: [1, 3],
    type: "link",
    link: "https://forms.gle/example",
    description: "Complete the online survey using the provided link.",
  },
];

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

const RecipientPostsManagement = () => {
  const [viewPost, setViewPost] = useState(null);
  // For demo, assume current recipient is id 1
  const currentRecipientId = 1;
  const visiblePosts = mockPosts.filter((p) =>
    p.recipients.includes(currentRecipientId)
  );

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">My Posts</h1>
      <div className="space-y-4 mb-8">
        {visiblePosts.length === 0 && (
          <div className="text-gray-500">No active posts.</div>
        )}
        {visiblePosts.map((post) => {
          const deadlineInfo = getDeadlineInfo(post.deadline);
          return (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between border border-gray-200"
            >
              <div>
                <h2 className="font-semibold text-lg">{post.title}</h2>
                <p className="text-gray-600 text-sm">{post.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-semibold ${deadlineInfo.labelClass}`}
                  >
                    {deadlineInfo.status}
                  </span>
                  <span className="text-xs text-gray-700">
                    {deadlineInfo.dateLabel}
                  </span>
                  <span className="text-xs text-gray-500">
                    {deadlineInfo.daysText}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Type: {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                </p>
                {post.type === "link" && post.link && (
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline text-xs"
                  >
                    Provided Link
                  </a>
                )}
              </div>
              <div className="mt-4 md:mt-0 md:ml-8">
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  onClick={() => setViewPost(post)}
                >
                  View
                </button>
              </div>
            </div>
          );
        })}
      </div>
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

export default RecipientPostsManagement;
