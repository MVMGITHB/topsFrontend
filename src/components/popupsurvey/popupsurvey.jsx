"use client";
import { useEffect, useState } from "react";
import { X, ArrowLeft } from "lucide-react";

const steps = [
  {
    question: "Which categories are you most interested in?",
    options: [
      "Tech Innovations",
      "Sports Highlights",
      "Cinematic Shorts",
      "Creative Ads",
    ],
    icon: "🎯",
  },
  {
    question: "What's your email to get personalized content?",
    input: true,
    icon: "📧",
  },
];

export default function SurveyPopup() {
  const [visible, setVisible] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 10000);
    const closeTimer = setTimeout(() => setShowClose(true), 13000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  const handleAnswer = (answer) => {
    const updated = [...answers];
    updated[step] = answer;
    setAnswers(updated);

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit(updated);
    }
  };

  const handleSubmit = (updatedAnswers) => {
    const finalAnswers = [...updatedAnswers];
    finalAnswers[1] = email;
    console.log("Survey Results:", finalAnswers);
    setVisible(false);
    // Save logic here (localStorage, API call, etc.)
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl relative animate-fadeIn">
        {showClose && (
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
            onClick={() => setVisible(false)}
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {step > 0 && (
          <button
            className="absolute top-4 left-4 text-gray-500 hover:text-gray-800 transition"
            onClick={() => setStep(step - 1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        <div className="text-center space-y-6">
          <div className="text-5xl">{steps[step].icon}</div>
          <h2 className="text-xl font-semibold text-gray-800">
            {steps[step].question}
          </h2>

          {steps[step].input ? (
            <div className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                onClick={() => handleAnswer(email)}
                disabled={!email}
              >
                Submit
              </button>
            </div>
          ) : (
            <div className="grid gap-3">
              {steps[step].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className="w-full bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-lg hover:bg-blue-200 transition"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          <div className="mt-6">
            <p className="text-xs text-gray-500">
              Step {step + 1} of {steps.length}
            </p>
            <div className="h-1 w-full bg-gray-200 rounded-full mt-1">
              <div
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
