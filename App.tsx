import React, { useState, useEffect } from 'react';
import { DEFAULT_QUESTIONS, DIFFICULTY_LEVELS } from './constants';
import { Question, QuizState } from './types';
import { generateQuizQuestions } from './services/geminiService';
import { QuestionCard } from './components/QuestionCard';
import { ProgressBar } from './components/ProgressBar';
import { Button } from './components/Button';

// Icons
import { Trophy, Zap, AlertCircle, Sparkles, Brain, ArrowRight, RotateCcw } from 'lucide-react';

export default function App() {
  const [quizState, setQuizState] = useState<QuizState>('MENU');
  const [questions, setQuestions] = useState<Question[]>(DEFAULT_QUESTIONS);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  // AI Generation State
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState(DIFFICULTY_LEVELS[1]);

  const handleStartDefault = () => {
    setQuestions(DEFAULT_QUESTIONS);
    resetQuiz();
  };

  const handleGenerateQuiz = async () => {
    if (!topic.trim()) {
      setErrorMsg("Please enter a topic.");
      return;
    }
    setQuizState('LOADING');
    setErrorMsg('');
    try {
      const newQuestions = await generateQuizQuestions(topic, difficulty);
      if (newQuestions.length === 0) throw new Error("No questions generated.");
      setQuestions(newQuestions);
      resetQuiz();
    } catch (err) {
      setQuizState('ERROR');
      setErrorMsg("Failed to generate quiz. Check API Key or try again.");
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setQuizState('PLAYING');
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsAnswered(true);
    if (option === questions[currentQuestionIndex].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizState('FINISHED');
    }
  };

  // --- RENDER HELPERS ---

  const renderMenu = () => (
    <div className="max-w-4xl mx-auto w-full px-4 animate-fade-in">
      <div className="text-center mb-12 space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-2xl mb-4">
          <Brain className="w-12 h-12 text-indigo-600" />
        </div>
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">Ultimate Quiz Challenge</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Test your knowledge with our curated questions or use AI to generate a custom quiz on any topic you can imagine.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Default Quiz Card */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center group">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Zap className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-3">Quick Start</h3>
          <p className="text-slate-500 mb-8 flex-grow">Jump right in with our classic general knowledge questions.</p>
          <Button onClick={handleStartDefault} fullWidth>
            Play Classic Mode
          </Button>
        </div>

        {/* AI Quiz Card */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 bg-gradient-to-bl from-teal-400/20 to-transparent w-24 h-24 rounded-bl-full" />
          <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Sparkles className="w-8 h-8 text-teal-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-3">AI Generator</h3>
          <p className="text-slate-500 mb-6">Create a unique quiz on any topic powered by Gemini.</p>
          
          <div className="w-full space-y-4">
            <input
              type="text"
              placeholder="Enter topic (e.g., 'React JS', 'Space')"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
            />
            <div className="grid grid-cols-2 gap-2">
              {DIFFICULTY_LEVELS.map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`px-2 py-2 text-sm rounded-lg font-medium transition-colors ${
                    difficulty === level 
                      ? 'bg-teal-100 text-teal-700 ring-2 ring-teal-500 ring-offset-2' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
            <Button onClick={handleGenerateQuiz} variant="secondary" fullWidth disabled={!topic}>
              Generate & Play
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlaying = () => (
    <div className="max-w-3xl mx-auto w-full px-4">
      <div className="mb-8 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-slate-200 sticky top-4 z-10">
        <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
      </div>

      <QuestionCard
        question={questions[currentQuestionIndex]}
        selectedOption={selectedOption}
        isAnswered={isAnswered}
        onSelectOption={handleOptionSelect}
      />

      <div className="mt-8 flex justify-end">
        <Button 
          onClick={handleNext} 
          disabled={!isAnswered}
          className="flex items-center gap-2"
        >
          {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );

  const renderFinished = () => {
    const percentage = Math.round((score / questions.length) * 100);
    let message = "Good effort!";
    if (percentage >= 80) message = "Outstanding!";
    else if (percentage >= 60) message = "Well done!";
    else if (percentage < 40) message = "Keep practicing!";

    return (
      <div className="max-w-md mx-auto w-full px-4 text-center animate-fade-in-up">
        <div className="bg-white p-10 rounded-3xl shadow-2xl border border-slate-100">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-yellow-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-slate-800 mb-2">{message}</h2>
          <p className="text-slate-500 mb-8">You completed the quiz successfully.</p>
          
          <div className="bg-slate-50 rounded-2xl p-6 mb-8">
            <div className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-2">Your Score</div>
            <div className="text-5xl font-black text-indigo-600 mb-2">
              {score} <span className="text-2xl text-slate-400 font-medium">/ {questions.length}</span>
            </div>
            <div className="text-sm font-medium text-slate-600 bg-slate-200 inline-block px-3 py-1 rounded-full">
              {percentage}% Accuracy
            </div>
          </div>

          <div className="space-y-3">
            <Button onClick={() => setQuizState('MENU')} fullWidth variant="outline" className="flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" /> Try Another Quiz
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-teal-500 rounded-full border-t-transparent animate-spin"></div>
        <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-teal-500 animate-pulse" />
      </div>
      <p className="text-xl font-medium text-slate-600 animate-pulse">Generating your quiz...</p>
    </div>
  );

  const renderError = () => (
    <div className="max-w-md mx-auto w-full px-4 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-red-500">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-800 mb-2">Oops! Something went wrong</h3>
        <p className="text-slate-600 mb-6">{errorMsg || "An unexpected error occurred."}</p>
        <Button onClick={() => setQuizState('MENU')} variant="secondary">
          Return to Menu
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12">
      {quizState === 'MENU' && renderMenu()}
      {quizState === 'LOADING' && renderLoading()}
      {quizState === 'PLAYING' && renderPlaying()}
      {quizState === 'FINISHED' && renderFinished()}
      {quizState === 'ERROR' && renderError()}
    </div>
  );
}
