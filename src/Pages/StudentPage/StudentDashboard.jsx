function DashboardStats() {
    const stats = [
      {
        title: "Total Quizzes Taken",
        value: "12",
        change: "+2 from last month",
        changeType: "increase"
      },
      {
        title: "Average Score",
        value: "85%",
        change: "+5% from last month",
        changeType: "increase"
      },
      {
        title: "Upcoming Quizzes",
        value: "3",
        change: "Next quiz in 2 days",
        changeType: "neutral"
      },
      {
        title: "Completion Rate",
        value: "95%",
        change: "Same as last month",
        changeType: "neutral"
      }
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <dt className="text-sm font-medium text-gray-500 truncate">
              {stat.title}
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {stat.value}
            </dd>
            <dd className={`mt-2 text-sm ${
              stat.changeType === 'increase' 
                ? 'text-green-600' 
                : stat.changeType === 'decrease' 
                  ? 'text-red-600' 
                  : 'text-gray-600'
            }`}>
              {stat.change}
            </dd>
          </div>
        ))}
      </div>
    );
  }
  
  export default DashboardStats;