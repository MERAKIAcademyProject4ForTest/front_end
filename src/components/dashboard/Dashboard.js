import axios from "axios";
import { React, useState } from "react";
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
      })
      .then((result) => {
        if (!result.data.errors) {
          history.push("/products");
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
    <>
      <div className="dashboard">Dashboard component</div>
      <input
        type="text"
        placeholder="type"
        onChange={(e) => {
          setType(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="price"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="img"
        onChange={(e) => {
          setImg(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Quantity"
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
      />
      <button className="dahsBtn" onClick={addProduct}>add product</button>
      <input placeholder="Add product" />
    </>
  );
}
