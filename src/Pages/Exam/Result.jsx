import React from 'react';

// Assuming `questions` is passed correctly from the parent component.
const Result = ({ answers, questions }) => {
  // Calculate topic stats
  const getTopicStats = () => {
    const stats = {};
    
    // Loop over the questions array passed as props
    questions.forEach((q) => {
      if (!stats[q.topic]) {
        stats[q.topic] = {
          total: 0,
          attempted: 0,
          totalTime: 0,
        };
      }

      stats[q.topic].total++;
      stats[q.topic].totalTime += q.timeAllowed;

      // Check if the user has answered the question
      const answer = answers.find((a) => a.questionId === q.id);
      if (answer && answer.selectedOption !== null) {
        stats[q.topic].attempted++;
      }
    });

    return stats;
  };

  const topicStats = getTopicStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-center mb-8 text-purple-800">Quiz Results</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-purple-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Questions Attempted</h3>
            <p className="text-4xl font-bold text-purple-600">
              {answers.filter((a) => a.selectedOption !== null).length} / {questions.length}
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Topic Breakdown</h3>
            <div className="space-y-2">
              {Object.entries(topicStats).map(([topic, stats]) => (
                <div key={topic} className="flex justify-between">
                  <span>{topic}:</span>
                  <span className="font-medium">{stats.attempted}/{stats.total}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {questions.map((question, index) => {
            const answer = answers.find((a) => a.questionId === question.id);
            return (
              <div key={question.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                        {question.topic}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {question.timeAllowed}s
                      </span>
                    </div>
                    <p className="font-medium text-gray-800">{question.question}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Your answer: {answer && answer.selectedOption !== null
                        ? question.options[answer.selectedOption]
                        : "No answer"
                      }
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

     
      </div>
    </div>
  );
};

export default Result;
