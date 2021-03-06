import React from "react";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
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
