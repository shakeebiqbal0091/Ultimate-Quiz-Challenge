import { Question } from './types';

export const DEFAULT_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris"
  },
  {
    id: 2,
    question: "Which programming language is known as the 'language of the web'?",
    options: ["Python", "Java", "JavaScript", "C++"],
    correctAnswer: "JavaScript"
  },
  {
    id: 3,
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
    correctAnswer: "William Shakespeare"
  },
  {
    id: 4,
    question: "What is the chemical symbol for Gold?",
    options: ["Au", "Ag", "Fe", "Pb"],
    correctAnswer: "Au"
  },
  {
    id: 5,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  }
];

export const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard", "Expert"];
