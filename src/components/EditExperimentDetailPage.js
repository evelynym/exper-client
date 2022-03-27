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
} from "@mui/material";
import { fetchExperimentByName } from "../api/index.js";
import { useNavigate } from "react-router-dom";
import { updateExperiment } from "../api/index.js";

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
    updateExperiment(id, experiment);
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
    <div>
      {Object.keys(experiment).length !== 0 && (
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
          <Typography>Experiment name</Typography>
          <TextField
            value={experiment.experimentName}
            onChange={(event) => handleExperimentNameChange(event)}
          ></TextField>
          {experiment.questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              {console.log(experiment)}
              <Typography>Question</Typography>

              {question.questionName !== "Name" &&
              question.questionName !== "Email address" &&
              question.questionName !== "Phone" ? (
                <div>
                  <TextField
                    value={question.questionName}
                    onChange={(event) =>
                      handleQuestionNameChange(event, questionIndex)
                    }
                  />
                  <Button onClick={() => hanldDeleteQuestionBtn(questionIndex)}>
                    Delete question
                  </Button>
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
                </div>
              ) : (
                <TextField value={question.questionName} disabled />
              )}

              {console.log(question)}
              {question.questionType === "MCQ" && (
                <div>
                  {question.questionOptions.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <TextField
                        value={option}
                        onChange={(event) =>
                          handleOptTextChange(event, questionIndex, optionIndex)
                        }
                      ></TextField>
                      {question.questionOptions.length > 2 && optionIndex > 1 && (
                        <div>
                          <Button
                            onClick={() =>
                              handleDeletOptBtn(optionIndex, questionIndex)
                            }
                          >
                            Delete option
                          </Button>
                          <Button
                            onClick={() =>
                              handleAddOptBtn(optionIndex, questionIndex)
                            }
                          >
                            Add option
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {experiment.questions.length - 1 === questionIndex && (
                <Button onClick={handleAddQuestionBtn}>Add questions</Button>
              )}
            </div>
          ))}
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
      )}
    </div>
  );
}
