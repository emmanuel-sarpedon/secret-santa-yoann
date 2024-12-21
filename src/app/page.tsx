"use client";

import { cn, getAllDays } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import quotes from "@/constants/quotes";
import { Separator } from "@/components/ui/separator";
import isToday from "dayjs/plugin/isToday";
import confetti from "canvas-confetti";
import dayjs, { Dayjs } from "dayjs";
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dayjs/locale/fr");
dayjs.extend(isToday);

export default function Home() {
  const days = getAllDays();
  const [quote, setQuote] = useState<{ quote: string; author?: string } | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  useEffect(() => {
    if (typeof index !== "number") return;
    setQuote(quotes[index]);
  }, [index]);

  useEffect(() => {
    setCurrentDate(dayjs());
  }, []);

  const isChristmas = (day: Dayjs) => {
    return day.get("date") === 25 && day.get("month") === 11 && day.get("year") === 2024;
  };

  return (
    <main className="max-w-xs lg:max-w-xl mx-auto py-12">
      <p className={"text-lg font-semibold mt-6 mb-12"}>Chaque jour, découvre une citation motivante pour commencer ta journée avec énergie et positivité ! 😌</p>
      <div className={"grid grid-cols-4 lg:grid-cols-6 gap-6"}>
        {days.map((day, index) => (
          <Dialog key={day.toString()}>
            <DialogTrigger asChild>
              <Button
                disabled={day.isAfter(currentDate)}
                onClick={() => {
                  if (dayjs(day).isToday()) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                  setIndex(index);
                }}
                variant={dayjs(day).isToday() ? "default" : "outline"}
                className={cn("relative", { "bg-red-500 text-white": day.isBefore(dayjs()) })}
              >
                {index + 1}
                {<p className={cn("absolute -top-4", { hidden: !isChristmas(day) })}>🎄</p>}
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogTitle>{day.locale("fr").format("DD MMMM YYYY")}</DialogTitle>
              <DialogDescription></DialogDescription>

              <blockquote>
                « {quote?.quote} »<strong className={"pt-2 block"}>{quote?.author}</strong>
              </blockquote>

              <Separator />

              {isChristmas(day) ? (
                <div className={"p-2 rounded-lg text-base"}>
                  <p>{"Hey ! 🎅 Joyeux Noël! 🥳 J'ai un petit cadeau pour toi. Il y a une page cachée, quelque part. Pour y accéder tu dois répondre à ces questions :"}</p>

                  <ul className={"font-semibold py-4"}>
                    <li>1. Quelle est mon année de naissance ?</li>
                    <li>2. Combien de lettres compose mon deuxième prénom ?</li>
                    <li>{"3. En quelle année j'ai commencé chez App'Ines !"}</li>
                  </ul>

                  <p>{"Additionne les 3 réponses et convertit en base64 ! Et voilà, tu as l'URL de la page cachée 😉"}</p>
                </div>
              ) : null}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </main>
  );
}
