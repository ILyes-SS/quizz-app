import App from "./App";
import Category from "./components/Category";
import Question from "./components/Question";
import Quizz from "./components/Quizz";
import Results from "./components/Results";

export const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/category",
    element: <Category />,
  },
  {
    path: "/quizz",
    element: <Quizz />,
    children: [
      {
        path: "level/:levelId",
        children: [
          {
            path: "",
            element: <Question />,
          },
          {
            path: "results",
            element: <Results />,
          },
        ],
      },
    ],
  },
];
