import React from "react";
import { Brain } from "lucide-react";
const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex items-center justify-center">
      <div className="text-center">
        <Brain className="w-16 h-16 text-white mx-auto mb-4 animate-pulse" />
        <p className="text-white text-xl font-semibold">Loading questions...</p>
      </div>
    </div>
  );
};

export default Loading;
