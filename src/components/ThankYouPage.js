import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ThankYouPageStyle.css";

export default function ThankYouPage() {
  const navigate = useNavigate();

  return (
    <div className="thankyou">
      <Typography variant="h5" className="text">
        Thank You For Completing The Experiment!
      </Typography>
      <Button
        className="btnBack"
        variant="standard"
        onClick={() => {
          navigate("/");
        }}
      >
        Back to HomePage
      </Button>
    </div>
  );
}
