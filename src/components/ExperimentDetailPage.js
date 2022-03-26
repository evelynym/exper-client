import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import ShowQuestionItems from './ShowQuestionItems';
import {fetchExperimentByName} from '../api/index.js';
import { Button } from '@mui/material';
import { submitAns } from '../api/index.js';

export default function ExperimentDetailPage() {

  const {name} = useParams();
  const [experiment, setExperiment] = useState({});
  const [answers, setAnswers] = useState([]);

  const getData = async (name) => {
    const data = await fetchExperimentByName(name);
    if (data.status === 200){
      setExperiment(data.data);
    }
  }

  useEffect(() => {
    console.log('name',name)
    getData(name);
  },[]);

  const handleSubmitAns = () => {
    const ansToSubmit = {
      experimentName: experiment.experimentName,
      answers: answers
    }
    submitAns(ansToSubmit);
  }

  const handleAnswerChange = (questionAnswerFromChild,questionName) => {

    if (answers.filter (ans => ans.question === questionName).length > 0 ) {
      answers.map((a) => (
        a.question === questionName ? a.answer = questionAnswerFromChild : a
      ));
    }
    else {
      
      const receivedAns = 
      {
        question:questionName,
        answer:questionAnswerFromChild
      };
      setAnswers([...answers,receivedAns])
    }
  
  }



  return (
    <div>
      {Object.keys(experiment).length !== 0 &&
      <div>
      <h1>{experiment.experimentName}</h1>
       <div>
          {experiment.questions.map((question,index) => (
            <div key={index}>
              <ShowQuestionItems 
                question={question}
                onChange = {(answer) => handleAnswerChange(answer,question.questionName)}
              />
              
              
            </div>
          ))}
      {  console.log("answers",answers)}
      <Button variant="outlined" onClick={() => handleSubmitAns()}>Submit</Button>
      <Button variant="outlined">Back</Button>

      </div>
      </div>
    }
    </div>
  )
}
