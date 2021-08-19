import { React, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Logo from "./../../src/logo.png";

export default function Login({ setToken, setRole }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const chick = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_SERVER}login`, { email, password })
      .then((result) => {
        if (result.status === 200) {
          setToken(result.data.token);
          setRole(result.data.role);
          localStorage.setItem("token", result.data.token);
          if (result.data.role === "admin") {
            localStorage.setItem("role", result.data.role);
            history.push("/dashboard");
          } else {
            history.push("/front_end");
          }
        }
      })
      .catch((err) => {
        setLoginError(err.response.data.message);
      });
  };
  return (
    <div className="containerDivLogin">
      <img src={Logo} height={200}></img>
      <div className="loginDiv">
        <input
          className="registerInput"
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value.toLocaleLowerCase());
          }}
        />
        <input
          className="registerInput"
          type="Password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="registerBtn" onClick={chick}>
          Login
        </button>
        <p>
          Don't have account ?{" "}
          <span
            onClick={() => {
              history.push("./register");
            }}
          >
            Signup
          </span>
        </p>
        <div>
          {loginError ? <p className="errCreated">{loginError}</p> : ""}
        </div>
      </div>
    </div>
  );
}
