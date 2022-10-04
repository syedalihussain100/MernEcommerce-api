import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@mui/material";
import { LinkedIn, Facebook } from "@mui/icons-material";

const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.linkedin.com/in/muheminali/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://avatars.githubusercontent.com/u/59026436?v=4"
              alt="Founder"
            />
            <Typography>Syed Muhemin ALi</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit LinkedIn
            </Button>
            <span>This is a sample wesbite made by @smuheminali</span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a href="https://www.facebook.com/zaid.roy.3386/" target="blank">
              <Facebook className="youtubeSvgIcon" />
            </a>

            <a href="https://www.linkedin.com/in/muheminali/" target="blank">
              <LinkedIn className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
