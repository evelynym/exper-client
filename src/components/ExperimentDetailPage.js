import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import ShowQuestionItems from './ShowQuestionItems';
import {fetchExperimentByName} from '../api/index.js';
import { Button,Alert, Snackbar, Typography} from '@mui/material';
import { submitAns } from '../api/index.js';
import ThankYouPage from './ThankYouPage.js';
import { useNavigate } from 'react-router-dom';
import './ExperimentDetailPageStyle.css';

export default function ExperimentDetailPage() {

  const navigate = useNavigate();
  const {name} = useParams();
  const [experiment, setExperiment] = useState({});
  const [answers, setAnswers] = useState([]);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showAlert, setShowAlert] = useState({isOpen: false, message: "",type:""});
  
  const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
  const regName = /^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/;

  const getData = async (name) => {
    const data = await fetchExperimentByName(name);
    if (data.status === 200){
      setExperiment(data.data);
    }
  }

  useEffect(() => {
    getData(name);
  },[]);

  const handleSubmitAns = async () => {

    // check if all questions are answered

    console.log(answers,experiment.questions.length)



    if (answers.filter(ans => ans.question === "Name" && ! regName.test(ans.answer) ) .length > 0 ){
      setShowAlert({isOpen: true, message: "Name invalid",type:"warning"})
    }
    else if (answers.filter(ans => ans.question === "Email address" && ! regEx.test(ans.answer) ) .length > 0 ){
      setShowAlert({isOpen: true, message: "Email address invalid",type:"warning"})
    }

    else if (answers.length !== experiment.questions.length){
      
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

  // IF --> if filter length > 0 --> already add to questionlist --> update
  // Else --> not exists in the questionlist --> insert
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

  const handleBackBtn = () =>{
    navigate('/');
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
        <div className='outerContainer title'>
            <Typography variant="h3" >{experiment.experimentName}</Typography>
        </div>
        <div className='contentContainer'>
            {experiment.questions.map((question,index) => (
                // <div key={index}>
                <ShowQuestionItems 
                    question={question}
                    questionIndex = {index}
                    onChange = {(answer) => handleAnswerChange(answer,question.questionName,question._id)}
                />
                
                
                // </div>
            ))}

        
            <div className='outerContainer'>
            <div  className='btnContainer'>
                <Button variant="outlined" onClick={() => handleSubmitAns()}>Submit</Button>
                <Button variant="outlined" onClick={handleBackBtn}>Back</Button>
            </div>
            </div>
        </div>
      </div>
    }
    </div>)
  }
  </>
  )
}
