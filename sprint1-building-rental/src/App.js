
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./components/HomePage/HomePage";
import ContactPage from "./components/HomePage/ContactPage";
import IntroductionPage from "./components/HomePage/IntroductionPage";
import LoginPage from "./components/HomePage/LoginPage";
import 'bootstrap/dist/js/bootstrap.bundle';
import {Login} from "./components/Login/Login";
import {Otp} from "./components/Login/Otp";
import ShowInfoUser from "./components/PersonalInsormation/ShowInfoUser";
function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/contactPage" element={<ContactPage />}></Route>
          <Route path="/loginPage" element={<LoginPage />}></Route>
          <Route path="/information" element={<ShowInfoUser />}></Route>
          <Route
            path="/introductionPage"
            element={<IntroductionPage/>}
          ></Route>
          <Route path={"/login"} element={<Login/>}></Route>
          <Route path={"/otp"} element={<Otp/>}></Route>
        </Routes>
      </BrowserRouter>

    
    </>
  );
}

export default App;
