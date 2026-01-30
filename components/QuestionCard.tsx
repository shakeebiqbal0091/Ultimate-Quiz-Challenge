import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  selectedOption: string | null;
  isAnswered: boolean;
  onSelectOption: (option: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  selectedOption, 
  isAnswered, 
  onSelectOption 
}) => {
  
  const getOptionStyles = (option: string) => {
    const base = "w-full p-4 text-left border-2 rounded-xl transition-all duration-200 font-medium text-lg relative overflow-hidden";
    
    if (!isAnswered) {
      return selectedOption === option
        ? `${base} border-indigo-600 bg-indigo-50 text-indigo-700`
        : `${base} border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700`;
    }

    if (option === question.correctAnswer) {
      return `${base} border-green-500 bg-green-50 text-green-700`;
    }

    if (selectedOption === option && option !== question.correctAnswer) {
      return `${base} border-red-500 bg-red-50 text-red-700`;
    }

    return `${base} border-slate-200 opacity-50 text-slate-500`;
  };

  const getOptionIcon = (option: string) => {
    if (!isAnswered) return null;
    if (option === question.correctAnswer) return <CheckIcon />;
    if (selectedOption === option && option !== question.correctAnswer) return <XIcon />;
    return null;
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 p-8 space-y-8 animate-fade-in-up">
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
          {question.question}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !isAnswered && onSelectOption(option)}
            disabled={isAnswered}
            className={getOptionStyles(option)}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-3">
                <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold border ${
                  isAnswered && option === question.correctAnswer 
                    ? 'border-green-200 bg-green-200 text-green-800'
                    : isAnswered && selectedOption === option && option !== question.correctAnswer
                    ? 'border-red-200 bg-red-200 text-red-800'
                    : 'border-slate-200 bg-slate-100 text-slate-500'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </span>
              {getOptionIcon(option)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const CheckIcon = () => (
  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon = () => (
  <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
