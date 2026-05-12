import type { Tryout, Test, Subtest, Question, Attempt } from "@/types";

const banners = [
  "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&q=80",
  "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=80",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80",
];

const categories = ["UTBK", "TOEFL", "SAT", "GRE", "Programming", "Mathematics"];

export const mockTryouts: Tryout[] = Array.from({ length: 24 }, (_, i) => ({
  id: `tryout-${i + 1}`,
  title: [
    "UTBK SNBT 2026 Series",
    "Advanced Mathematics Challenge",
    "TOEFL iBT Full Simulation",
    "SAT Practice Test",
    "JavaScript Mastery",
    "Data Structures & Algorithms",
    "GRE Verbal Reasoning",
    "Indonesian History Quiz",
  ][i % 8] + ` Vol. ${Math.floor(i / 8) + 1}`,
  description: "A comprehensive simulation designed to mirror the real exam environment.",
  banner: banners[i % banners.length],
  category: categories[i % categories.length],
  published: i % 3 !== 0,
  participants: Math.floor(Math.random() * 5000) + 100,
  duration: [60, 90, 120, 180][i % 4],
  createdAt: new Date(Date.now() - i * 86400000 * 2).toISOString(),
}));

export const mockTests: Test[] = mockTryouts.slice(0, 6).flatMap((t, i) =>
  Array.from({ length: 3 }, (_, j) => ({
    id: `test-${i}-${j}`,
    tryoutId: t.id,
    title: `${t.title} — Part ${j + 1}`,
    order: j,
    subtestCount: 3 + (j % 2),
  }))
);

export const mockSubtests: Subtest[] = Array.from({ length: 8 }, (_, i) => ({
  id: `subtest-${i}`,
  testId: mockTests[0].id,
  title: ["Reading Comprehension", "Quantitative Reasoning", "Logical Thinking", "English Grammar", "Vocabulary", "Critical Reasoning", "Data Analysis", "Writing"][i],
  duration: [25, 30, 35, 20, 15, 40, 30, 45][i],
  questions: [20, 25, 18, 30, 40, 22, 16, 5][i],
  active: i % 4 !== 0,
  order: i,
  instructions: "Read each question carefully and select the best answer. You may not return to previous sections.",
}));

export const mockQuestions: Question[] = Array.from({ length: 36 }, (_, i) => ({
  id: `q-${i}`,
  subtestId: mockSubtests[i % mockSubtests.length].id,
  prompt: [
    "What is the derivative of f(x) = 3x² + 2x − 5?",
    "Which option best describes the main idea of the passage?",
    "Solve for x: 2x + 7 = 19",
    "Identify the grammatical error in the sentence below.",
    "If the area of a square is 144 cm², what is its perimeter?",
    "Choose the synonym of 'ephemeral'.",
  ][i % 6],
  type: (["text", "image", "mixed", "math"] as const)[i % 4],
  image: i % 4 === 1 || i % 4 === 2 ? `https://images.unsplash.com/photo-${["1635070041078-e363dbe005cb", "1509228468518-180dd4864904", "1581291518857-4e27b48ff24e"][i % 3]}?w=600&q=80` : undefined,
  options: ["A", "B", "C", "D"].map((l, k) => ({
    id: `opt-${i}-${k}`,
    text: `Option ${l} — ${["lorem ipsum", "dolor sit amet", "consectetur adipiscing", "sed do eiusmod"][k]}`,
  })),
  correctOptionId: `opt-${i}-${i % 4}`,
  difficulty: (["easy", "medium", "hard"] as const)[i % 3],
}));

const names = ["Aisha Putri", "Budi Santoso", "Citra Lestari", "Dimas Pratama", "Eka Wijaya", "Farah Azzahra", "Gita Wulandari", "Hanif Rahman", "Indra Kusuma", "Joko Susilo"];
export const mockAttempts: Attempt[] = Array.from({ length: 18 }, (_, i) => ({
  id: `att-${i}`,
  user: {
    name: names[i % names.length],
    email: `${names[i % names.length].toLowerCase().replace(" ", ".")}@mail.com`,
  },
  tryout: mockTryouts[i % mockTryouts.length].title,
  status: (["in_progress", "completed", "submitted", "abandoned"] as const)[i % 4],
  progress: Math.floor(Math.random() * 100),
  remaining: Math.floor(Math.random() * 3600),
  activeSubtest: mockSubtests[i % mockSubtests.length].title,
  score: i % 4 === 1 ? Math.floor(Math.random() * 400) + 400 : undefined,
  startedAt: new Date(Date.now() - i * 3600000).toISOString(),
}));

export const stats = {
  totalTryouts: mockTryouts.length,
  totalUsers: 12480,
  totalQuestions: 3420,
  totalAttempts: 8765,
};

export const chartData = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
  attempts: 400 + Math.floor(Math.random() * 800),
  users: 200 + Math.floor(Math.random() * 500),
  completed: 300 + Math.floor(Math.random() * 600),
}));

export const categoryData = categories.map((c) => ({
  name: c,
  value: Math.floor(Math.random() * 500) + 100,
}));

export const recentActivity = [
  { id: 1, user: "Aisha Putri", action: "completed", target: "UTBK SNBT 2026 Series Vol. 1", time: "2m ago" },
  { id: 2, user: "Budi Santoso", action: "started", target: "TOEFL iBT Full Simulation", time: "5m ago" },
  { id: 3, user: "Admin", action: "published", target: "SAT Practice Test", time: "12m ago" },
  { id: 4, user: "Citra Lestari", action: "submitted", target: "Advanced Mathematics", time: "18m ago" },
  { id: 5, user: "Admin", action: "created question for", target: "JavaScript Mastery", time: "25m ago" },
  { id: 6, user: "Eka Wijaya", action: "completed", target: "GRE Verbal Reasoning", time: "1h ago" },
];

export const rankings = names.slice(0, 8).map((name, i) => ({
  rank: i + 1,
  name,
  score: 980 - i * 23 - Math.floor(Math.random() * 10),
  tryouts: 12 - i,
}));
