import { toast } from "react-toastify";
import { setLoading } from "../../Slices/authSlice";
import apiClient from "../ApiConnector";

export function enrollInQuiz(quizId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiClient.post(`/enroll/${quizId}`);
      if (response.data.success) {
        toast.success("You have successfully enrolled in the quiz!");
        return response.data.data; // Return enrolled quiz data
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to enroll in the quiz");
    }
    dispatch(setLoading(false));
  };
}
