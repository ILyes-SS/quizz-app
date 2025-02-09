import React, { useRef, useState } from "react";
import { useStore } from "../Store";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from "react-router-dom";

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
      setTotalPoints(1, levelId - 1);
    setResults(
      { userAnswer, correct_answer: data.correct_answer, points: 1 },
      levelId - 1
    );
    const nextQuestion =
      questionsQueries[levelId - 1].data.results[questionNum];

    if (nextQuestion) {
      setSearchParams({ question: questionNum + 1 });
      setCurrentQuestion(questionNum + 1);
    } else {
      navigate(`/quizz/level/${levelId}/results`, {
        replace: true,
      });
    }
  }
  // add a timer
  return (
    <>
      <h3>{levelPoints}</h3>
      <p>{data.type}</p>
      <h2>its question: {data.question}</h2>
      <form onSubmit={handleSubmit} className="text-red-950">
        <div>
          {answers.map((answer) => {
            return (
              <button
                type="button"
                className="text-blue-900 bg-red-600 focus:bg-green-600"
                onClick={choseAnswer}
              >
                {answer}
              </button>
            );
          })}
        </div>
        <h1>click this btn to submit</h1>
        <button type="submit">submit</button>
      </form>
      <Link to={"/quizz"} replace={true}>
        Quizz
      </Link>
    </>
  );
};

export default Question;
