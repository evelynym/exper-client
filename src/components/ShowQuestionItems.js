import React from 'react'
import {RadioGroup,FormControlLabel,Radio} from '@mui/material';

export default function ShowQuestionItems({
  question, 
  onChange
}) {
  
  const typeSwitch = (questionType,questionOption) =>{

    switch (questionType) {     
      case "singleLine":
        return <input onChange={(e) => onChange(e.target.value)}></input>;
    
      case "multiLine":
        return <textarea onChange={(e) => onChange(e.target.value)}></textarea>;
      
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
      
      {typeSwitch(question.questionType,question.questionOptions)}
    </div>
  )
}
