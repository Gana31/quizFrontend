import React, { useState } from "react";


export default function FeedbackCard({ feedback, isTeacher, onReply, index }) {
  const [replyText, setReplyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;
    setIsSubmitting(true);
    try {
      await onReply(feedback._id, replyText.trim()); // Call the onReply function
      setReplyText("");
    } catch (error) {
      console.error("Failed to submit reply:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Question #{index + 1}</h2>
          <span className="text-gray-500 text-sm">{new Date(feedback.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Question */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <p className="text-lg text-gray-800">{feedback.question.questionText}</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Options</h3>
            <div className="grid gap-3">
              {feedback.question.options.map((option, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-all ${
                    option === feedback.question.correctAnswer
                      ? "bg-green-50 border-green-200"
                      : option === feedback.question.selectedAnswer
                      ? "bg-red-50 border-red-200"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        option === feedback.question.correctAnswer
                          ? "bg-green-500"
                          : option === feedback.question.selectedAnswer
                          ? "bg-red-500"
                          : "bg-gray-400"
                      }`}
                    />
                    <span
                      className={`${
                        option === feedback.question.correctAnswer
                          ? "text-green-700"
                          : option === feedback.question.selectedAnswer
                          ? "text-red-700"
                          : "text-gray-700"
                      }`}
                    >
                      {option}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User's Answer */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Student's Answer</h3>
            <div
              className={`p-6 rounded-lg border ${
                feedback.question.selectedAnswer === feedback.question.correctAnswer
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <p
                className={`text-lg font-medium ${
                  feedback.question.selectedAnswer === feedback.question.correctAnswer
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                {feedback.question.selectedAnswer}
              </p>
            </div>
          </div>
        </div>

        {/* Student's Feedback */}
        <div className="border-t border-gray-100 pt-6 mt-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Student's Feedback</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 leading-relaxed">{feedback.feedback}</p>
          </div>
        </div>

        {/* Teacher's Reply */}
        {feedback.adminReply && (
          <div className="border-t border-gray-100 pt-6 mt-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Teacher's Reply</h3>
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <p className="text-gray-700 leading-relaxed">{feedback.adminReply}</p>
            </div>
          </div>
        )}

        {/* Reply Box for Teacher */}
        {isTeacher && !feedback.adminReplied && (
          <div className="border-t border-gray-100 pt-6 mt-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Write a Reply</h3>
            <div className="space-y-4">
              <textarea
                className="w-full p-4 rounded-lg border border-gray-200 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Type your response here..."
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button
                className={`px-6 py-2.5 rounded-lg text-white font-medium transition-all ${
                  replyText.trim() && !isSubmitting
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={handleReplySubmit}
                disabled={!replyText.trim() || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Reply"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
