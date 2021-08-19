import { React, useState, useEffect } from "react";
import Rating from "./Rating";
import axios from "axios";
import jwt  from 'jsonwebtoken';
import { useHistory, useParams } from "react-router-dom";
import ShowRating from "./ShowRating";
import { AiOutlineHeart,AiFillDelete,AiFillHeart } from "react-icons/ai";


export default function Product({ token }) {
  const { id } = useParams();
  const [result, setResult] = useState([]);
  const [info, setInfo] = useState([]);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [incart, setIncart] = useState(false);
  const [inFav, setInFav] = useState(false);
  const [userRateThisProduct, setUserRateThisProduct] = useState(false);
  const [userRate, setUserRate] = useState(null);
  const idProduct = result._id;
  const thisToken = localStorage.getItem("token");
  const thisRole = localStorage.getItem("role");
  const resultImg = JSON.parse(localStorage.getItem("userInfo"));
const [userId, setUserId] = useState("")  
const getUserId = ()=>{
try {
  setUserId( jwt.verify(thisToken,"secretKey").userId)
  console.log("userId",userId);
}
catch(err){
  console.log(err);
}
  }
  const addComment = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_SERVER}products/${id}/comments`,
        {
          comment,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((result) => {
        setInfo(Math.random());
        document.getElementById("textArea-comment").value = "";
      })
      .catch((err) => {
        if (err) {
          setMessage("you need to login first");
        }
      });
  };

  const deleteComment =(commentId)=>{
    axios.delete(`${process.env.REACT_APP_BACKEND_SERVER}products/${id}/comments/${commentId}`
    ).then((result) => {
      setInfo(Math.random());
    })
    .catch((err) => {
      console.log(err);
    });
    }
    

  const addFavorite = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_SERVER}favorites`,
        {
          productId: result._id,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((result) => {
        setInfo(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteFav = () => {
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
        setInfo(1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addCart = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_SERVER}cart`,
        {
          productId: result._id,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((result) => {
        setIncart(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserId()
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}products/id/${id}`)
      .then((response) => {
        setResult(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}favorites/${id}`, {
        headers: {
          Authorization: "Bearer " + thisToken,
        },
      })
      .then((result) => {
        if (result.data === "found") {
          setInFav(true);
          setInfo(0);
        } else {
          setInFav(false);
          setInfo(1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}rating/products/${id}`, {
        headers: {
          Authorization: "Bearer " + thisToken,
        },
      })
      .then((result) => {
        if (result.data.found === "found") {
          setUserRate(result.data.rate);
          setUserRateThisProduct(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [info]);

  let allComment = "";
  if (result.comment) {
    allComment = result.comment.map((element, i) => {
      console.log("comment info ",element.commenter._id);
      console.log("user",userId);
      return (
        <div className="bottom-section-comment">
          <div className="bottom-section-comment-img">
            <img
              width="50px"
              height="50px"
              src="data:image/png;base64,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"
            />
          </div>
          <div className="bottom-section-comment-info">
            <p id="first-name">{element.commenter.firstName}</p>
            <p id="comment">{element.comment}</p>
            {element.commenter._id == userId ? <AiFillDelete className="delete-comment-im" size={25}  onClick={()=>{
              deleteComment(element._id)
            }}/>:""}
          </div>
        </div>
      );
    });
  }
  return (
    <>
      <div className="product-view">
        <div className="top-section bottom-margin">
          <div className="top-img">
            <img src={result.img} />
          </div>
          <div className="top-info">
            <p id="name-product">{result.name}</p>
            <span style={{ fontWeight: "bold" }}>Details </span>
            {result.description}
            {!userRateThisProduct ? (
              <Rating
                idProduct={idProduct}
                thisToken={thisToken}
                setInfo={setInfo}
              />
            ) : (
              <ShowRating rate={userRate} />
            )}
            {!incart ? (
              <button id="add-cart" onClick={addCart}>
                Add Cart{" "}
              </button>
            ) : (
              ""
            )}
          </div>
          {!inFav ? (
            <AiOutlineHeart
              icon="heart"
              id="add-favorite"
              onClick={addFavorite}
            />
          ) : (
            ""
          )}
          {inFav ? (
            <AiFillHeart icon="heart" id="delete-fav" onClick={deleteFav} />
          ) : (
            ""
          )}
        </div>

        <div className="bottom-section">
          <textarea
            id="textArea-comment"
            placeholder="Add Your Comment"
            type="text"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />

          <button id="add-comment" onClick={addComment}>
            Comment
          </button>
          {message ? <p>{message}</p> : ""}
          <div id="comment"> {allComment}</div>
        </div>
      </div>
    </>
  );
}
