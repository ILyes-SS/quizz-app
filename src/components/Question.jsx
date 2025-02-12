import React, { useRef, useState, useEffect } from "react";
import { useStore } from "../Store";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import gsap from "gsap";

const Question = () => {
  const {
    totalPoints,
    setTotalPoints,
    setResults,
    setCurrentQuestion,
    setLevelsStates,
    levelsStates,
  } = useStore();
  const userAnswer = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { levelId } = useParams();
  const questionsQueries = useOutletContext();
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const randomIndex = useRef(
    Math.floor(
      Math.random() *
        (questionsQueries[levelId - 1].data.results[
          Number(searchParams.get("question")) - 1
        ].incorrect_answers.length +
          1)
    )
  );

  useEffect(() => {
    setIsSubmit(false);
    setIsDisabled(false);
    userAnswer.current = "none";
  }, [searchParams.get("question")]);

  const questionNum = Number(searchParams.get("question"));
  const data = questionsQueries[levelId - 1].data.results[questionNum - 1];

  // const randomIndex = Math.floor(
  //   Math.random() * (data.incorrect_answers.length + 1)
  // );
  const answers = [...data.incorrect_answers].toSpliced(
    randomIndex.current,
    0,
    data.correct_answer
  );
  const levelPoints = totalPoints[levelId - 1];

  function animateProgress() {
    gsap.to("#progress", {
      width: `${(questionNum / 3) * 100}%`,
      duration: 1,
    });
  }
  function choseAnswer(e) {
    userAnswer.current = e.target.textContent;
  }

  function handleSubmit(e) {
    //add points, save answer
    e.preventDefault();
    setIsSubmit(true);
    setIsDisabled(true);

    animateProgress();

    let points = 0;
    if (userAnswer.current === data.correct_answer) {
      //if answer is correct add points
      points = 1;
      setTotalPoints(points, levelId - 1);
    }
    // save answer
    setResults(
      {
        answer: userAnswer.current,
        correct_answer: data.correct_answer,
        points,
        id: crypto.randomUUID(),
      },
      levelId - 1
    );
    const nextQuestion =
      questionsQueries[levelId - 1].data.results[questionNum];

    if (nextQuestion) {
      //there is still a question remaining
      setTimeout(() => {
        setSearchParams({ question: questionNum + 1 });
      }, 2000);
      setCurrentQuestion(questionNum + 1);
    } else {
      //level ended
      setLevelsStates("COMPLETED", levelId - 1);
      if (levelsStates[levelId]) setLevelsStates("ONGOING", levelId);
      setTimeout(() => {
        navigate(`/quizz/level/${levelId}/results`);
      }, 2000);

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
      <section className="section">
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            id="progress"
            className={"bg-primary h-2.5 rounded-full "}
            style={{ width: `${((questionNum - 1) / 3) * 100}%` }}
          ></div>
        </div>
      </section>
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
                    className={
                      "text-blue-900 py-4 border focus:bg-primary " +
                      (isSubmit
                        ? answer === userAnswer.current
                          ? userAnswer.current === data.correct_answer
                            ? "bg-green-500 "
                            : "bg-red-500 "
                          : ""
                        : "") +
                      (isSubmit && answer === data.correct_answer
                        ? "bg-green-500 "
                        : "")
                    }
                    onClick={choseAnswer}
                  >
                    {answer}
                  </button>
                );
              })}
              <button
                type="submit"
                disabled={isDisabled}
                className={
                  "text-white py-1 px-3 bg-secondary rounded-md mt-4 " +
                  (isDisabled
                    ? "bg-slate-400 cursor-not-allowed"
                    : "hover:cursor-pointer")
                }
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
