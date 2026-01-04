import React from "react";
import { Trophy, Home } from "lucide-react";

import { useNavigate } from "react-router-dom";
import Footer from "./footer";
const Finished = ({ percentage, score, questions }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 md:p-12 text-center max-w-2xl w-full ">
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-full w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 flex items-center justify-center">
          <Trophy className="w-12 h-12 md:w-16 md:h-16 text-purple-600" />
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">
          Quiz Complete!
        </h2>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
          <p className="text-6xl md:text-7xl font-black text-purple-600 mb-2">
            {score}/{questions.length}
          </p>
          <p className="text-xl text-gray-600 font-semibold">
            {percentage}% Correct
          </p>
        </div>
        <p className="text-lg text-gray-600 mb-8">
          {percentage >= 80
            ? "Outstanding work! "
            : percentage >= 60
            ? "Great job! Keep it up! "
            : percentage >= 40
            ? "Good effort! Practice makes perfect! "
            : "Keep learning and try again! "}
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-purple-600 cursor-pointer  hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </button>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Finished;
