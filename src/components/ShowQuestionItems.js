import React from 'react'
import {RadioGroup,FormControlLabel,Radio, TextField} from '@mui/material';

export default function ShowQuestionItems({
  question, 
  onChange
}) {
  
  const typeSwitch = (questionType,questionOption,questionName) =>{

    switch (questionType) {     
      case "singleLine":
        
        return questionName === "Phone" 
        ? <TextField type="number" onChange={(e) => onChange(e.target.value)}></TextField> 
        : <TextField onChange={(e) => onChange(e.target.value)}></TextField>;
    
      case "multiLine":
        return <TextField multiline onChange={(e) => onChange(e.target.value)}></TextField>;
      
      case "MCQ":
        return (
          <RadioGroup
            row
            name="radio-buttons-group"
            onChange={(e) => onChange(e.target.value)}
          >
            {questionOption.length > 0 &&
            questionOption.map((option,index) => (
              <FormControlLabel key = {index} value={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
              );
      default:
        return <div>single</div>;
    }
  };

  return (
    <div>
      <h1>{question.questionName}</h1>
      
      {typeSwitch(question.questionType,question.questionOptions,question.questionName)}
    </div>
  )
}
