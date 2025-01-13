import { useEffect, useState } from 'react';
import Sidebar from '../../Component/Common/Sidebar';
import DashboardStats from './StudentDashboard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import QuizCard from './QuizCard';
import PreviousQuizzes from './PreviousQuizes';
import { fetchLiveQuizzes, fetchUpcomingQuizzes } from '../../Services/Operations/quizeoperation';






const quizHistory = [
  { name: 'JavaScript Basics', obtainedMarks: 85, totalMarks: 100 },
  { name: 'React Fundamentals', obtainedMarks: 92, totalMarks: 100 },
  { name: 'Node.js Basics', obtainedMarks: 78, totalMarks: 100 },
  { name: 'Database Design', obtainedMarks: 88, totalMarks: 100 },
];

const growthData = [
  { month: 'Jan', score: 65 },
  { month: 'Feb', score: 72 },
  { month: 'Mar', score: 78 },
  { month: 'Apr', score: 85 },
  { month: 'May', score: 82 },
  { month: 'Jun', score: 88 },
  { month: 'Jul', score: 92 },
];

function StudentQuizMain() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [upcomingQuizzes, setUpcomingQuizzes] = useState([]);
  const [liveQuizzes, setLiveQuizzes] = useState([]);

  useEffect(() => {
    // Fetch upcoming quizzes
    const getUpcomingQuizzes = async () => {
      const quizzes = await fetchUpcomingQuizzes();
      setUpcomingQuizzes(quizzes);
    };

    // Fetch live quizzes
    const getLiveQuizzes = async () => {
      const quizzes = await fetchLiveQuizzes();
      setLiveQuizzes(quizzes);
    };

    getUpcomingQuizzes();
    getLiveQuizzes();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <div className='min-h-screen'>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 md:ml-10">
        {activeTab === 'upcoming' && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Upcoming Quizzes</h2>
            {upcomingQuizzes.length === 0 ? (
              <div className="text-center text-gray-500 font-medium py-6">
                No upcoming quizzes are available at the moment. Please check back later!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {upcomingQuizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} />
                ))}
              </div>
            )}
          </div>
        )}

{activeTab === "liveQuiz" && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Live Quizzes</h2>
            {liveQuizzes.length === 0 ? (
              <div className="text-center text-gray-500 font-medium py-6">
                No live quizzes are currently available. Please check back later!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {liveQuizzes.map((quiz) => (
                  <QuizCard
                    key={quiz.id}
                    quiz={{
                      ...quiz,
                      buttonText: "Enter Quiz",
                      isLive: true,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Your Quiz Dashboard</h2>
            <DashboardStats />

            {/* Performance Chart */}
            <div className="mt-6 md:mt-8 bg-white p-4 md:p-6 rounded-lg shadow-lg">
              <h3 className="text-lg md:text-xl font-semibold mb-4">Quiz Performance History</h3>
              <div className="h-[300px] md:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={quizHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="obtainedMarks" fill="#8884d8" name="Obtained Marks" />
                    <Bar dataKey="totalMarks" fill="#82ca9d" name="Total Marks" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Growth Chart */}
            <div className="mt-6 md:mt-8 bg-white p-4 md:p-6 rounded-lg shadow-lg">
              <h3 className="text-lg md:text-xl font-semibold mb-4">Performance Growth Trend</h3>
              <div className="h-[300px] md:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#8884d8"
                      strokeWidth={2}
                      name="Average Score"
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Quiz History</h2>
            <PreviousQuizzes />
          </div>
        )}
      </main>
    </div>
  );
}

export default StudentQuizMain;