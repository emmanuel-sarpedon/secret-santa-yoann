"use server";

import { shuffle } from "@/lib/utils";

export async function generateQuestions({
  difficulty,
}: {
  difficulty: "easy" | "medium" | "hard";
}): Promise<Question[]> {
  const url = new URL("https://opentdb.com/api.php");
  url.searchParams.set("amount", "10");
  url.searchParams.set("type", "multiple");
  url.searchParams.set("difficulty", difficulty);

  const questions = await fetch(url)
    .then((res) => res.json())
    .then(({ results }) => results as Omit<Question, "answers">[]);

  return questions.map(
    ({ incorrect_answers, correct_answer, ...rest }): Question => {
      return {
        answers: shuffle([...incorrect_answers, correct_answer]),
        correct_answer,
        incorrect_answers,
        ...rest,
      };
    },
  );
}
