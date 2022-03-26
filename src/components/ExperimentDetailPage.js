import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import ShowQuestionItems from './ShowQuestionItems';
import {fetchExperimentByName} from '../api/index.js';
import { Button,Alert, Snackbar} from '@mui/material';
import { submitAns } from '../api/index.js';
import ThankYouPage from './ThankYouPage.js';

export default function ExperimentDetailPage() {

  const {name} = useParams();
  const [experiment, setExperiment] = useState({});
  const [answers, setAnswers] = useState([]);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showAlert, setShowAlert] = useState({isOpen: false, message: "",type:""});

  const getData = async (name) => {
    const data = await fetchExperimentByName(name);
    if (data.status === 200){
      setExperiment(data.data);
    }
  }

  useEffect(() => {
    getData(name);
  },[]);

  const handleSubmitAns = () => {

    // check if all questions are answered

    console.log(answers,experiment.questions.length)
    if (answers.length !== experiment.questions.length){
      
      setShowAlert({isOpen: true, message: "All questions are mandatory",type:"warning"})
    }
    else {
      setShowAlert({isOpen:false,message:"",type:""});
      setShowThankYou(true);
      const ansToSubmit = {
        experimentName: experiment.experimentName,
        answers: answers
      }
      submitAns(ansToSubmit);
    }

  }

  const handleAnswerChange = (questionAnswerFromChild,questionName,questionId) => {

    if (answers.filter (ans => ans.questionId === questionId).length > 0 ) {
      answers.map((a) => (
        a.questionId === questionId ? a.answer = questionAnswerFromChild : a
      ));
    }
    else {
      const receivedAns = 
      {
        questionId: questionId,
        question:questionName,
        answer:questionAnswerFromChild
      };
      setAnswers([...answers,receivedAns])
    }
  
  }

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowAlert({isOpen:false,type:"",message:""});
}


  return (
    <>
    {showThankYou ? ( <ThankYouPage></ThankYouPage>) :
    (<div>
      <Snackbar open= {showAlert.isOpen} autoHideDuration={3000} onClose={handleAlertClose}>
          <Alert severity={showAlert.type} sx={{ width: '100%' }} onClose={handleAlertClose}>
            {showAlert.message}
          </Alert>
        </Snackbar>
      {Object.keys(experiment).length !== 0 &&
      <div>
      <h1>{experiment.experimentName}</h1>
       <div>
          {experiment.questions.map((question,index) => (
            <div key={index}>
              <ShowQuestionItems 
                question={question}
                onChange = {(answer) => handleAnswerChange(answer,question.questionName,question._id)}
              />
              
              
            </div>
          ))}

      
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
