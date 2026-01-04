import React, { useEffect, useState } from "react";
import {
  Brain,
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  Sparkles,
  Home,
} from "lucide-react";
import Finished from "../components/Finished";
import Loading from "../components/Loading";
import Footerr from "../components/Footerr";
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Quiz = () => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState(null);
  const [finished, setFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const location = useLocation();
  const navigate = useNavigate();
  const { category, difficulty } = location.state || {};

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (loading || finished) return;

    setTimeLeft(getDifficultyTime());

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, finished, currentIndex]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleTimeout();
    }
  }, [timeLeft]);

  const getDifficultyTime = () => {
    if (difficulty === "easy") return 60;
    if (difficulty === "medium") return 30;
    if (difficulty === "hard") return 15;
    return 15;
  };

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
      );

      const data = await res.json();

      const formattedQuestions = data.results.map((q) => {
        const allAnswers = [...q.incorrect_answers, q.correct_answer];
        allAnswers.sort(() => Math.random() - 0.5);

        return { ...q, allAnswers };
      });

      setQuestions(formattedQuestions);
      setTimeLeft(getDifficultyTime());
      setLoading(false);
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  const handleTimeout = () => {
    if (showResult) return;

    setSelectedAnswer(null);
    setShowResult(true);

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
        setShowResult(false);
        setSelectedAnswer(null);
      } else {
        setFinished(true);
      }
    }, 1500);
  };

  const handleAnswerClick = (answer) => {
    if (showResult) return;

    const currentQuestion = questions[currentIndex];
    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === currentQuestion.correct_answer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
        setShowResult(false);
        setSelectedAnswer(null);
        setTimeLeft(getDifficultyTime());
      } else {
        setFinished(true);
      }
    }, 1500);
  };

  if (!category || !difficulty) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">No category or difficulty selected!</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <Loading></Loading>;
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <Finished
        percentage={percentage}
        questions={questions}
        score={score}
      ></Finished>
    );
  }
  if (!questions || questions.length === 0) {
    return null;
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screenn  bg-gradient-to-b from-purple-600 to-white text-white p-4 md:p-8">
      {/* Decorative Background */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Stats */}
        <div className="flex justify-between items-center mb-6 bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-300" />
            <span className="text-white font-bold text-lg">Trivia Quiz</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
              <Trophy className="w-5 h-5 text-yellow-300" />
              <span className="text-white font-bold">
                {score}/{questions.length}
              </span>
            </div>
            <div
              className={`flex items-center gap-2 rounded-full px-4 py-2 ${
                timeLeft <= 5 ? "bg-red-500/80 animate-pulse" : "bg-white/20"
              }`}
            >
              <Clock className="w-5 h-5 text-white" />
              <span className="text-white font-bold">{timeLeft}s</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 bg-white/10 rounded-full h-3 overflow-hidden border border-white/20">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-bold px-4 py-2 rounded-full">
              Question {currentIndex + 1} of {questions.length}
            </div>
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">
              {difficulty.toUpperCase()}
            </div>
          </div>

          <div className="mb-8">
            <h2
              className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
            />
          </div>

          {/* Answer Options */}
          <div className="grid gap-4">
            {currentQuestion.allAnswers.map((ans, idx) => {
              const isCorrect = ans === currentQuestion.correct_answer;
              const isSelected = ans === selectedAnswer;

              let bgColor = "bg-gray-50 hover:bg-purple-50 border-gray-200";
              let textColor = "text-gray-800";

              if (showResult && isCorrect) {
                bgColor = "bg-green-100 border-green-500";
                textColor = "text-green-800";
              } else if (showResult && isSelected && !isCorrect) {
                bgColor = "bg-red-100 border-red-500";
                textColor = "text-red-800";
              } else if (isSelected) {
                bgColor = "bg-purple-100 border-purple-500";
                textColor = "text-purple-800";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswerClick(ans)}
                  disabled={showResult}
                  className={`${bgColor} ${textColor} border-2 rounded-xl px-5 py-4 text-left transition-all duration-200 hover:scale-102 font-semibold text-base md:text-lg flex items-center justify-between group ${
                    showResult ? "cursor-not-allowed" : "hover:shadow-lg"
                  }`}
                >
                  <span dangerouslySetInnerHTML={{ __html: ans }} />
                  {showResult && isCorrect && (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Badge */}
        <div className="flex items-center justify-between gap-2 text-purple-700">
          <Footerr></Footerr>

          <span
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: currentQuestion.category }}
          />
        </div>
      </div>
    </div>
  );
};

export default Quiz;
