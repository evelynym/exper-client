import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import "./HeaderStyle.css";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleAddBtn = () => {
    navigate("/createNewExperiment");
  };

  return (
    <div className="navbar-container">
      <div className="nav-left">
        <a className="width" href="/">
          <img
            id="main-img"
            src="https://assets-global.website-files.com/613866b997a5596e75141c49/61386910ca9036bd6f31fe06_Logo-horizontal-c.svg"
            alt="Doorsteps Logo"
          />
        </a>
        <Typography className="headerTitle width">
          Experiment Management System
        </Typography>
      </div>

      {location.pathname !== "/createNewExperiment" && (
        <Button className="width" variant="standard" onClick={handleAddBtn}>
          Add new
        </Button>
      )}
    </div>
  );
}
