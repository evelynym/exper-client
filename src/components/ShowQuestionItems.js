import React from 'react'

export default function ShowQuestionItems({question}) {
  

  const typeSwitch = (questionType,questionOption) =>{

    switch (questionType) {     
      case "singleLine":
        return <input></input>;
    
      case "multiLine":
        return <textarea></textarea>;
      
      case "mcq":
        return (<select>
                {questionOption.length > 0 &&
                questionOption.map((option,index) => (
                  <option value={option}>{option}</option>
                ))}
              </select>);
      default:
        return <div>single</div>;
    }
  };
  

  return (
    <div>
      <h1>QuestionsForItem</h1>
      
      {question.question_name}

      {typeSwitch(question.question_type,question.question_options)}
    </div>
  )
}
