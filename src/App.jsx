import { Link, useNavigate } from "react-router-dom";
import { useStore } from "./Store";
import { cards } from "./utils/constants";
import { Star } from "lucide-react";
import { animateWithGsap } from "./utils/animation";
import { useEffect } from "react";

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
        <div className="container flex flex-col md:items-center md:flex-row-reverse">
          <img
            id="brain"
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

              <a
                href="#how"
                className=" text-primary font-semibold text-sm capitalize py-1 px-6 bg-accent  rounded-md hover:cursor-pointer"
              >
                How It Works?
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="section md:!pt-0 flex flex-col gap-5">
        <h1 className="heading self-center text-primary">Why chose Quizzy?</h1>
        <div className="container rounded-xl flex flex-col md:flex-row gap-5">
          {cards.map((card) => {
            return (
              <div
                key={card.title}
                className={
                  "flex p-5 relative flex-col shadow-md items-center " +
                  (card.title === "Customizable Quizzes" ? "md:bottom-5" : "")
                }
              >
                <div className="relative">
                  {" "}
                  <img
                    className="h-[130px]"
                    src={card.src}
                    alt="quizzy image"
                  />
                  <img
                    className="h-8 absolute -right-[20%] top-[60%]"
                    src="/public/images/plus.png"
                    alt=""
                  />
                  <img
                    className="h-8 absolute -left-[25%] top-[20%]"
                    src="/public/images/circle.png"
                    alt=""
                  />
                  <img
                    className="h-8 absolute -left-[25%] bottom-[20%]"
                    src="/public/images/plus.png"
                    alt=""
                  />
                  <img
                    className="h-8 absolute -right-[25%] top-[20%]"
                    src="/public/images/circle.png"
                    alt=""
                  />
                </div>
                <h2 className="medium-text mt-2 mb-2 !leading-tight text-center text-secondary">
                  {card.title}
                </h2>
                <p>{card.para}</p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="section container">
        <div
          id="how"
          className="container flex flex-col gap-5 !p-7 bg-[#E3E1FD]"
        >
          <div>
            <h1 className="heading">
              How Does <br></br> it Work?
            </h1>
            <ul className="mt-3">
              <li>
                {" "}
                -Answer the questions as fast as you can to earn more points
              </li>
              <li>-questions get harder each level</li>
              <li>- if the timer ends you won’t gain any points</li>
            </ul>
          </div>
          <img className="max-w-[400px]" src="/images/quizz-page.png" alt="" />
        </div>
      </section>
      <section className="section !pt-1">
        <div className="container">
          <h1 className="heading text-center">Testimonials</h1>
          <h2 className="medium-text text-center">
            What our students say about us
          </h2>
          <div className="flex md:flex-row mt-4 flex-col gap-3 justify-center items-center">
            {"abc".split("").map((i) => {
              return (
                <div
                  key={i}
                  className="bg-[#FAF8FE] flex flex-col items-center gap-2 !p-3"
                >
                  <div className="flex gap-1 items-center">
                    <div className="h-10 w-10 rounded-full bg-slate-500"></div>
                    <div>
                      <p>User</p>
                      <p className="text-slate-400 -mt-1">student</p>
                    </div>
                  </div>
                  <div className="flex">
                    <Star color="purple"></Star>
                    <Star color="purple"></Star>
                    <Star color="purple"></Star>
                    <Star color="purple"></Star>
                    <Star color="purple"></Star>
                  </div>
                  <p className="text-center">
                    “I love how Quizzy make learning fun!”
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <footer className="text-center p-2 mt-2 bg-primary text-white font-bold">
        Made by Ilyes
      </footer>
    </>
  );
}

export default App;
