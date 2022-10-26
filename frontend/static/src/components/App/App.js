import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "../Login/LoginForm";
import RegistrationForm from "../Registration/RegistrationForm";
import ProfileForm from "../Profile/ProfileForm";
import Articles from "../Articles/Articles";
import Header from "../Header/Header";



const INITIAL_STATE = {
  auth: false,
  admin: false,
  authorID: 0,
}


function App() {
  const [superState, setSuperState] = useState(INITIAL_STATE);
  const [activeID, setActiveID] = useState(null);

  const newState = JSON.parse(window.localStorage.getItem("superState"));

  useEffect(() => {
    window.localStorage.setItem("superState", JSON.stringify(superState));
  }, [superState]);

  const handleError = (err) => {
    console.warn(err);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/dj-rest-auth/user/");
      if (!response.ok) {
        console.log("this", response.ok);
        setSuperState(INITIAL_STATE);
      } else {
        setSuperState(newState);
      }
    };
    checkAuth();
  }, []);

  const logoutUser = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const response = await fetch("/dj-rest-auth/logout/", options).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      Cookies.remove("Authorization");
      window.localStorage.removeItem("superState");
      setSuperState(INITIAL_STATE);
    }
  };


  return (
    <div className="App">
      <Header superState={superState} setSuperState={setSuperState} logoutUser={logoutUser} />
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Articles />} />
            <Route
              path="login"
              element={<LoginForm superState={superState} setSuperState={setSuperState} />}
            />
            <Route
              path="register"
              element={<RegistrationForm superState={superState} setSuperState={setSuperState} />}
            />
            <Route path="profile" element={<ProfileForm />} /></Route>
          </Routes>
          </BrowserRouter>
            
    </div>
  );
}

export default App;
