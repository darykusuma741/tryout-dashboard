export type Tryout = {
  id: string;
  title: string;
  description: string;
  banner: string;
  category: string;
  published: boolean;
  participants: number;
  duration: number;
  createdAt: string;
};

export type Test = {
  id: string;
  tryoutId: string;
  title: string;
  order: number;
  subtestCount: number;
};

export type Subtest = {
  id: string;
  testId: string;
  title: string;
  duration: number;
  questions: number;
  active: boolean;
  order: number;
  instructions: string;
};

export type Question = {
  id: string;
  subtestId: string;
  prompt: string;
  type: "text" | "image" | "mixed" | "math";
  image?: string;
  options: { id: string; text: string; image?: string }[];
  correctOptionId: string;
  difficulty: "easy" | "medium" | "hard";
};

export type Attempt = {
  id: string;
  user: { name: string; email: string; avatar?: string };
  tryout: string;
  status: "in_progress" | "completed" | "submitted" | "abandoned";
  progress: number;
  remaining: number;
  activeSubtest: string;
  score?: number;
  startedAt: string;
};
