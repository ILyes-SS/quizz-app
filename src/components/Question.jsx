import React, { useRef, useState } from "react";
import { useStore } from "../Store";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Question = () => {
  const { totalPoints, setTotalPoints, setResults, setCurrentQuestion } =
    useStore();
  const userAnswer = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { levelId } = useParams();
  const questionsQueries = useOutletContext();
  const navigate = useNavigate();

  const questionNum = Number(searchParams.get("question"));
  const data = questionsQueries[levelId - 1].data.results[questionNum - 1];

  const randomIndex = Math.floor(
    Math.random() * (data.incorrect_answers.length + 1)
  );
  const answers = [...data.incorrect_answers].toSpliced(
    randomIndex,
    0,
    data.correct_answer
  );
  const levelPoints = totalPoints[levelId - 1];

  function choseAnswer(e) {
    userAnswer.current = e.target.textContent;
  }

  function handleSubmit(e) {
    //add points, save answer
    e.preventDefault();
    if (userAnswer.current === data.correct_answer)
      //if answer is correct add points
      setTotalPoints(1, levelId - 1);
    // save answer
    setResults(
      {
        answer: userAnswer.current,
        correct_answer: data.correct_answer,
        points: 1,
      },
      levelId - 1
    );
    const nextQuestion =
      questionsQueries[levelId - 1].data.results[questionNum];

    if (nextQuestion) {
      //there is still a question remaining
      setSearchParams({ question: questionNum + 1 });
      setCurrentQuestion(questionNum + 1);
    } else {
      //level ended
      navigate(`/quizz/level/${levelId}/results`);
      setCurrentQuestion(1);
    }
  }
  // add a timer
  return (
    <div className="h-[200dvh] w-[100dvw] z-10 absolute bg-white">
      <Link
        to={"/quizz"}
        className="flex paragraph items-center m-1 mb-0 -mt-1"
      >
        <ArrowLeft scale={2} /> Quizz
      </Link>
      <section className="medium-text flex justify-between section container !pt-0">
        <p>Timer {/* timer */}</p>
        <p>{questionNum} of 10</p>
        <p>pts:{levelPoints}</p>
      </section>
      <section className="section">{/* progress bar */}</section>
      <section className="section container ">
        <div className="p-5 inset-shadow-sm shadow-lg shadow-indigo-500/50 flex flex-col gap-3">
          <p className="text-gray-500 font-medium ">{data.category}</p>
          <p>{data.question}</p>
          <form onSubmit={handleSubmit} className="text-red-950">
            <div className="flex flex-col gap-4">
              {answers.map((answer) => {
                return (
                  <button
                    type="button"
                    className="text-blue-900 py-4 border focus:bg-primary"
                    onClick={choseAnswer}
                  >
                    {answer}
                  </button>
                );
              })}
              <button
                type="submit"
                className="text-white py-1 px-3 bg-secondary rounded-md mt-4  hover:cursor-pointer"
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Question;
