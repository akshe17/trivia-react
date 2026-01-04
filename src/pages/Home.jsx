import React, { useEffect, useState } from "react";
import {
  Brain,
  Zap,
  Target,
  Trophy,
  AlertCircle,
  Sparkles,
  Clock,
  Award,
  Play,
  X,
} from "lucide-react";
import Footer from "../components/Footerr";

import { useNavigate } from "react-router-dom";
const Home = () => {
  const location = useNavigate();
  const [fetchCategories, setFetchCategories] = useState(null);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const res = await fetch("https://opentdb.com/api_category.php");
      const data = await res.json();
      setFetchCategories(data.trivia_categories);
    } catch (err) {
      console.log("Failed to fetch category: " + err);
    }
  };

  const handlePlayClick = () => {
    setShowSetupModal(true);
  };

  const submit = () => {
    if (!category || !difficulty) {
      setShowErrorModal(true);
      return;
    }
    setShowSetupModal(false);

    location("/quiz", {
      state: { category, difficulty },
    });
  };

  const sampleQuestions = [
    {
      category: "History",
      question: "What year did World War II end?",
      color: "purple",
      tilt: -4,
    },
    {
      category: "Science",
      question: "What is the chemical symbol for gold?",
      color: "pink",
      tilt: 6,
    },
    {
      category: "Entertainment",
      question: "Who directed the movie Inception?",
      color: "indigo",
      tilt: -4,
    },
    {
      category: "Geography",
      question: "What is the capital of Australia?",
      color: "blue",
      tilt: 4,
    },
    {
      category: "Sports",
      question: "How many players are on a basketball team?",
      color: "green",
      tilt: -6,
    },
    {
      category: "Music",
      question: "Who is known as the King of Pop?",
      color: "red",
      tilt: 1,
    },
  ];

  return (
    <div className="min-h-screen  bg-gradient-to-b from-purple-600 to-white text-white relative overflow-hidden">
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="container mx-auto  overflow-hidden h-full  py-8 md:py-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Brain
              className="w-10 h-10 md:w-12 md:h-12 text-white"
              strokeWidth={2.5}
            />
            <h1 className="text-5xl md:text-7xl text-white tracking-tight">
              E-Trivia
            </h1>
          </div>
          <p className="text-sm md:text-xl text-white/90 font-medium max-w-3xl mx-auto leading-relaxed">
            Test your knowledge and compete with friends!
          </p>
        </div>

        {/* Scrolling Question Cards with Tilts */}
        <div className="mb-10 md:mb-12 h-auto ">
          <div className="flex gap-6 animate-scroll">
            {/* Duplicate array for seamless loop */}
            {[...sampleQuestions, ...sampleQuestions].map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 overflow-hidden w-64 sm:w-52 xs:w-40 bg-white rounded-2xl p-4 sm:p-5  transition-transform hover:scale-105"
                style={{ transform: `rotate(${item.tilt}deg)` }}
              >
                <div
                  className={`inline-block bg-gradient-to-r ${
                    item.color === "purple"
                      ? "from-purple-400 to-purple-500"
                      : item.color === "pink"
                      ? "from-pink-400 to-pink-500"
                      : item.color === "indigo"
                      ? "from-indigo-400 to-indigo-500"
                      : item.color === "blue"
                      ? "from-blue-400 to-blue-500"
                      : item.color === "green"
                      ? "from-green-400 to-green-500"
                      : "from-red-400 to-red-500"
                  } text-white text-xs font-bold px-2 py-1 rounded-full mb-3`}
                >
                  {item.category}
                </div>
                <p className="text-gray-800 font-semibold text-sm sm:text-base">
                  {item.question}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Game Setup Section */}
        <div className="max-w-4xl p-2 h-full mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl  p-4 md:p-6 mb-6">
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-8  rounded-2xl p-6">
              <div className="text-center">
                <Award className="w-7 h-7 mx-auto mb-2 text-purple-600" />
                <div className="text-sm md:text-2xl  font-black text-purple-900">
                  20+
                </div>
                <div className="text-[0.7rem] md:text-sm text-purple-700 font-semibold">
                  Categories
                </div>
              </div>
              <div className="text-center">
                <Sparkles className="w-7 h-7 mx-auto mb-2 text-pink-600" />
                <div className="text-sm md:text-2xl  font-black text-purple-900">
                  5000+
                </div>
                <div className="text-[0.7rem] md:text-sm text-purple-700 font-semibold">
                  Questions
                </div>
              </div>
              <div className="text-center">
                <Trophy className="w-7 h-7 mx-auto mb-2 text-amber-600" />
                <div className="text-sm md:text-2xl  font-black text-purple-900">
                  3
                </div>
                <div className="text-[0.7rem] md:text-sm text-purple-700 font-semibold">
                  Levels
                </div>
              </div>
            </div>

            {/* Play Button */}
            <div className="flex justify-center">
              <button
                onClick={handlePlayClick}
                className="bg-pink-600 cursor-pointer text-white font-bold py-5 px-12 rounded-full text-xl  transform transition-all duration-200 hover:bg-pink-800 flex items-center justify-center gap-3 "
              >
                <Play className="w-6 h-6 fill-white" />
                Play Now!
              </button>
            </div>

            <Footer />
          </div>
        </div>
      </div>

      {/* Setup Modal */}
      {showSetupModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl  max-w-lg w-full p-8 relative">
            <button
              onClick={() => setShowSetupModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div className="bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                Setup Your Game
              </h3>
              <p className="text-gray-600">Choose your preferences to begin</p>
            </div>

            <div className="space-y-5 mb-6">
              {/* Category Selection */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"
                >
                  <Target className="w-4 h-4 text-purple-600" />
                  Pick Your Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.currentTarget.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-purple-300 transition-colors"
                >
                  <option value="" className="text-gray-800">
                    Select a category...
                  </option>
                  {fetchCategories ? (
                    fetchCategories.map((cat) => (
                      <option
                        value={cat.id}
                        key={cat.id}
                        className="text-gray-800"
                      >
                        {cat.name}
                      </option>
                    ))
                  ) : (
                    <option className="text-gray-800">Loading...</option>
                  )}
                </select>
              </div>

              {/* Difficulty Selection */}
              <div>
                <label
                  htmlFor="difficulty"
                  className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"
                >
                  <Clock className="w-4 h-4 text-purple-600" />
                  Select Difficulty
                </label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.currentTarget.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-purple-300 transition-colors"
                >
                  <option value="" className="text-gray-800">
                    Choose difficulty...
                  </option>
                  <option value="easy" className="text-gray-800">
                    Easy - 60s per question
                  </option>
                  <option value="medium" className="text-gray-800">
                    Medium - 30s per question
                  </option>
                  <option value="hard" className="text-gray-800">
                    Hard - 15s per question
                  </option>
                </select>
              </div>
            </div>

            <button
              onClick={submit}
              className="w-full bg-pink-600 hover:bgpurple-900 text-white font-bold py-4 px-6 rounded-xl cursor-pointer hover:bg-pink-700 text-lg transition-all duration-200  flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-white" />
              Start Quiz
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl  max-w-md w-full p-8">
            <div className="text-center">
              <div className="bg-red-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Missing Information!
              </h3>
              <p className="text-gray-600 mb-6 text-base">
                Please select both a category and difficulty level to continue.
              </p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="bg-purple-700 hover:purple-900 text-white font-bold py-3 px-8 rounded-full transition-all duration-200 text-base"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
