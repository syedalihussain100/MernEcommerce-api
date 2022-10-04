import React from "react";
import "./Footer.css";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/app.png";

function Footer() {
  return (
    <footer id="footer">
      <div className="leftFoot">
        <h4>DOWNLOAD OUR APP</h4>
        <p>download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="Android" />
        <img src={appStore} alt="AppStore" />
      </div>
      <div className="middleFoot">
        <h1>ECOMMERCE</h1>
        <p>High Qualityis our first pripority</p>

        <p>Copyrights 2022 &copy; Syed Muhemin Ali</p>
      </div>
      <div className="rightFoot">
        <h4>Follow Us</h4>
        <a href="https://github.com/syedalihussain100">Github</a>
        <a href="https://www.linkedin.com/in/muheminali/">LinkedIn</a>
        <a href="https://www.facebook.com/zaid.roy.3386">Facebook</a>
      </div>
    </footer>
  );
}

export default Footer;
