import { useEffect, useState } from 'react';
import Sidebar from '../../Component/Common/Sidebar';
import DashboardStats from './StudentDashboard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import QuizCard from './QuizCard';
import PreviousQuizzes from './PreviousQuizes';
import { fetchUpcomingQuizzes } from '../../Services/Operations/quizeoperation';






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

  useEffect(() => {
    // Fetch upcoming quizzes when the component mounts
    const getQuizzes = async () => {
      const quizzes = await fetchUpcomingQuizzes();
      setUpcomingQuizzes(quizzes);
    };
    getQuizzes();
  }, []); //

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 md:ml-64">
        {activeTab === 'upcoming' && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Upcoming Quizzes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {upcomingQuizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
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