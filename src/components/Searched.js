import axios from "axios";
import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useParams, useHistory } from "react-router-dom";

export default function Searched() {
  const { name } = useParams();
  const [result, setResult] = useState([]);
  const history = useHistory();
  console.log(`name  ${name}`);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}products/name/${name}`)
      .then((res) => {
        setResult(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const products = result.map((element, i) => {
    return (
      <div
        className="card"
        onClick={() => {
          history.push(`/product/${element._id}`);
        }}
      >
        <div className="card-image">
          <img src={element.img} />
        </div>

        <div className="rating"></div>

        <div className="card-description">
          <p className="nameProduct">Name:{element.name}</p>
          <p className="PriceProduct">Price:{element.price}</p>
        </div>
      </div>
    );
  });

  return <div className="category">{products}</div>;
}
