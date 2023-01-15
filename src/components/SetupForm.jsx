import React from "react";
import { useGlobalContext } from "../store/quiz-context";

const SetupForm = () => {
  const { quiz, handleChange, handleSubmit, error } = useGlobalContext();
  return (
    <main>
      <section className="quiz quiz-small">
        <form action="" className="setup-form">
          <h2>Setup quiz</h2>
          {/* amount */}
          <div className="form-control">
            <label htmlFor="amount">Number of questions</label>
            <input
              type="number"
              name="amount"
              id="amount"
              onChange={handleChange}
              value={quiz.amount}
              className="form-input"
              min={1}
              max={50}
            />
          </div>
          {/* catagory */}
          <div className="form-control">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              onChange={handleChange}
              value={quiz.category}
              className="form-input"
            >
              <option value="sports">Sports</option>
              <option value="history">History</option>
              <option value="politics">Politics</option>
            </select>
          </div>
          {/* difficulty */}
          <div className="form-control">
            <label htmlFor="difficulty">Select difficulty</label>
            <select
              name="difficulty"
              id="difficulty"
              onChange={handleChange}
              value={quiz.difficulty}
              className="form-input"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {error && (
            <p className="error">
              Can't generate questions, please try different options
            </p>
          )}
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            Start
          </button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;
