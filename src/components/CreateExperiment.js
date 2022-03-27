import { React, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Grid, Typography } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Alert, Card, Snackbar, Tooltip } from "@mui/material";
import { createExperiment } from "../api/index.js";
import { useNavigate } from "react-router-dom";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import "./CreateExperiment.css";

export default function CreateExperiment() {
  const defaultType = "singleLine";
  const [questionList, setQuestionList] = useState([
    { questionName: "", questionType: defaultType, questionOptions: ["", ""] },
  ]);

  const [experName, setExperName] = useState("");
  const [showAlert, setShowAlert] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const navigate = useNavigate();

  const handleRadioChange = (e, index) => {
    let list = [...questionList];
    list[index]["questionType"] = e.target.value;
    if (e.target.value !== "MCQ") {
      list[index]["questionOptions"] = ["", ""];
    }
    setQuestionList(list);
  };

  const handleRemoveQuestion = (index) => {
    const list = [...questionList];
    list.splice(index, 1);
    setQuestionList(list);
  };

  const handleAddQuestion = () => {
    setQuestionList([
      ...questionList,
      {
        questionName: "",
        questionType: defaultType,
        questionOptions: ["", ""],
      },
    ]);
  };

  const handleQuestionNameChange = (event, index) => {
    const value = event.target.value;
    let list = [...questionList];
    list[index]["questionName"] = value;
    setQuestionList(list);
  };

  const handleAddOption = (questionIndex) => {
    let list = [...questionList];
    list[questionIndex]["questionOptions"].push("");
    setQuestionList(list);
  };

  const handleDeleteOption = (optionIndex, questionIndex) => {
    const list = [...questionList];
    if (list[questionIndex]["questionOptions"].length > 2)
      list[questionIndex]["questionOptions"].splice(optionIndex, 1);
    setQuestionList(list);
  };

  const handleOptionChange = (e, optionIndex, questionIndex) => {
    const list = [...questionList];
    list[questionIndex]["questionOptions"][optionIndex] = e.target.value;
    setQuestionList(list);
  };

  const handleSubmit = async () => {
    if (experName === "") {
      setShowAlert({
        isOpen: true,
        type: "warning",
        message: "Experiment name is mandatory!",
      });
    } else if (
      questionList.filter(
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
      const experiment = {
        experimentName: experName,
        questions: questionList,
      };

      createExperiment(experiment)
        .then((data) => {
          setShowAlert({
            isOpen: true,
            message: "Create successfully",
            type: "success",
          });
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          setShowAlert({
            isOpen: true,
            message: "Experiment should be unique.",
            type: "warning",
          });
        });
    }
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowAlert({ isOpen: false, type: "", message: "" });
  };

  const hanldeExperNameChange = (event) => {
    setExperName(event.target.value);
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

      <div className="flexContainer">
        <div className="innerFlex">
          <Typography variant="h4">Experiment Name:</Typography>

          <TextField
            id="outlined-experienmentName"
            variant="standard"
            value={experName}
            onChange={(event) => hanldeExperNameChange(event)}
          />

          <div id="questionSection">
            {questionList.map((question, index) => (
              <div className="eachQuestion" key={index}>
                <Card className="card">
                  <Typography variant="h6">Question {index + 1} : </Typography>
                  <TextField
                    className="question"
                    variant="standard"
                    value={question.questionName}
                    onChange={(e) => handleQuestionNameChange(e, index)}
                  ></TextField>
                  <RadioGroup
                    row
                    name={index.toString()}
                    value={question.questionType}
                    onChange={(e) => handleRadioChange(e, index)}
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
                    <div className="mcqSection">
                      <Typography variant="body2">
                        Please add options for your question
                      </Typography>
                      {question.questionOptions.map((option, i) => (
                        <span key={i}>
                          <Typography className="optionLabel" variant="body2">
                            Option {i + 1} :
                          </Typography>
                          <TextField
                            onChange={(e) => handleOptionChange(e, i, index)}
                            variant="standard"
                            value={option}
                          ></TextField>
                          <Button
                            startIcon={<DeleteOutlineIcon />}
                            onClick={() => handleDeleteOption(i, index)}
                          ></Button>
                          {question.questionOptions.length - 1 === i && (
                            <Tooltip placement="top" arrow title="Add Option">
                              <Button
                                startIcon={<AddIcon />}
                                onClick={() => handleAddOption(index)}
                              ></Button>
                            </Tooltip>
                          )}
                        </span>
                      ))}
                    </div>
                  )}
                  {questionList.length > 1 && (
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={() => handleRemoveQuestion(index)}
                      startIcon={<DeleteOutlineIcon />}
                    >
                      Remove
                    </Button>
                  )}
                  {questionList.length - 1 === index && (
                    <Button
                      className="addBtn"
                      color="primary"
                      variant="outlined"
                      onClick={handleAddQuestion}
                      startIcon={<AddIcon />}
                    >
                      Add Question
                    </Button>
                  )}
                </Card>
              </div>
            ))}
          </div>
          <Button
            variant="outlined"
            className="submitBtn"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
