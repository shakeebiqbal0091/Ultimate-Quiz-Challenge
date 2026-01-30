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
  },
  {
    id: 6,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean"
  },
  {
    id: 7,
    question: "Which element is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    correctAnswer: "Diamond"
  },
  {
    id: 8,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
    correctAnswer: "Leonardo da Vinci"
  },
  {
    id: 9,
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mars", "Mercury", "Earth"],
    correctAnswer: "Mercury"
  },
  {
    id: 10,
    question: "What is the currency of Japan?",
    options: ["Yuan", "Won", "Yen", "Dollar"],
    correctAnswer: "Yen"
  },
  {
    id: 11,
    question: "Who was the first person to walk on the Moon?",
    options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Michael Collins"],
    correctAnswer: "Neil Armstrong"
  },
  {
    id: 12,
    question: "What does H2O stand for?",
    options: ["Hydrogen Peroxide", "Water", "Helium Oxide", "Hydrochloric Acid"],
    correctAnswer: "Water"
  },
  {
    id: 13,
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
    correctAnswer: "Blue Whale"
  },
  {
    id: 14,
    question: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7"
  },
  {
    id: 15,
    question: "Who is often credited with inventing the light bulb?",
    options: ["Nikola Tesla", "Thomas Edison", "Alexander Graham Bell", "Isaac Newton"],
    correctAnswer: "Thomas Edison"
  },
  {
    id: 16,
    question: "What is the tallest mountain in the world?",
    options: ["K2", "Mount Kilimanjaro", "Mount Everest", "Mount Fuji"],
    correctAnswer: "Mount Everest"
  },
  {
    id: 17,
    question: "What do herbivores primarily eat?",
    options: ["Meat", "Plants", "Insects", "Fish"],
    correctAnswer: "Plants"
  },
  {
    id: 18,
    question: "At what temperature (Celsius) does water freeze?",
    options: ["0°C", "10°C", "32°C", "100°C"],
    correctAnswer: "0°C"
  },
  {
    id: 19,
    question: "Which fictional city does Batman protect?",
    options: ["Metropolis", "Gotham City", "Star City", "Central City"],
    correctAnswer: "Gotham City"
  },
  {
    id: 20,
    question: "What is the fastest land animal?",
    options: ["Lion", "Gazelle", "Cheetah", "Horse"],
    correctAnswer: "Cheetah"
  }
];

export const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard", "Expert"];