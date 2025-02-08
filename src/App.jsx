import { Link, useNavigate } from "react-router-dom";
import { useStore } from "./Store";
export function App() {
  const categoryId = useStore((store) => store.categoryId);
  const navigate = useNavigate();

  function handleRedirection(e) {
    e.preventDefault();
    if (categoryId) navigate("/quizz");
    else navigate("category");
  }
  return (
    <>
      <h1 className="text-red-600">hello world</h1>
      <a onClick={handleRedirection}>Quizz</a>
      <a onClick={handleRedirection} className="ml-5">
        {categoryId ? "continue" : "start"}
      </a>
      <h2>the category:{categoryId}</h2>
    </>
  );
}

export default App;
