import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory, Route, Redirect } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./css/homePage.css"



export default function Home() {
  const [slideImages, setslideImages] = useState([]);

  const history = useHistory();
  const moveToMen = () => {
    history.push("/men");
  };
  const moveToKids = () => {
    history.push("/kid");
  };
  const moveToWomen = () => {
    history.push("/women");
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}slider`)
      .then((result) => {
        setslideImages(result.data.picsAddress);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // end of slider show
  //Fotter section//
  const moveToAboutUs = () => {
    history.push("/aboutUs");
  };
  const moveToReturnP = () => {
    history.push("/returnPolicy");
  };
  const moveToOurStaff = () => {
    history.push("/ourStaff");
  };
  const moveToPrivacy = () => {
    history.push("/privacyandPolicy");
  };
  const moveToContactUs = () => {
    history.push("/contactUs");
  };
  return (
    <div>
      <div className="Navigation-child-bottom">
        
          <div className="catigoryBar" onClick={moveToMen}>Men    </div>
          <div className="catigoryBar" onClick={moveToKids}>Kids  </div>
          <div className="catigoryBar" onClick={moveToWomen}>Women</div>
        
      </div>

      <div className="slide-container">
        <Slide>
          <div className="each-slide">
            <div
              className="imageSlider"
              style={{ backgroundImage: `url(${slideImages[0]})` }}
            ></div>
          </div>
          <div className="each-slide">
            <div
              className="imageSlider"
              style={{ backgroundImage: `url(${slideImages[1]})` }}
            ></div>
          </div>
          <div className="each-slide">
            <div
              className="imageSlider"
              style={{ backgroundImage: `url(${slideImages[2]})` }}
            ></div>
          </div>
          <div className="each-slide">
            <div
              className="imageSlider"
              style={{ backgroundImage: `url(${slideImages[3]})` }}
            ></div>
          </div>
          <div className="each-slide">
            <div
              className="imageSlider"
              style={{ backgroundImage: `url(${slideImages[4]})` }}
            ></div>
          </div>
        </Slide>
      </div>
      <div className="homebody">
        <div
          className="sectionNavBody"
          onClick={moveToMen}
          style={{
            backgroundImage: `url(https://jade-media.jadeblue.com/media/wysiwyg/jadeblue/jadeblue-new.jpg)`,
          }}
        ></div>
        <div
          className="sectionNavBody"
          onClick={moveToKids}
          style={{
            backgroundImage: `url(https://i.pinimg.com/originals/61/47/12/614712f5f6f0ea8e80c77e9ed9bc2359.jpg)`,
          }}
        ></div>
        <div
          className="sectionNavBody"
          onClick={moveToWomen}
          style={{
            backgroundImage: `url(https://cdn.shopify.com/s/files/1/0020/9544/8117/files/VOF_Veil_of_Faith_Banners_6002dce5-18be-40d8-811d-94bc50beda18_x800.png?v=1622703826)`,
          }}
        ></div>
      </div>
      <div>
        <div className="homefooter">
          <div style={{ cursor: "pointer" }} onClick={moveToAboutUs}>
            About Us
          </div>
          <div style={{ cursor: "pointer" }} onClick={moveToReturnP}>
            Return Policy
          </div>
          <div style={{ cursor: "pointer" }} onClick={moveToOurStaff}>
            Our Staff
          </div>
          <div style={{ cursor: "pointer" }} onClick={moveToPrivacy}>
            Privacy & Policys
          </div>
          <div style={{ cursor: "pointer" }} onClick={moveToContactUs}>
            Contact Us
          </div>
        </div>
      </div>
    </div>
  );
}
