export const mockFeedbacks = [
    {
      id: "1",
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris",
      userAnswer: "London",
      userFeedback:
        "I thought London was the capital of France because it's a major European city.",
      teacherReply: "London is actually the capital of the UK. Paris is the capital of France.",
      isRead: true,
      createdAt: "2024-03-20",
    },
    {
      id: "2",
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
      userAnswer: "Venus",
      userFeedback: "I confused Venus with Mars because both are nearby planets.",
      isRead: false,
      createdAt: "2024-03-21",
    },
  ];
  