import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useParams, useHistory } from "react-router-dom";

import axios from "axios";
import { CgInsertAfterO } from "react-icons/cg";
import profileFemale from "./../../src/profile-female.png";
import profileMen from "./../../src/profile-men.png";
import { FaUserEdit } from "react-icons/fa";

const Profile = () => {
  const [result, setResult] = useState([]);
  const [myOrder, setMyOrder] = useState([]);
  const history = useHistory();

  const [Date, setDate] = useState("");

  let thisToken = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}user/id/`, {
        headers: {
          authorization: "Bearer " + thisToken,
        },
      })
      .then((result) => {
        setResult(result.data);
        localStorage.setItem("userInfo", JSON.stringify(result));
      })
      .catch((err) => {
        // console.log(err);
      });

    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}order`, {
        headers: {
          authorization: "Bearer " + thisToken,
        },
      })
      .then((result) => {
        setMyOrder(result.data);
      })
      .catch((err) => {});
  }, []);

  const a = myOrder.map((element, i) => {
    return (
      <div>
        <p id="order-number"># {i + 1} Order</p>
        <div className="user-info">
          <div id="order">
            <div class="inf">
              <p>
                {" "}
                <span> date: </span>
                {element.date}{" "}
              </p>

              <p>
                {" "}
                <span> Total Price: </span>
                {element.totalPrice}{" "}
              </p>
            </div>

            <p class="product-info">
              {" "}
              <span> Order Info: </span>
            </p>
            {element.products.map((ele, i) => {
              return (
                <div class="info-order">
                  <p>#{i + 1}</p>

                  <div class="img-order">
                    <img src={ele.product.img} height={50} width={50} />
                  </div>

                  <div class="product-information">
                    <p>{ele.product.name}</p>
                    <p>{ele.product.price} JD </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <hr />
      </div>
    );
  });

  return (
    <div className="profile">
      <div>
        <img
          src={result.gender == "male" ? profileMen : profileFemale}
          height={200}
          width={200}
        />
        <FaUserEdit
          size={35}
          color={"#131921"}
          cursor={"pointer"}
          onClick={() => {
            history.push("profile/edit");
          }}
        />
      </div>
      <div className="information">
        <p id="your-information">Your Profile</p>

        <div className="user-info">
          <div className="info">
            <p>
              <span> Full Name: </span>
              {result.firstName} {result.lastName}
            </p>
            <p>
              {" "}
              <span>age: </span>
              {result.age}
            </p>
            <p>
              {" "}
              <span>Phone Number: </span>
              {result.phoneNumber}
            </p>
            <p>
              {" "}
              <span>Email: </span>
              {result.email}
            </p>
            <p>
              {" "}
              <span>Gender:</span> {result.gender}
            </p>
            <p>
              {" "}
              <span>country:</span> {result.country}
            </p>
          </div>
        </div>
      </div>{" "}
      <div className="information scroll">
        <p id="your-information">Your Orders</p>
        {myOrder.length ? a : 
        <div className ="user-with-no-order">
          <h4>You don't have any previous order </h4> </div> }
      </div>
    </div>
  );
};

export default Profile;
