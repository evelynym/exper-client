import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import { fetchExperiments, deleteExperimentById } from "../api/index.js";

import "./HomePageStyle.css";

export default function HomePage() {
  const navigate = useNavigate();
  const [experimentList, setExperimentList] = useState([]);
  const [showAlert, setShowAlert] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const getData = async () => {
    const data = await fetchExperiments();
    if (data.status === 200) {
      setExperimentList(data.data);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const hanleEditBtn = (name) => {
    navigate(`/editExperiment/${name}`);
  };

  const handleClickViewBtn = (name) => {
    navigate(`/experimentDetailPage/${name}`);
  };

  const handleDeleteBtn = async (_id) => {
    const data = await deleteExperimentById(_id);
    if (data.status === 200) {
      setShowAlert({
        isOpen: true,
        message: "Delete successfully",
        type: "success",
      });
      getData();
    } else if (data.status === 409) {
      <Alert variant="filled" severity="error">
        This is an error alert — check it out!
      </Alert>;
    }
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowAlert({ isOpen: false, type: "", message: "" });
  };

  return (
    <div>
      <Snackbar
        open={showAlert.isOpen}
        autoHideDuration={3000}
        onClose={handleAlertClose}
      >
        <Alert
          severity={showAlert.type}
          sx={{ width: "100%" }}
          onClose={handleAlertClose}
        >
          {showAlert.message}
        </Alert>
      </Snackbar>

      <div className="experiment-container">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">No.</TableCell>
                <TableCell align="center">Experiment Name</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/** make sure data is loaded*/}
              {experimentList &&
                experimentList.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{item.experimentName}</TableCell>
                    <TableCell align="center">
                      <Button
                        className="btn"
                        variant="outlined"
                        onClick={() => hanleEditBtn(item.experimentName)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="btn"
                        variant="outlined"
                        onClick={() => handleDeleteBtn(item._id)}
                      >
                        Delete
                      </Button>
                      <Button
                        className="btn"
                        variant="outlined"
                        onClick={() => handleClickViewBtn(item.experimentName)}
                      >
                        view
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
