import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useStore } from "../Store";

const Quizz = () => {
  const difficulties = ["easy", "intermediate", "hard"];
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
  return (
    <>
      <Outlet />
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
