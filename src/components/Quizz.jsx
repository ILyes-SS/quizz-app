import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useStore } from "../Store";
import { useQueries } from "@tanstack/react-query";
import { ArrowLeft, Play, Lock, Check } from "lucide-react";

const difficulties = ["easy", "medium", "hard"];

async function fetchQuestions(difficulty, categoryId) {
  const resp = await fetch(
    `https://opentdb.com/api.php?amount=3&category=${categoryId}&difficulty=${difficulty}`,
    { mode: "cors" }
  );
  if (!resp.ok) {
    throw new Error("could not fetch");
  }
  return resp.json();
}
const Quizz = () => {
  const categoryId = useStore((store) => store.categoryId);
  const questionsQueries = useQueries({
    queries: difficulties.map((difficulty) => {
      return {
        queryKey: ["questions", difficulty],
        queryFn: () => fetchQuestions(difficulty, categoryId),
        staleTime: Infinity,
        cacheTime: Infinity,
        retry: 5,
      };
    }),
  });
  const levelsStates = useStore((store) => store.levelsStates);
  const currentQuestion = useStore((store) => store.currentQuestion);
  const totalPoints = useStore((store) => store.totalPoints);
  const navigate = useNavigate();

  function handleRedirection(level, index) {
    switch (level) {
      case "ONGOING":
        navigate(`level/${index + 1}/?question=${currentQuestion}`);
        break;
      case "LOCKED":
        alert("you can not access this level yet");
        break;
      case "COMPLETED":
        navigate(`level/${index + 1}/results`);
        break;

      default:
        break;
    }
  }
  console.log(questionsQueries);
  const areAllDefined = questionsQueries.every((query) => query.data);
  if (!areAllDefined) {
    return (
      <div className="h-screen flex items-center justify-center">
        {" "}
        <h1 className="heading">Fetching questions...</h1>
      </div>
    );
  }
  return (
    <>
      <Outlet context={questionsQueries} />
      <Link to={"/"} className="flex font-medium m-3 mb-0">
        <ArrowLeft /> Home
      </Link>
      <section className="section items-center flex container">
        <h1 className="bg-gradient-to-r from-[#746CF6] to-[#74F6D8] bg-clip-text text-transparent heading">
          Let's Learn!
        </h1>
        <p className="ml-auto medium-text">
          Total Points: {totalPoints.reduce((prev, curr) => prev + curr, 0)}
        </p>
      </section>
      <section className="section flex flex-col gap-5 ">
        {levelsStates.map((level, index) => {
          return (
            <div
              className="text-white hover:cursor-pointer bg-gradient-to-r from-[#9D74F6] to-[#928DF6] w-[70dvw] container !ml-5"
              key={index + 1}
              onClick={() => handleRedirection(level, index)}
            >
              {level === "ONGOING" ? (
                <Play />
              ) : level === "COMPLETED" ? (
                <Check />
              ) : (
                <Lock />
              )}
              <p className="paragraph">Level {index + 1}</p>
              <h1 className="heading">{difficulties[index]}</h1>
            </div>
          );
        })}
      </section>
      <h6 className="text-red-950">Current Question: {currentQuestion}</h6>
    </>
  );
};

export default Quizz;
