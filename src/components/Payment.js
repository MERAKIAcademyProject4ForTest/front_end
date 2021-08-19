import React, { useState } from "react";
import axios from "axios";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "./Payment.css";

export default function Payment() {
  let thisToken = localStorage.getItem("token");
  const newArr = JSON.parse(localStorage.getItem("newArr"));
  const totalPrice = parseInt(localStorage.getItem("totalPrice"));
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focused, setFocused] = useState("");
  const [pay, setPay] = useState(false)

  console.log("newArr", newArr);
  console.log(typeof totalPrice);
  const payNow = () => {
    const date = Date()
      .split(" GMT+0300 (Eastern European Summer Time)")[0]
      .replaceAll(" ", "-");
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_SERVER}order`,
        {
          date,
          products: newArr,
          totalPrice: totalPrice,
        },
        {
          headers: {
            authorization: "Bearer " + thisToken,
          },
        }
      )
      .then((result) => {
        setPay(true)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /*
    
    */
  return (
    <>
      <div>
        <div className="h4">
          <h4>inter your credit Card details to continue with your payment</h4>
        </div>
        <div className="payment-input">
          <div>
            <input
              name="number"
              placeholder="number"
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              onFocus={(e) => {
                setFocused(e.target.name);
              }}
            />
          </div>
          <div>
            <input
              name="name"
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              onFocus={(e) => {
                setFocused(e.target.name);
              }}
            />
          </div>
          <div>
            <input
              name="expiry"
              placeholder="MM/YY expiry"
              onChange={(e) => {
                setExpiry(e.target.value);
              }}
              onFocus={(e) => {
                setFocused(e.target.name);
              }}
            />
          </div>
          <div>
            <input
              name="cvc"
              placeholder="Cvc"
              onChange={(e) => {
                setCvc(e.target.value);
              }}
              onFocus={(e) => {
                setFocused(e.target.name);
              }}
            />
          </div>
        </div>
        <div></div>
        <div>
          <Cards
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
          />
        </div>
        <div className = "button">
          {!pay?<button onClick={payNow}>Confirm Payment</button>:<div>Payment done</div>}
          
        </div>
      </div>
    </>
  );
}
