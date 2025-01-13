import React from 'react';
import { questions } from './QuizExam';

const QuestionSidebar = ({ answers }) => {
  const getQuestionStatus = (index) => {
    if (index >= answers.length) return 'unvisited';
    if (answers[index].selectedOption === null) return 'skipped';
    return 'answered';
  };

  const getTopicStats = () => {
    const stats = {};

    questions.forEach((q, index) => {
      if (!stats[q.topic]) {
        stats[q.topic] = {
          total: 0,
          attempted: 0,
          totalTime: 0
        };
      }

      stats[q.topic].total++;
      stats[q.topic].totalTime += q.timeAllowed;

      if (index < answers.length && answers[index].selectedOption !== null) {
        stats[q.topic].attempted++;
      }
    });

    return stats;
  };

  const getQuestionsByTopic = () => {
    const grouped = {};

    questions.forEach((q) => {
      if (!grouped[q.topic]) {
        grouped[q.topic] = [];
      }
      grouped[q.topic].push(q);
    });

    return grouped;
  };

  const questionsByTopic = getQuestionsByTopic();
  const topicStats = getTopicStats();

  return (
    <div className="hidden lg:block w-80 bg-white rounded-2xl shadow-xl p-6 mr-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Topics Overview</h3>
      <div className="space-y-6">
        {Object.entries(questionsByTopic).map(([topic, topicQuestions]) => (
          <div key={topic} className="bg-gray-50 rounded-lg p-4">
            <div className="mb-3">
              <h4 className="font-medium text-gray-800">{topic}</h4>
              <p className="text-sm text-gray-600">
                Time: {topicStats[topic].totalTime}s
              </p>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {topicQuestions.map((q) => {
                const questionIndex = questions.findIndex(que => que.id === q.id);
                const status = getQuestionStatus(questionIndex);
                const statusColors = {
                  unvisited: 'bg-gray-200',
                  skipped: 'bg-red-200',
                  answered: 'bg-green-200'
                };

                return (
                  <div
                    key={q.id}
                    className={`${statusColors[status]} p-2 rounded-lg flex items-center justify-center cursor-pointer transition-colors`}
                  >
                    <span className="font-medium text-gray-700">
                      {questionIndex + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <span className="text-sm text-gray-600">Not Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-200 rounded"></div>
          <span className="text-sm text-gray-600">Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-200 rounded"></div>
          <span className="text-sm text-gray-600">Skipped</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionSidebar;
