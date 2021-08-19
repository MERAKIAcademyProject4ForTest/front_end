import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import ShowRating from "./ShowRating";

export default function Category({ token }) {
  const [filterVal, setFilterVal] = useState("");
  const [result, setResult] = useState([]);
  const { type } = useParams();
  const history = useHistory();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}products/type/${type}`)
      .then((result) => {
        setResult(result.data);
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
          history.push(`product/${element._id}`);
        }}
      >
        <div className="card-image">
          <img src={element.img} />
        </div>
        <div className="card-description">
          <p className="nameProduct">{element.name}</p>
          <ShowRating rate={Math.round(element.averageRating)} />
          <p className="PriceProduct">{element.price} JD</p>
        </div>
      </div>
    );
  });

  const searchFilter = (price) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}products/filter/${type}/${price}`)
      .then((result) => {
        setResult(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="CategoryContainer">
      <div className="searchFilter">
        <div className="radioStyle">
          <select
            onChange={(e) => {
              searchFilter(e.target.value);
            }}
          >
            <option
              value={10}
              // style={{ display: "initial" }}
              onSelect={() => {
                setFilterVal(10);
              }}
            >
              Under 10 JD
            </option>
            <option
              value={20}
              // style={{ display: "initial" }}
              onSelect={() => {
                setFilterVal(20);
              }}
            >
              Under 20 JD
            </option>
            <option
              value={50}
              // style={{ display: "initial" }}
              onSelect={() => {
                setFilterVal(50);
              }}
            >
              Under 50 JD
            </option>
            <option
              value={10000}
              // style={{ display: "initial" }}
              onSelect={() => {
                setFilterVal(10000);
              }}
              selected
            >
              All Price
            </option>
          </select>

          {/* <button onClick={searchFilter}>Search</button> */}
        </div>
      </div>
      <div className="category"> {products}</div>
      <div className="categoryAds">
        <div className="ads"></div>
        <div className="ads"></div>
        <div className="ads"></div>
      </div>
    </div>
  );
}
