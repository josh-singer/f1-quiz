"use client";

import { useState } from "react";
import Image from "next/image";
import { QUESTIONS } from "@/lib/drivers";

type State = "intro" | "quiz" | "loading" | "result";

interface Result {
  driverName: string;
  driverId: string;
  team: string;
  bio: string;
  photo: string | null;
  colors: { primary: string; secondary: string; text: string };
}

export default function Home() {
  const [state, setState] = useState<State>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(8).fill(""));
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setState("quiz");
    setCurrentQ(0);
    setAnswers(Array(8).fill(""));
    setCurrentAnswer("");
    setResult(null);
    setError(null);
  };

  const handleNext = () => {
    const updated = [...answers];
    updated[currentQ] = currentAnswer;
    setAnswers(updated);
    setCurrentAnswer("");

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      submitAnswers(updated);
    }
  };

  const submitAnswers = async (finalAnswers: string[]) => {
    setState("loading");
    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: finalAnswers }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setResult(data);
      setState("result");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setState("quiz");
      setCurrentQ(QUESTIONS.length - 1);
    }
  };

  const bgStyle =
    state === "result" && result
      ? { backgroundColor: result.colors.primary, transition: "background-color 1.2s ease" }
      : { backgroundColor: "#0a0a14", transition: "background-color 1.2s ease" };

  const accentColor = result?.colors.secondary ?? "#3b82f6";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={bgStyle}
    >
      {/* INTRO */}
      {state === "intro" && (
        <div className="text-center max-w-xl">
          <p className="text-6xl mb-5">🏎️</p>
          <h1 className="text-5xl font-black text-white mb-4 tracking-tight leading-tight">
            Which F1 Driver<br />Are You?
          </h1>
          <p className="text-gray-400 text-lg mb-10">
            8 questions. One driver. Zero mercy.
          </p>
          <button
            onClick={handleStart}
            className="bg-white text-black font-bold text-lg px-10 py-4 rounded-full hover:bg-gray-100 active:scale-95 transition-all"
          >
            Find My Driver
          </button>
        </div>
      )}

      {/* QUIZ */}
      {state === "quiz" && (
        <div className="w-full max-w-xl">
          {/* Progress bar */}
          <div className="flex gap-1.5 mb-10">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className="h-1 flex-1 rounded-full transition-all duration-300"
                style={{ backgroundColor: i <= currentQ ? "#ffffff" : "#ffffff22" }}
              />
            ))}
          </div>

          <p className="text-gray-500 text-sm font-medium uppercase tracking-widest mb-4">
            Question {currentQ + 1} of {QUESTIONS.length}
          </p>

          <h2 className="text-white text-2xl font-bold leading-snug mb-8">
            {QUESTIONS[currentQ]}
          </h2>

          <textarea
            key={currentQ}
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.metaKey && currentAnswer.trim()) handleNext();
            }}
            placeholder="Type your answer..."
            rows={4}
            autoFocus
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/30 resize-none outline-none focus:border-white/30 transition-colors text-base"
          />

          {error && (
            <p className="text-red-400 text-sm mt-3">{error}</p>
          )}

          <div className="flex justify-between items-center mt-5">
            <button
              onClick={() => {
                if (currentQ > 0) {
                  setCurrentQ(currentQ - 1);
                  setCurrentAnswer(answers[currentQ - 1]);
                }
              }}
              className={`text-white/40 hover:text-white text-sm transition-colors ${currentQ === 0 ? "invisible" : ""}`}
            >
              ← Back
            </button>
            <button
              onClick={handleNext}
              disabled={!currentAnswer.trim()}
              className="bg-white text-black font-bold px-8 py-3 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 active:scale-95 transition-all"
            >
              {currentQ === QUESTIONS.length - 1 ? "Find My Driver 🏁" : "Next →"}
            </button>
          </div>
        </div>
      )}

      {/* LOADING */}
      {state === "loading" && (
        <div className="text-center">
          <div className="text-6xl mb-6 animate-bounce">🏎️</div>
          <p className="text-white text-xl font-semibold mb-2">Analysing your race data...</p>
          <p className="text-gray-400 text-sm">Consulting the stewards. This may hurt.</p>
        </div>
      )}

      {/* RESULT */}
      {state === "result" && result && (
        <div className="w-full max-w-xl text-center">
          <p className="text-white/60 text-sm font-medium uppercase tracking-widest mb-2">
            You are...
          </p>
          <h1 className="text-5xl font-black text-white mb-1 tracking-tight">
            {result.driverName}
          </h1>
          <p className="text-lg font-bold mb-8" style={{ color: accentColor }}>
            {result.team}
          </p>

          {result.photo && (
            <div className="flex justify-center mb-8">
              <div className="w-52 h-64 relative rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/20">
                <Image
                  src={result.photo}
                  alt={result.driverName}
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          )}

          <div className="bg-black/20 backdrop-blur rounded-2xl p-6 mb-8 text-left">
            <p className="text-white/90 text-base leading-relaxed">{result.bio}</p>
          </div>

          <button
            onClick={handleStart}
            className="bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-gray-100 active:scale-95 transition-all"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
