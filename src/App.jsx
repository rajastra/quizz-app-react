import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import FormLogin from "./components/FormLogin";
import Home from "./components/Home";
import MainNavigation from "./components/MainNavigation";

function App() {
  return (
    <div>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/welcome" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<FormLogin />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
