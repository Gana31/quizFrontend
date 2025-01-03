import React from 'react';
import About1 from '../../assets/About/About.png';
import Video1 from '../../assets/About.mp4';
import Video2 from '../../assets/About1.mp4';
function About() {
    const cards = [
        {
          icon: "📚",
          title: "Create Quizzes",
          description: "Easily create engaging quizzes for users and manage them efficiently.",
        },
        {
          icon: "🔍",
          title: "Discover Exams",
          description: "Users can explore and take part in available exams effortlessly.",
        },
        {
          icon: "📊",
          title: "Analyze Results",
          description: "Get detailed insights and analytics for better performance tracking.",
        },
        {
          icon: "💻",
          title: "Seamless Experience",
          description: "Provide users with a smooth and hassle-free quiz-taking experience.",
        },
        {
          icon: "🔐",
          title: "Secure Platform",
          description: "Ensure your quizzes and user data are protected with top-notch security.",
        },
        {
          icon: "⚙️",
          title: "Custom Settings",
          description: "Tailor your quizzes and exams with customizable options.",
        },
      ];
    
    return (
        <div className="max-w-max overflow-x-hidden">
            {/* First Section */}
            <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center my-[6%] lg:my-[5%] lg:px-16 px-4">
                <div className="flex flex-col justify-center text-center lg:text-left w-[90%] lg:w-1/2 lg:pr-8 gap-y-4">
                    <h1 className="font-mentiDisplay text-2xl lg:text-4xl lg:w-full text-wrap mb-5">
                        AptitudeHub - Create Quizzes with Ease
                    </h1>
                    <p className="font-mentiText lg:text-2xl lg:w-[90%] text-wrap">
                        A platform to create topic-wise quizzes, conduct exams, and provide engaging learning experiences. Import quizzes from PDFs and let candidates attempt them effortlessly.
                    </p>
                    <button className=" w-2/6 px-4 py-4 lg:px-7 lg:py-4 bg-gray-800 rounded-full hover:bg-black text-white text-sm  font-semibold">
          Get started, it's free
        </button>
                </div>
                <div className="flex w-full lg:w-1/2 justify-center items-center mt-6 lg:mt-0">
                    <img src={About1} className="w-[90%] lg:w-[80%]" alt="About" />
                </div>
            </div>

            {/* Second Section */}
            <div className="w-full md:w-[80%] my-[5%] flex flex-col md:flex-row mx-auto gap-x-8 items-center justify-center px-4 md:px-0">
                <div className="w-full md:w-1/2">
                    <video
                        className="rounded-lg w-[100%] lg:max-w-3xl h-auto object-fit"
                        loop
                        autoPlay
                        muted
                        src={Video1}
                    ></video>
                </div>
                <div className="w-full md:w-1/2 mt-6 md:mt-0">
                    <p className="text-wrap font-mentiDisplay text-3xl mb-5 text-center md:text-left">
                        Higher participation means better decisions
                    </p>
                    <ul className="list-[square] w-[90%] text-green-500 pl-6 md:pl-4  space-y-4">
                        <li><span className="text-black">Anonymous submissions lead to more responses and more honesty.</span></li>
                        <li><span className="text-black">Harness the group's collective intelligence now that everyone has had their say.</span></li>
                        <li><span className="text-black">Use the group’s collective intelligence when everyone has a voice.</span></li>
                    </ul>
                </div>
            </div>

            {/* Third Section */}
            <div className="w-full md:w-[80%] my-[5%] flex flex-col md:flex-row mx-auto gap-x-8 items-center justify-center px-4 md:px-0">
                <div className="w-full md:w-1/2 order-2 md:order-1 mt-6 md:mt-0">
                    <p className="text-wrap font-mentiDisplay text-3xl mb-5 text-center md:text-left">
                        Import quizzes seamlessly from PDFs
                    </p>
                    <ul className="list-[square] w-[90%] text-green-500 pl-6 md:pl-4 space-y-4">
                        <li><span className="text-black">Upload PDF files to generate quizzes automatically.</span></li>
                        <li><span className="text-black">Set exams with ease and provide a smooth experience for candidates.</span></li>
                        <li><span className="text-black">Analyze results and insights for better learning outcomes.</span></li>
                    </ul>
                </div>
                <div className="w-full md:w-1/2 order-1 md:order-2">
                    <video
                        className="rounded-lg w-[100%] lg:max-w-3xl h-auto object-fit"
                        loop
                        autoPlay
                        muted
                        src={Video2}
                    ></video>
                </div>
            </div>
            <div className="max-w-7xl mx-auto p-6">
      <div className=" font-mentiText grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-purple-50 rounded-lg p-6 hover:shadow-lg transition duration-300"
          >
            <div className="text-4xl mb-4">{card.icon}</div>
            <h3 className="text-lg font-mentiDisplay font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
        </div>
    );
}

export default About;
