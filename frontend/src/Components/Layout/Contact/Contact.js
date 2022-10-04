import React from "react";
import "./Contact.css";
import { Button } from "@mui/material";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:smuheminali@gmail.com">
        <Button>Contact: mymailforsmuheminali@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
