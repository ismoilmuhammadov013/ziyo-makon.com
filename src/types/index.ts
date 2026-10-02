export type ActiveTab = 'overview' | 'schedule' | 'simulators' | 'quizzes' | 'formulas' | 'pomodoro' | 'calculators';

export interface TaskItem {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  completed: boolean;
  priority: 'yuqori' | 'orta' | 'past';
  notes?: string;
}

export interface ScheduleDay {
  day: string;
  lessons: {
    id: string;
    subject: string;
    time: string;
    room: string;
    teacher: string;
  }[];
}

export interface ChemicalElement {
  number: number;
  symbol: string;
  name: string;
  mass: number;
  category: 'metall' | 'nometall' | 'inert' | 'ishqoriy' | 'ishqoriy-yer' | 'galogen' | 'yarim-metall' | 'otish';
  group: number;
  period: number;
  summary: string;
  electronConfig: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SubjectQuiz {
  id: string;
  title: string;
  iconName: string;
  description: string;
  difficulty: 'Oson' | "O'rta" | 'Murakkab';
  questions: QuizQuestion[];
}

export interface FormulaItem {
  id: string;
  subject: 'Matematika' | 'Fizika' | 'Geometriya' | 'Kimyo';
  category: string;
  title: string;
  formula: string;
  variables: string;
  example: string;
}

export interface Flashcard {
  id: string;
  word: string;
  transcription: string;
  translation: string;
  partOfSpeech: string;
  example: string;
  exampleUz: string;
}
