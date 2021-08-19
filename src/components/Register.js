import { React, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Logo from "./../../src/logo.png";

export default function Register() {
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("60c37c7799e28e1e3453d414");
  const [error, setError] = useState(false);
  const rigister = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_SERVER}user/createUser`, {
        firstName,
        lastName,
        age,
        gender,
        country,
        phoneNumber,
        email,
        password,
        role,
      })
      .then((result) => {
        if (!result.data.errors) {
          history.push("/login");
        } else {
          setError(true);
          console.log(result.data.errors);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="containerDiv">
      {/* <p>Register</p> */}
      <img src={Logo} height={170}></img>

      <div className="registerDiv">
        <input
          className="registerInput"
          type="text"
          placeholder="First Name"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <input
          className="registerInput"
          type="text"
          placeholder="Last Name"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <input
          className="registerInput"
          type="Number"
          placeholder="Age"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <select
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <option>select a gender...</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        {/* <input
          className="registerInput"
          type="text"
          placeholder="Gender"
          onChange={(e) => {
            setGender(e.target.value);
          }}
        /> */}
        <input
          className="registerInput"
          type="text"
          placeholder="Country"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
        <input
          className="registerInput"
          type="text"
          placeholder="Phone"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        <input
          className="registerInput"
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
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
        <button className="registerBtn" onClick={rigister}>
          Register
        </button>
        <p>
          Do you have account ?
          <span
            onClick={() => {
              history.push("./login");
            }}
          >
            Login
          </span>
        </p>
        {error ? (
          <div className="error">
            Error happened while register, please try again
          </div>
        ) : null}
      </div>
    </div>
  );
}
