import { Link, useNavigate } from "react-router-dom";
import { useStore } from "./Store";
import { cards } from "./utils/constants";
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

        <p
          className="ml-auto hover:cursor-pointer text-lg m-6 group relative w-max"
          onClick={handleRedirection}
        >
          <span>Quizz</span>
          <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
          <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
        </p>
      </header>
      <section className="section !pt-0">
        <div className="container flex flex-col">
          <img
            className="flex-1"
            src="/images/purple-mind-icon-removebg-preview.png"
            alt="purple and blue brain"
          />{" "}
          <div className="container flex flex-col flex-1">
            <h1 className="heading bg-gradient-to-r from-[#746CF6] to-[#74F6D8] bg-clip-text text-transparent text-center">
              Quizify Your Mind Learn, Play, Conquer!
            </h1>
            <div className="self-center flex gap-2 mt-4">
              <a
                className="text-white font-semibold text-sm capitalize py-1 px-4 bg-primary  rounded-md hover:cursor-pointer"
                onClick={handleRedirection}
              >
                {categoryId ? "continue" : "start"}
              </a>
              <a className=" text-primary font-semibold text-sm capitalize py-1 px-6 bg-accent  rounded-md hover:cursor-pointer">
                How It Works?
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="section flex flex-col gap-5">
        <h1 className="heading self-center text-primary">Why chose Quizzy?</h1>
        <div className="container rounded-xl flex flex-col gap-5">
          {cards.map((card) => {
            return (
              <div className="flex p-5 flex-col shadow-md items-center ">
                <img className="h-[130px]" src={card.src} alt="quizzy image" />
                <h2 className="medium-text mt-2 mb-2 !leading-tight text-center text-secondary">
                  {card.title}
                </h2>
                <p>{card.para}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default App;
