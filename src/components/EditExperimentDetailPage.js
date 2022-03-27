import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Alert,
  Snackbar,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  List,
  Card,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { fetchExperimentByName } from "../api/index.js";
import { useNavigate } from "react-router-dom";
import { updateExperiment } from "../api/index.js";
import "./EditExperimentDetailPageStyle.css";

export default function EditExperimentDetailPage() {
  const { name } = useParams();
  const [experiment, setExperiment] = useState({});

  const [showAlert, setShowAlert] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const defaultType = "singleLine";
  const navigate = useNavigate();

  const getData = async (name) => {
    const data = await fetchExperimentByName(name);
    if (data.status === 200) {
      setExperiment(data.data);
    }
  };

  useEffect(() => {
    getData(name);
  }, []);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert({ isOpen: false, type: "", message: "" });
  };

  const handleUpdateExperiment = (id) => {
    if (experiment.experimentName === "") {
      setShowAlert({
        isOpen: true,
        type: "warning",
        message: "Experiment name is mandatory!",
      });
    } else if (
      experiment.questions.filter(
        (question) =>
          question.questionName === "" ||
          (question.questionType === "MCQ" &&
            question.questionOptions.filter((opt) => opt === "").length > 0)
      ).length > 0
    ) {
      setShowAlert({
        isOpen: true,
        type: "warning",
        message: "All fields are mandatory!",
      });
    } else {
      updateExperiment(id, experiment);
    }
  };

  const handleBackBtn = () => {
    navigate("/");
  };

  const handleDeletOptBtn = (optionIndex, questionIndex) => {
    const list = experiment.questions;
    list[questionIndex]["questionOptions"].splice(optionIndex, 1);
    setExperiment({ ...experiment, questions: list });
  };

  const handleAddOptBtn = (optionIndex, questionIndex) => {
    const list = experiment.questions;
    list[questionIndex]["questionOptions"].push([""]);
    setExperiment({ ...experiment, questions: list });
  };

  const hanldDeleteQuestionBtn = (questionIndex) => {
    const list = experiment.questions;
    list.splice(questionIndex, 1);
    setExperiment({ ...experiment, questions: list });
  };

  const handleQuestionNameChange = (event, questionIndex) => {
    const list = experiment.questions;
    list[questionIndex]["questionName"] = event.target.value;
    setExperiment({ ...experiment, question: list });
  };

  const handleOptTextChange = (event, questionIndex, optionIndex) => {
    const list = experiment.questions;
    list[questionIndex]["questionOptions"][optionIndex] = event.target.value;
    setExperiment({ ...experiment, question: list });
  };

  const handleAddQuestionBtn = () => {
    const list = experiment.questions;
    list.push({
      questionName: "",
      questionType: defaultType,
      questionOptions: ["", ""],
    });
    setExperiment({ ...experiment, question: list });
  };

  const handleExperimentNameChange = (event) => {
    setExperiment({ ...experiment, experimentName: event.target.value });
  };

  const handleRadioChange = (event, questionIndex) => {
    const list = experiment.questions;
    list[questionIndex]["questionType"] = event.target.value;
    setExperiment({ ...experiment, question: list });
  };

  return (
    <div className="flex">
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
      {Object.keys(experiment).length !== 0 && (
        <div className="inner">
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
          <Typography variant="h5">Experiment name</Typography>
          <TextField
            fullWidth
            variant="standard"
            value={experiment.experimentName}
            onChange={(event) => handleExperimentNameChange(event)}
          ></TextField>
          {experiment.questions.map((question, questionIndex) => (
            <div className="questionSection" key={questionIndex}>
              <Card className="cardDisplay">
                <Typography>Question {questionIndex + 1} :</Typography>

                {question.questionName !== "Name" &&
                question.questionName !== "Email address" &&
                question.questionName !== "Phone" ? (
                  <div>
                    <TextField
                      fullWidth
                      variant="standard"
                      value={question.questionName}
                      onChange={(event) =>
                        handleQuestionNameChange(event, questionIndex)
                      }
                    />
                    <RadioGroup
                      onChange={(event) =>
                        handleRadioChange(event, questionIndex)
                      }
                      row
                      defaultValue={question.questionType}
                    >
                      <FormControlLabel
                        value="singleLine"
                        control={<Radio />}
                        label="Single-line text"
                      />
                      <FormControlLabel
                        value="multiLine"
                        control={<Radio />}
                        label="Multi-line text"
                      />
                      <FormControlLabel
                        value="MCQ"
                        control={<Radio />}
                        label="Multiple Choice"
                      />
                    </RadioGroup>
                    {question.questionType === "MCQ" && (
                      <>
                        {question.questionOptions.map((option, optionIndex) => (
                          <div key={optionIndex}>
                            <Typography className="optionLabel" variant="body2">
                              Option {optionIndex + 1} :
                            </Typography>
                            <TextField
                              value={option}
                              variant="standard"
                              onChange={(event) =>
                                handleOptTextChange(
                                  event,
                                  questionIndex,
                                  optionIndex
                                )
                              }
                            ></TextField>

                            {question.questionOptions.length > 2 &&
                              optionIndex > 1 && (
                                <Button
                                  startIcon={<DeleteOutlineIcon />}
                                  onClick={() =>
                                    handleDeletOptBtn(
                                      optionIndex,
                                      questionIndex
                                    )
                                  }
                                ></Button>
                              )}
                            {question.questionOptions.length - 1 ===
                              optionIndex && (
                              <Button
                                startIcon={<AddIcon />}
                                onClick={() =>
                                  handleAddOptBtn(optionIndex, questionIndex)
                                }
                              ></Button>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                    <Button
                      className="btnAdd"
                      variant="outlined"
                      startIcon={<DeleteOutlineIcon />}
                      onClick={() => hanldDeleteQuestionBtn(questionIndex)}
                    >
                      Delete question
                    </Button>
                  </div>
                ) : (
                  <TextField
                    fullWidth
                    variant="standard"
                    value={question.questionName}
                    disabled
                  />
                )}

                {experiment.questions.length - 1 === questionIndex && (
                  <Button
                    className="btnAdd"
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddQuestionBtn}
                  >
                    Add questions
                  </Button>
                )}
              </Card>
            </div>
          ))}
          <div className="btnGroup">
            <Button
              variant="outlined"
              onClick={() => handleUpdateExperiment(experiment._id)}
            >
              Update
            </Button>
            <Button variant="outlined" onClick={handleBackBtn}>
              Back
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
