import React from 'react'
import {RadioGroup,FormControlLabel,Radio} from '@mui/material';

export default function ShowQuestionItems({question}) {
  

  const typeSwitch = (questionType,questionOption) =>{

    switch (questionType) {     
      case "singleLine":
        return <input></input>;
    
      case "multiLine":
        return <textarea></textarea>;
      
      case "MCQ":
        return (
          <RadioGroup
            row
            name="radio-buttons-group"
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
