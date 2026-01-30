export interface Question {
  id: number | string;
  question: string;
  options: string[]; // Array of 4 strings
  correctAnswer: string; // The correct string value
}

export type QuizState = 'MENU' | 'LOADING' | 'PLAYING' | 'FINISHED' | 'ERROR';

export interface QuizSettings {
  topic: string;
  difficulty: string;
}
