import React, { useState,useEffect } from "react";
import axios from "axios";
import { Switch, Route, Link, useParams, useHistory } from "react-router-dom";

// const result = JSON.parse(localStorage.getItem("userInfo"));

const EditUserInfo = () => {
  const history = useHistory();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("")
  const [result, setResult] = useState("")
  let thisToken = localStorage.getItem("token");
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_SERVER}user/id`,    {
      headers: {
        authorization: "Bearer " + thisToken,
      },
    }).then(result=>{
      setResult(result.data)
      setLastName(result.data.lastName)
      setFirstName(result.data.setFirstName)
      setAge(result.data.setAge)
      setPhoneNumber(result.data.setPhoneNumber)
      setGender(result.data.setGender)
      setCountry(result.data.setCountry)
      setEmail(result.data.email)
    }).catch(err=>{
      console.log(err);
    })
    
    }
  , [])
  const modifyInfo = () => {
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_SERVER}user/editUser`,

        {
          firstName,
          lastName,
          age,
          phoneNumber,
          gender,
          country,
        },

        {
          headers: {
            authorization: "Bearer " + thisToken,
          },
        }
      )
      .then((result) => {
        history.push("/profile");
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="edit-info">
      {result ? <div>
        <p id="your-information"> Edit Your Profile</p>

      <div className="user-info1">
        <div class="info-s">
          <span> first Name: </span>
          <br />
          <span> Last Name: </span>
          <br />
          <span>age: </span>
          <br />
          <span>Phone Number: </span>
          <br />
          <span>Email: </span>
          <br />
          <span>Gender: </span>
          <br />
          <span>country:</span>
        </div>
        <div className="input-edit">
          <input
            placeholder={result.firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />{" "}
          <input
            placeholder={result.lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />{" "}
          <input
            placeholder={result.age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />{" "}
          <input
            placeholder={result.phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />{" "}
          <input id="email" value={email} />
          <input
            placeholder={result.gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
          />{" "}
          <input
            placeholder={result.country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
          <br />
          <button onClick={modifyInfo}>Update</button>
        </div>
      </div> </div>:"" }
    </div>
  );
};

export default EditUserInfo;
