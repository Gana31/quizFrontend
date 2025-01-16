import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiClient from "../../Services/ApiConnector";
import FeedbackCard from "./Feedbackcard";

export default function TeacherFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch feedbacks from API
  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/getteacherfeedback");
      if (response.data.success) {
        setFeedbacks(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch feedback");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load feedback");
    } finally {
      setLoading(false);
    }
  };

  // Handle reply submission
  const handleReply = async (id, reply) => {
    try {
      const response = await apiClient.patch(`/repaytoquestion/${id}`, {
        adminReply: reply,
      });
      if (response.data.success) {
        toast.success("Reply submitted successfully!");
        fetchFeedback(); // Refetch feedback data
      } else {
        toast.error(response.data.message || "Failed to submit reply");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit reply");
    }
  };

  const filteredFeedbacks =
    filter === "all" ? feedbacks : feedbacks.filter((f) => !f.adminReplied);

  const unreadCount = feedbacks.filter((f) => !f.adminReplied).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Student Feedback</h1>
        <div className="flex gap-4 items-center">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {unreadCount} unread
          </span>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filter === "unread"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setFilter("unread")}
            >
              Unread
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        {loading ? (
          <div>Loading...</div>
        ) : (
          filteredFeedbacks.map((feedback, index) => (
            <FeedbackCard
              key={feedback._id}
              index={index}
              feedback={feedback}
              isTeacher
              onReply={handleReply}
            />
          ))
        )}
      </div>
    </div>
  );
}
