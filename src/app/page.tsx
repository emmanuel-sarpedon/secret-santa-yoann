import { generateQuestions } from "@/services";
import QuestionsCarousel from "@/app/components/QuestionsCarousel";

export default async function Home() {
  const questions = await generateQuestions({ difficulty: "hard" });

  if (!questions.length) return null;

  return (
    <main className="max-w-xs h-screen mx-auto py-12">
      <QuestionsCarousel questions={questions}></QuestionsCarousel>
    </main>
  );
}
