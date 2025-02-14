import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useStore } from "../Store";
import { useQueries } from "@tanstack/react-query";
import { ArrowLeft, Play, Lock, Check } from "lucide-react";

const difficulties = ["easy", "medium", "hard"];

async function fetchQuestions(difficulty, categoryId) {
  const resp = await fetch(
    `https://opentdb.com/api.php?amount=6&category=${categoryId}&difficulty=${difficulty}`,
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
  const [showPopup, setShowPopup] = useState(false);

  function handleRedirection(level, index) {
    switch (level) {
      case "ONGOING":
        navigate(`level/${index + 1}/?question=${currentQuestion}`);
        break;
      case "LOCKED":
        setShowPopup(true);
        break;
      case "COMPLETED":
        navigate(`level/${index + 1}/results`);
        break;

      default:
        break;
    }
  }
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
      {showPopup && (
        <div
          id="alert-border-1"
          class="flex top-[50%] right-[5%] absolute items-center p-4 mb-4 text-blue-800 border-t-4 border-blue-300 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800"
          role="alert"
        >
          <svg
            class="shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div class="ms-3 text-sm font-medium">
            You can not access this level yet{" "}
          </div>
          <button
            type="button"
            class="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-border-1"
            aria-label="Close"
            onClick={() => setShowPopup(false)}
          >
            <span class="sr-only">Dismiss</span>
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default Quizz;
