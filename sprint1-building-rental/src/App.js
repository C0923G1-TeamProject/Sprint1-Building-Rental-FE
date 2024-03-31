import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./components/HomePage/HomePage";
import ContactPage from "./components/HomePage/ContactPage";
import IntroductionPage from "./components/HomePage/IntroductionPage";
import LoginPage from "./components/HomePage/LoginPage";
import LisContract from "./components/Contract/ListContract";
import "../src/components/Css/Contract/list-contract.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Login } from "./components/Login/Login";
import { Otp } from "./components/Login/Otp";
import ListCustomer from "./components/Customer/ListCustomer";
import AddCustomer from "./components/Customer/AddCustomer";
import ShowInfoUser from "./components/PersonalInsormation/ShowInfoUser";
import ListPremises from "./components/Premises/ListPremises";

import CreateContract from "./components/Contract/CreateContract";

import UpdatePremises from "./components/Premises/UpdatePremises";
import { log } from "handlebars";
import { Logout } from "./components/Login/Logout";
import { UserDataProvider } from "./components/Context/useUserData";

function App() {
  return (
    <>
      <UserDataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/contactPage" element={<ContactPage />}></Route>
            <Route path="/loginPage" element={<LoginPage />}></Route>
            <Route path="/information" element={<ShowInfoUser />}></Route>
            <Route
              path="/introductionPage"
              element={<IntroductionPage />}
            ></Route>
            <Route path="/premises" element={<ListPremises />}>
              {" "}
            </Route>
            <Route
              path="/introductionPage"
              element={<IntroductionPage />}
            ></Route>
            <Route path="/contract" element={<LisContract />}></Route>
            <Route path={"/login"} element={<Login />}></Route>
            <Route path={"/otp"} element={<Otp />}></Route>
            <Route path="/customer" element={<ListCustomer />}></Route>
            <Route path="/add" element={<AddCustomer />}></Route>
            <Route
              path="/update-premises/:id"
              element={<UpdatePremises />}
            ></Route>
            <Route path={"/logout"} element={<Logout />}></Route>
          </Routes>
        </BrowserRouter>
      </UserDataProvider>
    </>
  );
}
export default App;
