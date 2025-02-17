import React from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../Store";
import he from "he";

const Results = () => {
  const { levelId } = useParams();
  const { totalPoints, results } = useStore();
  const levelResults = results[levelId - 1];
  const levelPoints = totalPoints[levelId - 1];

  return (
    <div className="h-[200dvh] w-[100dvw] z-10 absolute bg-white  ">
      <section className="gap-3 container flex items-center">
        {" "}
        <h1 className="heading "> Congrats!</h1>{" "}
        <img className="h-[40px]" src="/images/congrats.png" alt="" />
      </section>
      <section className="container section -mt-6 ">
        <h1 className="heading mb-2 underline">Your Results:</h1>
        <div className="flex flex-col gap-4">
          {levelResults.map((result, index) => {
            return (
              <div
                key={result.id}
                className="shadow-xl w-full text-center rounded-xl ring-gray-100 ring-1 px-5 py-5"
              >
                <h1 className="mb-1 medium-text font-heading">
                  Question {index + 1} :
                </h1>
                <div className="flex max-w-full gap-4">
                  <div className="flex-1">
                    <p className="paragraph font-body">Your answer: </p>
                    <div
                      className={
                        result.answer === result.correct_answer
                          ? "bg-green-600 text-white font-medium p-1 mt-1 break-words"
                          : "bg-red-600 text-white font-medium p-1 mt-1 break-words"
                      }
                    >
                      {result.answer}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="paragraph font-body">Correct answer: </p>
                    <div className="bg-green-600 mt-1 p-1 text-white break-words font-medium">
                      {result.correct_answer}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="paragraph font-body">Gained Points: </p>
                    <div className="font-medium">{result.points}</div>
                  </div>
                </div>
              </div>
            );
          })}
          <h2 className="medium-text">Total level points: {levelPoints}</h2>
        </div>
      </section>
      <div className="flex justify-center">
        <Link
          to={"/quizz"}
          className="text-secondary  medium-text"
          replace={true}
        >
          Go back to quizz Page
        </Link>{" "}
      </div>
    </div>
  );
};

export default Results;
