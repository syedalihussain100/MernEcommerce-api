import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import { FaUserAlt, FaSistrix, FaCartPlus } from "react-icons/fa";

function Header() {
  return (
    <ReactNavbar
      navColor1="white"
      //  burgerColor="gray"
      burgerColorHover="#eb4034"
      logo={logo}
      logoWidth="20vmax"
      logoHoverColor="#eb4034"
      logoHoverSize= "10px"
      link1Text="Home"
      link2Text="Products"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      link2Url="/products"
      link3Url="/contact"
      link4Url="/about"
      link1ColorHover="#eb4034"
      link1Margin="1vmax"
      link1Color="rgba(35, 35, 35,0.8)"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      nav4justifyContent="flex-start"
      link1Size="1.5vmax"
      link1Padding="3vmax"
      profileIcon={true}
      searchIcon={true}
      cartIcon={true}
      ProfileIconElement={FaUserAlt}
      SearchIconElement={FaSistrix}
      CartIconElement={FaCartPlus}
      profileIconColor="rgba(35, 35, 35,0.8)"
      profileIconUrl="/login"
      profileIconColorHover="#eb4034"
      searchIconColor="rgba(35, 35, 35,0.8)"
      cartIconColor="rgba(35, 35, 35,0.8)"
      searchIconColorHover="#eb4034"
      cartIconColorHover="#eb4034"
      cartIconMargin="3vmax"
    />
  );
}

export default Header;
