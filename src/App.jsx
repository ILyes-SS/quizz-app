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
      <header className="flex container items-center">
        <div>
          <img
            className="inline-block h-10"
            src="/images/purple-Q-letter-logo-removebg-preview.png"
            alt="quizzy logo"
          />
          <h1 className="inline-block medium-text -ml-4 text-primary">uizzy</h1>
        </div>
        <a className="ml-auto hover:cursor-pointer" onClick={handleRedirection}>
          Quizz
        </a>
      </header>
      <section className="section">
        <div className="container flex">
          <div className="container flex-1">
            <h1 className="heading">Quizify Your Mind Learn, Play, Conquer!</h1>
            <div className="mt-4">
              <a
                className="text-white py-1 px-3 bg-primary rounded-md hover:cursor-pointer"
                onClick={handleRedirection}
              >
                {categoryId ? "continue" : "start"}
              </a>
            </div>
          </div>
          <img
            className="flex-1"
            src="/images/purple-mind-icon-removebg-preview.png"
            alt="purple and blue brain"
          />
        </div>
      </section>
    </>
  );
}

export default App;
