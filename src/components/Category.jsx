import React from "react";
import { categories } from "../utils/constants";
import { useStore } from "../Store";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const { setCategoryId, categoryId } = useStore();
  const navigate = useNavigate();

  function handleRedirection(e) {
    e.preventDefault();
    if (categoryId) navigate("/quizz", { replace: true });
  }
  return (
    <>
      <h1 className="heading text-secondary text-center">
        Chose Your Category:
      </h1>
      <form className="container flex flex-col" onSubmit={handleRedirection}>
        {" "}
        <div className="grid  grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          {categories.map((category) => {
            return (
              <div
                key={category.id}
                className="shadow-md rounded-lg ring-0 p-5"
              >
                <label
                  htmlFor={category.id}
                  className="flex flex-col items-center"
                >
                  <span className="medium-text text-center">
                    {category.name}
                  </span>
                  <input
                    className=" hover:cursor-pointer mt-2 scale-150"
                    type="radio"
                    name="category"
                    value={category.id}
                    selected={category.id == categoryId}
                    onChange={() => setCategoryId(category.id)}
                    required
                  />
                </label>
              </div>
            );
          })}
        </div>
        <button
          type="submit"
          className="medium-text self-center px-4 py-1 rounded-lg bg-primary text-white mt-4 mb-2 hover:cursor-pointer"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Category;
