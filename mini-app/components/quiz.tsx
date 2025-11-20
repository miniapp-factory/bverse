"use client";

import { useState } from "react";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

type Animal = "cat" | "dog" | "fox" | "hamster" | "horse";

interface Question {
  text: string;
  options: { text: string; animal: Animal }[];
}

const questions: Question[] = [
  {
    text: "What’s your favorite type of activity?",
    options: [
      { text: "Chasing toys", animal: "cat" },
      { text: "Playing fetch", animal: "dog" },
      { text: "Exploring forests", animal: "fox" },
      { text: "Nibbling on seeds", animal: "hamster" },
      { text: "Racing across fields", animal: "horse" },
    ],
  },
  {
    text: "How do you prefer to spend a weekend?",
    options: [
      { text: "Lounging on a couch", animal: "cat" },
      { text: "Going for a long walk", animal: "dog" },
      { text: "Hiking in nature", animal: "fox" },
      { text: "Staying cozy at home", animal: "hamster" },
      { text: "Riding a bike or horse", animal: "horse" },
    ],
  },
  {
    text: "What’s your ideal snack?",
    options: [
      { text: "Fish flakes", animal: "cat" },
      { text: "Chicken treats", animal: "dog" },
      { text: "Berries", animal: "fox" },
      { text: "Seeds", animal: "hamster" },
      { text: "Fresh grass", animal: "horse" },
    ],
  },
  {
    text: "Which trait describes you best?",
    options: [
      { text: "Independent", animal: "cat" },
      { text: "Loyal", animal: "dog" },
      { text: "Curious", animal: "fox" },
      { text: "Energetic", animal: "hamster" },
      { text: "Strong", animal: "horse" },
    ],
  },
  {
    text: "What’s your favorite environment?",
    options: [
      { text: "A cozy room", animal: "cat" },
      { text: "A backyard", animal: "dog" },
      { text: "A forest", animal: "fox" },
      { text: "A small cage", animal: "hamster" },
      { text: "A pasture", animal: "horse" },
    ],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<Animal, number>>({
    cat: 0,
    dog: 0,
    fox: 0,
    hamster: 0,
    horse: 0,
  });
  const [result, setResult] = useState<Animal | null>(null);

  const handleAnswer = (animal: Animal) => {
    setScores((prev) => ({ ...prev, [animal]: prev[animal] + 1 }));
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const max = Math.max(...Object.values(scores));
      const winner = Object.entries(scores).find(
        ([, val]) => val === max
      )?.[0] as Animal;
      setResult(winner);
    }
  };

  const retake = () => {
    setCurrent(0);
    setScores({
      cat: 0,
      dog: 0,
      fox: 0,
      hamster: 0,
      horse: 0,
    });
    setResult(null);
  };

  if (result) {
    const animalImages: Record<Animal, string> = {
      cat: "/cat.png",
      dog: "/dog.png",
      fox: "/fox.png",
      hamster: "/hamster.png",
      horse: "/horse.png",
    };
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold">
          You are most similar to a {result}!
        </h2>
        <img
          src={animalImages[result]}
          alt={result}
          width={256}
          height={256}
          className="rounded-lg"
        />
        <Share text={`I scored as a ${result}! ${url}`} />
        <button
          onClick={retake}
          className="mt-4 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/80"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = questions[current];
  const shuffledOptions = shuffleArray(currentQuestion.options);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-medium">{currentQuestion.text}</h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt) => (
          <button
            key={opt.text}
            onClick={() => handleAnswer(opt.animal)}
            className="rounded-md bg-secondary px-4 py-2 text-white hover:bg-secondary/80"
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
