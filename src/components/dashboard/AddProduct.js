import axios from "axios";
import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Dashboard() {
  const history = useHistory();
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [role, setRole] = useState("");
  const [error, setError] = useState(false);
  const [result, setResult] = useState([]);
  const [totalRating, setTotalRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [rating, setRating] = useState(0);

  const addProduct = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_SERVER}products`, {
        type,
        name,
        price,
        img,
        description,
        quantity,
        role,
        rating,
        totalRating,
        averageRating,
      })
      .then((result) => {
        if (!result.data.errors) {
          history.push("/dashboard");
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
    <> <button onClick={()=>{  history.goBack()}} > go back</button>
      <div className="dashAdd">
        <label>Product Information</label>
        <div className="addCont">
          <input
            className="dashInput"
            type="text"
            placeholder="type"
            onChange={(e) => {
              setType(e.target.value);
            }}
          />
          <input
            className="dashInput"
            type="text"
            placeholder="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            className="dashInput"
            type="text"
            placeholder="price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <input
            className="dashInput"
            type="text"
            placeholder="img"
            onChange={(e) => {
              setImg(e.target.value);
            }}
          />
          <input
            className="dashInput"
            type="text"
            placeholder="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <input
            className="dashInput"
            type="text"
            placeholder="Quantity"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </div>
        <div>
          <button className="dahsBtnAdd" onClick={addProduct}>
            add product
          </button>
        </div>
      </div>
    </>
  );
}
