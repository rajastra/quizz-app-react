import React from "react";
import { useGlobalContext } from "../store/quiz-context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";

function Home() {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    error,
    nextQuestion,
    checkAnswer,
    timer,
  } = useGlobalContext();
  if (waiting) {
    return <SetupForm />;
  }

  if (loading) {
    return <Loading />;
  }

  const { question, incorrect_answers, correct_answer } = questions[index];

  const answers = [...incorrect_answers, correct_answer];

  // const tempIndex = Math.floor(Math.random() * 4);
  // if (tempIndex === 3) {
  //   answers.push(correct_answer);
  // } else {
  //   answers.push(answers[tempIndex]);
  //   answers[tempIndex] = correct_answer;
  // }

  // randomize answer

  const secondsToHms = (d) => {
    d = Number(d);
    let h = Math.floor(d / 3600);
    let m = Math.floor((d % 3600) / 60);
    let s = Math.floor((d % 3600) % 60);

    let hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    let mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
  };

  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          Correct answer :{correct}/{index}
        </p>
        <p className="timer">timer : {secondsToHms(timer)}</p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className="answer-btn"
                  dangerouslySetInnerHTML={{ __html: answer }}
                  onClick={() => checkAnswer(correct_answer === answer)}
                />
              );
            })}
          </div>
        </article>
        <button className="next-question" onClick={nextQuestion}>
          Next Question
        </button>
      </section>
    </main>
  );
}

export default Home;
