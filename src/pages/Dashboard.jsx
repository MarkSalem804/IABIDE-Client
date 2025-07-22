import { useState } from "react";
import { UsersIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const Dashboard = () => {
  const stats = [
    {
      name: "North",
      value: "1,234",
      change: "+5.2%",
      changeType: "positive",
      icon: UsersIcon,
    },
    {
      name: "South",
      value: "2,345",
      change: "+3.8%",
      changeType: "positive",
      icon: UsersIcon,
    },
    {
      name: "East",
      value: "1,789",
      change: "-1.1%",
      changeType: "negative",
      icon: UsersIcon,
    },
    {
      name: "West",
      value: "2,012",
      change: "+2.4%",
      changeType: "positive",
      icon: UsersIcon,
    },
  ];

  const statGradients = [
    "from-blue-500 to-blue-700",
    "from-green-500 to-green-700",
    "from-yellow-500 to-yellow-700",
    "from-purple-500 to-purple-700",
  ];

  const iconColors = [
    "text-blue-500",
    "text-green-500",
    "text-yellow-500",
    "text-purple-500",
  ];

  const pastelBg = [
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-purple-100",
  ];

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Documents Processed",
        data: [2400, 2800, 3200, 2900, 3400, 3800],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const doughnutData = {
    labels: ["North", "South", "East", "West"],
    datasets: [
      {
        data: [1234, 2345, 1789, 2012],
        backgroundColor: [
          "rgb(59, 130, 246)", // blue
          "rgb(16, 185, 129)", // green
          "rgb(245, 158, 11)", // yellow
          "rgb(239, 68, 68)", // red
        ],
      },
    ],
  };

  const mockSchools = [
    "Imus National High School",
    "Imus Pilot Elementary School",
    "North Cluster School",
    "South Cluster School",
  ];

  const clusterNames = ["North", "South", "East", "West"];

  const clusterSchoolsData = {
    North: { "Imus National High School": 34, "North Cluster School": 18 },
    South: { "Imus Pilot Elementary School": 27, "South Cluster School": 15 },
    East: { "Eastside Elementary": 12, "Eastside High": 9 },
    West: { "Westview School": 21, "West End Academy": 17 },
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const doughnutOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      tooltip: {
        callbacks: {
          label: function (context) {
            const cluster = context.label;
            const schoolsData = clusterSchoolsData[cluster] || {};
            return [
              `${cluster}: ${context.parsed}`,
              ...Object.entries(schoolsData).map(
                ([school, value]) => `${school}: ${value}`
              ),
            ];
          },
        },
      },
    },
  };

  const [activityFilter, setActivityFilter] = useState("weekly");
  const [activityView, setActivityView] = useState("perCluster"); // 'perCluster' or 'perSchool'
  const [selectedSchool, setSelectedSchool] = useState(mockSchools[0]);
  const [dateRange, setDateRange] = useState({
    start: "2024-07-01",
    end: "2024-07-31",
  });

  // Mock data for clusters and schools
  const barDataSets = {
    weekly: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      clusters: [
        [120, 150, 100, 90, 110, 130, 140], // North
        [100, 120, 90, 80, 100, 110, 120], // South
        [80, 100, 70, 60, 90, 100, 110], // East
        [90, 110, 80, 70, 100, 120, 130], // West
      ],
      schools: {
        "Imus National High School": [30, 40, 20, 25, 35, 45, 50],
        "Imus Pilot Elementary School": [20, 30, 15, 20, 25, 30, 35],
        "North Cluster School": [15, 20, 10, 12, 18, 22, 25],
        "South Cluster School": [10, 15, 8, 10, 12, 15, 18],
      },
    },
    monthly: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      clusters: [
        [300, 350, 400, 420],
        [250, 300, 320, 340],
        [200, 250, 270, 290],
        [220, 270, 290, 310],
      ],
      schools: {
        "Imus National High School": [80, 90, 100, 110],
        "Imus Pilot Elementary School": [60, 70, 80, 90],
        "North Cluster School": [40, 50, 60, 70],
        "South Cluster School": [30, 40, 50, 60],
      },
    },
    quarterly: {
      labels: ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"],
      clusters: [
        [900, 950, 1000, 1100],
        [800, 850, 900, 950],
        [700, 750, 800, 850],
        [750, 800, 850, 900],
      ],
      schools: {
        "Imus National High School": [250, 270, 300, 320],
        "Imus Pilot Elementary School": [180, 200, 220, 240],
        "North Cluster School": [120, 140, 160, 180],
        "South Cluster School": [100, 120, 140, 160],
      },
    },
  };

  let barData;
  if (activityView === "perCluster") {
    barData = {
      labels: barDataSets[activityFilter].labels,
      datasets: clusterNames.map((cluster, idx) => ({
        label: cluster,
        data: barDataSets[activityFilter].clusters[idx],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)", // blue
          "rgba(16, 185, 129, 0.8)", // green
          "rgba(245, 158, 11, 0.8)", // yellow
          "rgba(239, 68, 68, 0.8)", // red
        ][idx],
      })),
    };
  } else {
    barData = {
      labels: barDataSets[activityFilter].labels,
      datasets: [
        {
          label: selectedSchool,
          data: barDataSets[activityFilter].schools[selectedSchool],
          backgroundColor: "rgba(59, 130, 246, 0.8)",
        },
      ],
    };
  }

  return (
    <div className="space-y-6 bg-gray-100 min-h-screen p-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome back! Here is what is happening with your document system.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={stat.name}
            className={`bg-gradient-to-r ${statGradients[idx]} rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">{stat.name}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p
                  className={`text-sm ${
                    stat.changeType === "positive"
                      ? "text-green-200"
                      : "text-red-200"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </div>
              <div
                className={`h-12 w-12 ${pastelBg[idx]} rounded-full shadow-lg flex items-center justify-center`}
              >
                <stat.icon className={`h-6 w-6 ${iconColors[idx]}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-gray-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Document Processing Trend
          </h3>
          <div className="chart-container">
            <Line data={lineData} options={chartOptions} />
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-gray-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Cluster Distribution
          </h3>
          <div className="chart-container">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Bar Chart with Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-gray-300">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Activity Overview
        </h3>
        <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
          <button
            className={`px-3 py-1 rounded text-sm ${
              activityFilter === "weekly"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActivityFilter("weekly")}
          >
            Weekly
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${
              activityFilter === "monthly"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActivityFilter("monthly")}
          >
            Monthly
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${
              activityFilter === "quarterly"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActivityFilter("quarterly")}
          >
            Quarterly
          </button>
          <button
            className="ml-4 p-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm flex items-center justify-center"
            onClick={() => setActivityFilter("weekly")}
            disabled={activityFilter === "weekly"}
            title="Reset Filter"
          >
            <ArrowPathIcon className="h-4 w-4" />
          </button>
          <span className="ml-4 font-medium text-sm">View:</span>
          <button
            className={`px-3 py-1 rounded text-sm ${
              activityView === "perCluster"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActivityView("perCluster")}
          >
            Per Cluster
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${
              activityView === "perSchool"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActivityView("perSchool")}
          >
            Per School
          </button>
          {activityView === "perSchool" && (
            <select
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-sm"
            >
              {mockSchools.map((school) => (
                <option key={school} value={school}>
                  {school}
                </option>
              ))}
            </select>
          )}
          <span className="ml-4 font-medium text-sm">Date Range:</span>
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) =>
              setDateRange((r) => ({ ...r, start: e.target.value }))
            }
            className="px-2 py-1 border border-gray-300 rounded text-sm"
          />
          <span className="text-sm">-</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) =>
              setDateRange((r) => ({ ...r, end: e.target.value }))
            }
            className="px-2 py-1 border border-gray-300 rounded text-sm"
          />
        </div>
        <div className="chart-container">
          <Bar data={barData} options={chartOptions} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border-2 border-gray-300">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            {
              user: "Alice Johnson",
              action: "uploaded a document",
              file: "report_Q1.pdf",
              time: "2 minutes ago",
            },
            {
              user: "Bob Smith",
              action: "modified security settings",
              file: "2FA enabled",
              time: "5 minutes ago",
            },
            {
              user: "Carol Davis",
              action: "deleted document",
              file: "old_contract.docx",
              time: "12 minutes ago",
            },
            {
              user: "David Wilson",
              action: "created new user account",
              file: "jane.doe@company.com",
              time: "18 minutes ago",
            },
          ].map((activity, index) => (
            <div key={index} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span>{" "}
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500">{activity.file}</p>
                </div>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
