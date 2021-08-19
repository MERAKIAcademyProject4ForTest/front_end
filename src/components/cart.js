import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import priceIcon from "./../../src/price.png";
import deleteIcon from "./../../src/delete.png";

export default function Cart({ token }) {
  const [result, setResult] = useState([]);
  const [tot, setTot] = useState(0);
  const [total, setTotal] = useState(0);
  let [totalQuantity, setTotalQuantity] = useState(tot);
  let thisToken = localStorage.getItem("token");
  const history = useHistory();
  const arr = [];

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}cart`, {
        headers: {
          Authorization: "Bearer " + thisToken,
        },
      })
      .then((response) => {
        setResult(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const createOrder = () => {
    history.push("/payment");

    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
      let found = false;
      for (let b = 0; b < newArr.length; b++) {
        if (arr[i].product === newArr[b].product) {
          found = true;
        }
      }
      if (!found) {
        newArr.push({ product: arr[i].product, Quantity: 1 });
      }
    }

    localStorage.setItem("newArr", JSON.stringify(newArr));
  };

  const Product = (element) => {
    const [price, setPrice] = useState(0);
    let [quantity, setQuantity] = useState(1);
    let [subTotal, setSubTotal] = useState(element.props.price * quantity);
    const [counter, setCounter] = useState(1);

    arr.push({ product: element.props._id, Quantity: quantity });

    return (
      <tr className="product">
        <td>
          <div className="cart-info-2">
            <img
              id="deleteProduct"
              src={deleteIcon}
              onClick={() => {
                axios
                  .put(
                    `${process.env.REACT_APP_BACKEND_SERVER}cart`,
                    {
                      productId: element.props._id,
                    },
                    {
                      headers: {
                        authorization: "Bearer " + thisToken,
                      },
                    }
                  )
                  .then((result) => {
                    console.log(result);
                    window.location.reload();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            />
            <div
              className="cart-info"
              key={element._id}
              onChange={(e) => {}}
              onClick={() => {
                history.push(`product/${element.props._id}`);
              }}
            >
              <img src={element.props.img} />
              <div>
                <p>{element.props.name}</p>
                <small>
                  {" "}
                  <img src={priceIcon} /> {element.props.price} JD
                </small>
              </div>
            </div>
          </div>
        </td>
        <td id="quantity-counter">
          <p
            class="counter"
            onClick={() => {
              setCounter(quantity + 1);
              setQuantity(counter);
              setTot(element.props.price * quantity + tot);
              setTotalQuantity((totalQuantity += quantity));
              setSubTotal(element.props.price * quantity);
            }}
          >
            +
          </p>
          <input
            type="number"
            defaultValue="1"
            min="1"
            value={counter > 0 ? counter : 1}
            max={`${element.props.quantity}`}
            onChange={(e) => {
              setQuantity(counter);
              setTot(element.props.price * quantity + tot);
              setTotalQuantity((totalQuantity += quantity));
              setSubTotal(element.props.price * quantity);
            }}
            readOnly
          />
          <p
            class="counter"
            onClick={() => {
              setCounter(quantity - 1);
              setQuantity(counter);
              setTot(element.props.price * quantity - tot);
              setTotalQuantity((totalQuantity -= quantity));
              setSubTotal(element.props.price * quantity);
            }}
          >
            -
          </p>
        </td>

        <td>{subTotal} JD</td>
      </tr>
    );
  };

  const cartUser = result.map((element, i) => {
    return <Product props={element} />;
  });

  const totalPrice = result.reduce((acc, element) => acc + element.price, 0);
  console.log(totalPrice);
  localStorage.setItem("totalPrice", totalPrice + tot);

  return (
    <div className="small-container cart-page">
      <h2>My Cart</h2>
      {
        <table>
          <tbody>
            <tr>
              <th id="pr">Products</th>
              <th id="qa">Quantity</th>
              <th>Subtotal</th>
            </tr>
            {cartUser.length > 0 ? (
              cartUser
            ) : (
              <h3 id="not-found"> You don't have any product</h3>
            )}
          </tbody>
        </table>
      }
      <div className="total-price">
        <table>
          <tbody>
            <tr>
              <td>Total</td>
              <td>{tot + totalPrice} JD</td>
            </tr>

            <tr>
              <small onClick={createOrder} className="btn-checkout">
                Checkout
              </small>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
