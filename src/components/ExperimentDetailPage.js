import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import ShowQuestionItems from './ShowQuestionItems';
import {fetchExperimentByName} from '../api/index.js';
import { Button,Alert } from '@mui/material';
import { submitAns } from '../api/index.js';
import ThankYouPage from './ThankYouPage.js';

export default function ExperimentDetailPage() {

  const {name} = useParams();
  const [experiment, setExperiment] = useState({});
  const [answers, setAnswers] = useState([]);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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

    // check if all questions are answered

    if (answers.length !== experiment.questions.length){
      setShowAlert(true);
    }
    else {
      setShowAlert(false);
      setShowThankYou(true);
      const ansToSubmit = {
        experimentName: experiment.experimentName,
        answers: answers
      }
      submitAns(ansToSubmit);
    }
    

    // if so, show thank you page and submit answer
    
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
    <>
    {showThankYou ? ( <ThankYouPage></ThankYouPage>) :
    (<div>
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
      {showAlert && 
        <Alert variant="filled" severity="error">This is an error alert — check it out!</Alert>}
      
      <Button variant="outlined" onClick={() => handleSubmitAns()}>Submit</Button>
      <Button variant="outlined">Back</Button>

      </div>
      </div>
    }
    </div>)
  }
  </>
  )
}
