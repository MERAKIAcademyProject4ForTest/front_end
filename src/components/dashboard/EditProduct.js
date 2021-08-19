import axios from "axios";
import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function EditProduct({token}) {
const [idValue, setIdValue] = useState("")
const [description, setDescription] = useState("")
const [quantity, setQuantity] = useState("")
const [type, setType] = useState("")
const [name, setName] = useState("")
const [price, setPrice] = useState("")
const [img, setImg] = useState("")
const thisToken = localStorage.getItem("token");
const history = useHistory();

const findId = ()=>{
   axios.get(`${process.env.REACT_APP_BACKEND_SERVER}products/id/${idValue}`)
    .then((result)=>{
        console.log(result);
        setDescription(result.data.description)
        setQuantity(result.data.quantity)
        setType(result.data.type)
        setName(result.data.name)
        setPrice(result.data.price)
        setImg(result.data.img)
    }).catch((err)=>{
        console.log(err);
    })
}
console.log(thisToken);
const edit = ()=>{
    axios
    .put(
      `${process.env.REACT_APP_BACKEND_SERVER}products/id/${idValue}`,
  
      {
        description:description ,
        quantity:quantity,
        type:type,
        name:name,
        price:price,
        img:img,
      },
      {
        headers: {
          Authorization: "Bearer " + thisToken,
        }
      }
    )
    .then((result) => {
      history.push("/dashboard")
        console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const deletBtn = ()=>{
      axios.delete(`${process.env.REACT_APP_BACKEND_SERVER}products/id/${idValue}`)
      .then((result)=>{
        history.push("/dashboard")
      }).catch((err)=>{
          console.log(err);
      })
      
  }
  //jxs html +javascript
    return ( <>
    <button onClick={()=>{  history.goBack()}} > go back</button>
      <div className="updateCont">
        <div className="findId">
        <input  className ="inputFind"placeholder="Product ID" onChange={(e)=>{
             setIdValue(e.target.value) 
           }}></input>
           <button className="findBtn" onClick={findId}>find product</button>
        </div>
             <div className="areaUpdate">
           <label style={{fontWeight:"bold"}}>Description:</label>
           <textarea className="textEdit"  placeholder={description} onChange={(e)=>{
                   setDescription(e.target.value)
               }}></textarea>
               <label style={{fontWeight:"bold"}}>Quantity:</label>
               <textarea className="textEdit" placeholder={quantity} onChange={(e)=>{
                   setQuantity(e.target.value)
               }}></textarea>
               <label style={{fontWeight:"bold"}}>Type:</label>
               <textarea className="textEdit"   placeholder={type} onChange={(e)=>{
                   setType(e.target.value)}}></textarea>

               <label style={{fontWeight:"bold"}}>Name:</label>
               <textarea className="textEdit" placeholder={name} onChange={(e)=>{
                   setName(e.target.value)}}></textarea>

               <label style={{fontWeight:"bold"}}>Price:</label>
               <textarea className="textEdit" placeholder={price} onChange={(e)=>{
                   setPrice(e.target.value)}}></textarea>
               <label style={{fontWeight:"bold"}}>Img:</label>
               <textarea className="textEdit"placeholder= {img} onChange={(e)=>{
                   setImg(e.target.value)}}></textarea>
                   </div>
                   <div className="editBtns">
               <button onClick={edit}>Edit</button>
               <button onClick={deletBtn}>Delete</button>
               </div>
           </div>
   
        
    </>)
}
