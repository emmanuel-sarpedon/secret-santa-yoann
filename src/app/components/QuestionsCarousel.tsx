"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious } from "@/components/ui/carousel";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { type CarouselApi } from "@/components/ui/carousel";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import results from "@/constants/results";
import { cn, shuffle } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { generateQuestions } from "@/services";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function QuestionsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Array<{ question: string; answer: string | null }>>(questions.map(({ question }) => ({ question, answer: null })));
  const [showAnswers, setShowAnswers] = useState(false);
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    generateQuestions({ difficulty: "medium" }).then((res) => {
      setQuestions(res);
      setUserAnswers(res.map(({ question }) => ({ question, answer: null })));
    });
  }, []);

  const result = useMemo(() => {
    switch (numberOfCorrectAnswers) {
      case 0:
        return shuffle(results["0"]).at(0) || "";

      case 1:
        return shuffle(results["1"]).at(0) || "";

      case 2:
        return shuffle(results["2"]).at(0) || "";

      case 3:
        return shuffle(results["3"]).at(0) || "";

      case 4:
        return shuffle(results["4"]).at(0) || "";

      case 5:
        return shuffle(results["5"]).at(0) || "";

      case 6:
        return shuffle(results["6"]).at(0) || "";

      case 7:
        return shuffle(results["7"]).at(0) || "";

      case 8:
        return shuffle(results["8"]).at(0) || "";

      case 9:
        return shuffle(results["9"]).at(0) || "";

      case 10:
        return shuffle(results["10"]).at(0) || "";
    }
  }, [numberOfCorrectAnswers]);

  const getResults: () => void = useCallback((): void => {
    setNumberOfCorrectAnswers(0);

    userAnswers.forEach(({ answer }, index) => {
      if (answer === questions[index].correct_answer) setNumberOfCorrectAnswers((prevState) => prevState + 1);
    });

    setDialogOpen(true);
    setShowAnswers(true);
  }, [questions, userAnswers]);

  return (
    <div>
      <p className={"mb-10 font-semibold max-w-xs mx-auto"}>Apparemment, tu aimes bien les quizz. Je te propose de continuer sur cette lancée !</p>
      <Carousel className={"max-w-xs mx-auto"} setApi={setApi}>
        <Button className={"mb-4"} variant={"ghost"} asChild>
          <Link href="/">
            <ArrowLeft />
            Retour
          </Link>
        </Button>
        <CarouselContent>
          {questions.map(({ category, question, answers }, index) => {
            return (
              <CarouselItem key={index} className={"flex flex-col gap-y-6"}>
                <p className="text-sm font-semibold">Question {index + 1} / 10</p>
                <Badge className={"self-start bg-green-700 text-white"} dangerouslySetInnerHTML={{ __html: category }}></Badge>
                <p dangerouslySetInnerHTML={{ __html: question }} className="text-sm font-semibold"></p>
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
                        <Label htmlFor={answer} dangerouslySetInnerHTML={{ __html: answer }}></Label>
                      </div>
                    );
                  })}
                </RadioGroup>

                <Button
                  onClick={() => {
                    if (api?.canScrollNext()) api?.scrollNext();
                    else getResults();
                  }}
                  className={"bg-green-700"}
                  disabled={!userAnswers[index].answer}
                >
                  {"Valider"}
                </Button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
      </Carousel>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Ton score : {numberOfCorrectAnswers} / {questions.length}...
            </DialogTitle>

            <DialogDescription></DialogDescription>

            <p>{result}</p>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {showAnswers ? (
        <>
          <Button className={"mx-auto block mb-10"} variant={"secondary"} onClick={() => window.location.reload()}>
            Recommencer !
          </Button>
          <table className={"max-w-2xl mx-auto text-sm "}>
            <thead>
              <tr>
                <th className="font-semibold">Questions</th>
                <th className="font-semibold"></th>
                <th className="font-semibold">Bonne réponse</th>
              </tr>
            </thead>
            <tbody>
              {userAnswers.map(({ question, answer }, i) => (
                <tr key={i} className={cn("[&_td]:p-2 [&_td]:border", { "bg-green-700 text-white": answer === questions.at(i)?.correct_answer })}>
                  <td dangerouslySetInnerHTML={{ __html: question }} />
                  <td dangerouslySetInnerHTML={{ __html: answer || "" }} />
                  <td dangerouslySetInnerHTML={{ __html: questions.at(i)?.correct_answer || "" }} />
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}
    </div>
  );
}
