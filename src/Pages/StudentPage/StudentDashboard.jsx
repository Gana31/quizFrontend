function DashboardStats({ DashboardStats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {DashboardStats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
          <dt className="text-sm font-medium text-gray-500 truncate">{stat.title}</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</dd>
          <dd
            className={`mt-2 text-sm ${
              stat.changeType === "increase"
                ? "text-green-600"
                : stat.changeType === "decrease"
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            {stat.change}
          </dd>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;
