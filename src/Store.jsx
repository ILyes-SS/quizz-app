import { create } from "zustand";

export const useStore = create((set) => ({
  categoryId: null,
  setCategoryId: (id) => set((state) => ({ categoryId: id })),
  levelsStates: ["ONGOING", "LOCKED", "LOCKED"], // when level is completed the next level become ONGOING
  setLevelsStates: (newState, index) =>
    set(
      (state) => ({
        levelsStates: state.levelsStates.toSpliced(index, 1, newState),
      }),
      false
    ),
  totalPoints: [0, 0, 0],
  setTotalPoints: (points, index) =>
    set((state) => ({
      totalPoints: state.totalPoints.map((levelPoints, i) =>
        index !== i ? levelPoints : levelPoints + points
      ),
    })),
  currentQuestion: 1,
  setCurrentQuestion: (question) =>
    set((state) => ({ currentQuestion: question })),
  results: [[], [], []],
  setResults: (questionResult, level) =>
    set((state) => ({
      results: state.results.map((levelResults, i) =>
        i === level ? [...levelResults, questionResult] : levelResults
      ),
    })),
}));
