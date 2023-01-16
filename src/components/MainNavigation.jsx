import React from "react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../store/quiz-context";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const { isLogin, logoutHandler } = useGlobalContext();
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/home"
            >
              Quizz
            </NavLink>
          </li>
          {!isLogin && (
            <li>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to="/login"
              >
                Login
              </NavLink>
            </li>
          )}
          {isLogin && (
            <li>
              <button className={classes.btn} onClick={logoutHandler}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
