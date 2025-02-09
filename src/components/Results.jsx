import React from "react";
import { Link } from "react-router-dom";

const Results = () => {
  return (
    <div>
      <h1> Results</h1>{" "}
      <Link to={"/quizz"} replace={true}>
        Go back to quizz
      </Link>{" "}
    </div>
  );
};

export default Results;
