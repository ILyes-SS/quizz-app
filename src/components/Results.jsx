import React from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../Store";

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
        <img className="h-[50px]" src="/images/congrats.png" alt="" />
      </section>
      <section className="container section -mt-3">
        <h1 className="heading">Your Results:</h1>
        <div className="flex flex-col gap-4">
          {levelResults.map((result, index) => {
            return (
              <div key={result.id} className="shadow-xl px-5 py-5">
                <h1 className="medium-text font-heading">
                  question{index + 1}
                </h1>
                <div className="flex gap-5">
                  <div>
                    <p className="paragraph font-body">Your answer: </p>
                    <div
                      className={
                        result.answer === result.correct_answer
                          ? "bg-green-600 text-white font-medium"
                          : "bg-red-600 text-white font-medium"
                      }
                    >
                      {result.answer}
                    </div>
                  </div>
                  <div>
                    <p className="paragraph font-body">Correct answer: </p>
                    <div className="bg-green-600 text-white font-medium">
                      {result.correct_answer}
                    </div>
                  </div>
                  <div>
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
      <Link to={"/quizz"} className="ml-[30dvw] medium-text" replace={true}>
        Go back to quizz Page
      </Link>{" "}
    </div>
  );
};

export default Results;
