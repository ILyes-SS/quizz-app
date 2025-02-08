import React from "react";
import { useStore } from "../Store";
import { useOutletContext, useParams, useSearchParams } from "react-router-dom";

const Question = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { levelId } = useParams();
  const questionsQueries = useOutletContext();
  const data =
    questionsQueries[levelId - 1].data.results[
      Number(searchParams.get("question")) - 1
    ];
  return (
    <>
      <h1>
        this is question {searchParams.get("question")} from level {levelId}
      </h1>
      <h2>its question: {data.question}</h2>
    </>
  );
};

export default Question;
