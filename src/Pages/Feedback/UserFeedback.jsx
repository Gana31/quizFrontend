import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../../Component/Common/Spinner";
import apiClient from "../../Services/ApiConnector";
import FeedbackCard from "./Feedbackcard";

export default function UserFeedback() {
  const [feedbacks, setFeedbacks] = useState([]); 
  const [loading, setLoading] = useState(true); 

  // Fetch the feedbacks from the API
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await apiClient.get("/getuserfeedback"); 
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

    fetchFeedback();
  }, []); 

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Feedback History</h1>
        <LoadingSpinner/>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Feedback History</h1>
      <div className="space-y-6">
        {feedbacks.length === 0 ? (
          <div>No feedback found.</div> // Display a message if no feedback is found
        ) : (
          feedbacks.map((feedback ,index) => (
            <FeedbackCard key={feedback._id} feedback={feedback} index={index} />
          ))
        )}
      </div>
    </div>
  );
}
