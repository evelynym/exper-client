import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { Button,Alert, Snackbar, TextField, RadioGroup,FormControlLabel,Radio, Typography} from '@mui/material';
import {fetchExperimentByName} from '../api/index.js';
import { useNavigate } from 'react-router-dom';

export default function EditExperimentDetailPage() {
    const {name} = useParams();
    const [experiment, setExperiment] = useState({});
    const [answers, setAnswers] = useState([]);
    const [showAlert, setShowAlert] = useState({isOpen: false, message: "",type:""});

    const navigate = useNavigate();

    const getData = async (name) => {
      const data = await fetchExperimentByName(name);
      if (data.status === 200){
        setExperiment(data.data);
      }
    }

    useEffect(() => {
      getData(name);
    },[]);

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setShowAlert({isOpen:false,type:"",message:""});
    }

    const handleUpdateExperiment = () => {

    }

    const handleBackBtn = () => {
    navigate('/')

    }

   
  return (
    <div>
       {Object.keys(experiment).length !== 0 && 
       
       <div>
         {  console.log(experiment)}
          <Snackbar open= {showAlert.isOpen} autoHideDuration={3000} onClose={handleAlertClose}>
          <Alert severity={showAlert.type} sx={{ width: '100%' }} onClose={handleAlertClose}>
            {showAlert.message}
          </Alert>
        </Snackbar>
        <Typography>Experiment name</Typography>
        <TextField  value={experiment.experimentName}></TextField>
        {experiment.questions.map ((question,index) => (
          <div key={index}>
            <Typography>Question</Typography>
          
            <TextField value={question.questionName} ></TextField>
            <RadioGroup defaultValue={question.questionType}>
              <FormControlLabel value="singleLine" control={<Radio />} label="singleLine" />
              <FormControlLabel value="multiLine" control={<Radio />} label="multiLine" />
              <FormControlLabel value="MCQ" control={<Radio />} label="MCQ" />
            </RadioGroup>

            {
              question.questionType === "MCQ" && 
              <div>

              </div>
            }
          </div>
        ))
       }
      <Button variant="outlined" onClick={() => handleUpdateExperiment()}>Update</Button>
      <Button variant="outlined" onClick={handleBackBtn}>Back</Button>
       </div>
       }
    
       
      
  
        
    </div>
  )
}
