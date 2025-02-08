import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useStore } from "../Store";
import { useQueries } from "@tanstack/react-query";

const difficulties = ["easy", "medium", "hard"];

async function fetchQuestions(difficulty, categoryId) {
  const resp = await fetch(
    `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}`,
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
  //console.log(questionsQueries);
  const areAllDefined = questionsQueries.every((query) => query.data);
  if (!areAllDefined) {
    return <h1>Fetching questions...</h1>;
  }
  return (
    <>
      <Outlet context={questionsQueries} />
      <h1>Total Points: {totalPoints}</h1>
      {levelsStates.map((level, index) => {
        return (
          <div key={index + 1} onClick={() => handleRedirection(level, index)}>
            <div>Level {index + 1}</div>
            <div>{difficulties[index]}</div>
          </div>
        );
      })}
      <h1>Current Question: {currentQuestion}</h1>
    </>
  );
};

export default Quizz;
