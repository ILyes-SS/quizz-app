import React from "react";
import { useStore } from "../Store";
import { useParams, useSearchParams } from "react-router-dom";

const Question = () => {
  const [searchParams, setSearchParams] = useSearchParams({ question: 1 });
  const { levelId } = useParams();
  return (
    <>
      <h1>
        this is question {searchParams.get("question")} from level {levelId}
      </h1>
    </>
  );
};

export default Question;
