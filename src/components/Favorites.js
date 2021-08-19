import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import ShowRating from "./ShowRating";
import { AiFillDelete } from "react-icons/ai";
import deleteIcon from "./../../src/delete.png";

export default function Favorites({ token }) {
  const [result, setResult] = useState([]);
  const [info, setInfo] = useState([]);

  let thisToken = localStorage.getItem("token");

  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}favorites`, {
        headers: {
          Authorization: "Bearer " + thisToken,
        },
      })
      .then((response) => {
        setResult(response.data);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [info]);
  const products = result.map((element, i) => {
    const idProduct = element._id;

    return (
      <div className="card">
        <div
          className="card-image"
          onClick={() => {
            history.push(`product/${element._id}`);
          }}
        >
          <img src={element.img} />
        </div>

        <div className="rating"></div>

        <div className="card-description">
          <p className="nameProduct">{element.name}</p>
          <ShowRating rate={Math.round(element.averageRating)} />

          <p className="PriceProduct">{element.price} JD</p>
          <img
            style={{ marginTop: "10px" }}
            src={deleteIcon}
            id="deleteProduct"
            size={27}
            onClick={() => {
              console.log(idProduct);
              axios
                .put(
                  `${process.env.REACT_APP_BACKEND_SERVER}favorites`,

                  {
                    productId: idProduct,
                  },
                  {
                    headers: {
                      authorization: "Bearer " + thisToken,
                    },
                  }
                )
                .then((result) => {
                  setInfo(Math.random());
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          />
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="small-container">
        {" "}
        <h2>My WishList</h2>{" "}
      </div>
      {result.length != 0 ? (
        <div className="category">{products}</div>
      ) : (
        <div className="small-container">
          {" "}
          <h4>You don't have any product </h4>{" "}
        </div>
      )}
    </div>
  );
}
