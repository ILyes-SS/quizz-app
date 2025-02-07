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
      <div>Category</div>
      <form onSubmit={handleRedirection}>
        {" "}
        {categories.map((category) => {
          return (
            <div key={category.id}>
              <label htmlFor={category.id}>
                <span>{category.name}</span>
                <input
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
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Category;
