import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const AppContext = React.createContext();

const TIME = 120;

const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [error, setError] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
    user: "",
    password: "",
  });
  const [timer, setTimer] = useState(TIME);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIslogin] = useState(false);

  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);
    const response = await axios(url).catch((err) => console.log(err));
    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      setWaiting(true);
    }
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else return index;
    });
  };

  const checkAnswer = (value) => {
    setAnswered((oldState) => oldState + 1);
    if (value) {
      setCorrect((oldState) => oldState + 1);
    }
    nextQuestion();
  };

  const openModal = () => {
    setIsModalOpen(true);
    setTimer(0);
  };

  const closeModal = () => {
    setWaiting(true);
    setCorrect(0);
    setIsModalOpen(false);
    setAnswered(0);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
    startTimer();
    fetchQuestions(url);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { user, password } = quiz;
    if (user === "admin" && password === "admin") {
      setIslogin(true);
      // navigate to home
      navigate("/home");
    }
  };

  // timer function
  const startTimer = () => {
    setTimer(TIME);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    if (timer === 0) {
      clearInterval(interval);
    }
  };

  const logoutHandler = () => {
    setIslogin(false);
    navigate("/");
  };

  useEffect(() => {
    if (timer === 0) {
      openModal();
    }
  }, [timer]);

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        nextQuestion,
        checkAnswer,
        closeModal,
        quiz,
        handleChange,
        handleSubmit,
        handleLogin,
        timer,
        answered,
        isLogin,
        logoutHandler,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
