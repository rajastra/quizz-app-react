import React from "react";
import { useGlobalContext } from "../store/quiz-context";

const FormLogin = () => {
  const { quiz, handleChange, handleLogin } = useGlobalContext();
  return (
    <main>
      <section className="quiz quiz-small">
        <form action="" className="setup-form">
          <h2>Login</h2>
          {/* username */}
          <div className="form-control">
            <label htmlFor="user">Username</label>
            <input
              type="text"
              name="user"
              id="user"
              onChange={handleChange}
              value={quiz.user}
              className="form-input"
            />
          </div>
          {/* password */}
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              value={quiz.password}
              className="form-input"
            />
          </div>

          <button type="submit" className="submit-btn" onClick={handleLogin}>
            Login
          </button>
        </form>
      </section>
    </main>
  );
};

export default FormLogin;
