import React from "react";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Typography,
  Grid,
  Paper,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import "./ShowQuestionItemsStyle.css";

export default function ShowQuestionItems({
  question,
  questionIndex,
  onChange,
}) {
  const typeSwitch = (questionType, questionOption, questionName) => {
    switch (questionType) {
      case "singleLine":
        return questionName === "Phone" ? (
          <TextField
            className="input"
            type="number"
            onChange={(e) => onChange(e.target.value)}
          ></TextField>
        ) : (
          <TextField
            className="input"
            onChange={(e) => onChange(e.target.value)}
          ></TextField>
        );

      case "multiLine":
        return (
          <TextField
            className="input"
            multiline
            onChange={(e) => onChange(e.target.value)}
          ></TextField>
        );

      case "MCQ":
        return (
          <RadioGroup
            className="input"
            name="radio-buttons-group"
            onChange={(e) => onChange(e.target.value)}
          >
            {questionOption.length > 0 &&
              questionOption.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
          </RadioGroup>
        );
      default:
        return <div>single</div>;
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="questionContainer">
      <div className="nameContainer">
        <Typography>
          Question {questionIndex + 1}. {question.questionName}
        </Typography>
      </div>
      <div className="inputContainer">
        {typeSwitch(
          question.questionType,
          question.questionOptions,
          question.questionName
        )}
      </div>
    </div>
  );
}
