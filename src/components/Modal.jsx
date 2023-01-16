import React from "react";
import { useGlobalContext } from "../store/quiz-context";

const Modal = () => {
  const { isModalOpen, correct, questions, closeModal, answered } =
    useGlobalContext();
  return (
    <div
      className={`${
        isModalOpen ? "modal-container isOpen" : "modal-container"
      }`}
    >
      <div className="modal-content">
        <h2>Congrats!</h2>
        <p>
          You answered {correct} of {questions.length} questions correctly{" "}
        </p>
        <p>Correct answer : {correct}</p>
        <p>Wrong answer : {questions.length - correct}</p>
        <p>number answered : {answered}</p>
        <button className="close-btn" onClick={closeModal}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Modal;
