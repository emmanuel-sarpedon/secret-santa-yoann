"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { type CarouselApi } from "@/components/ui/carousel";
import { useCallback, useState } from "react";
import { Badge } from "@/components/ui/badge";
import results from "@/constants/results";

export default function QuestionsCarousel({
  questions,
}: {
  questions: Question[];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [userAnswers, setUserAnswers] = useState<
    Array<{ question: string; answer: string | null }>
  >(questions.map(({ question }) => ({ question, answer: null })));
  const [result, setResult] = useState("");

  const getResults = useCallback((): void => {
    let goodAnswers = 0;
    userAnswers.forEach(({ answer }, index) => {
      if (answer === questions[index].correct_answer) goodAnswers++;
    });
    const result = results[goodAnswers as any][0];
    setResult(result);
  }, [questions, userAnswers]);

  return (
    <div>
      <Carousel className={"w-full max-w-xs"} setApi={setApi}>
        <CarouselContent>
          {questions.map(({ category, question, answers }, index) => {
            return (
              <CarouselItem key={index} className={"flex flex-col gap-y-6"}>
                <p className="text-sm font-semibold">
                  Question {index + 1} / 10
                </p>
                <Badge
                  className={"self-start"}
                  dangerouslySetInnerHTML={{ __html: category }}
                ></Badge>
                <p
                  dangerouslySetInnerHTML={{ __html: question }}
                  className="text-sm font-semibold"
                ></p>
                <RadioGroup
                  onValueChange={(e) => {
                    setUserAnswers((prevState) => {
                      const arr = [...prevState];
                      arr[index].answer = e;
                      return arr;
                    });
                  }}
                >
                  {answers.map((answer) => {
                    return (
                      <div key={answer} className="flex items-center space-x-2">
                        <RadioGroupItem value={answer} id={answer} />
                        <Label
                          htmlFor={answer}
                          dangerouslySetInnerHTML={{ __html: answer }}
                        ></Label>
                      </div>
                    );
                  })}
                </RadioGroup>

                <Button
                  onClick={() => {
                    if (api?.canScrollNext()) api?.scrollNext();
                    else getResults();
                  }}
                  disabled={!userAnswers[index].answer}
                >
                  Valider
                </Button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
      </Carousel>
      <p>{result}</p>
    </div>
  );
}
