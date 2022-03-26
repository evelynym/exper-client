import {React,useState} from 'react'
import TextField from '@material-ui/core/TextField';
import { Button, Typography} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Alert,Snackbar} from '@mui/material';
import {createExperiment} from "../api/index.js"
import { useNavigate } from 'react-router-dom';


export default function CreateExperiment() {
    const defaultType = "singleLine";
    const [questionList,setQuestionList] = useState([
        {questionName: "",
         questionType: defaultType,
         questionOptions: ["",""]}
    ]);

    const [experName, setExperName] = useState ("");
    const [showAlert, setShowAlert] = useState({isOpen: false, message: "",type:""});
    const navigate = useNavigate();

    const handleRadioChange = (e,index) => {
        let list = [...questionList];
        list[index]["questionType"] = e.target.value;
        if(e.target.value !== "MCQ"){
            list[index]['questionOptions'] = ["",""];
        }
        setQuestionList(list);
    }

    const handleRemoveQuestion = (index) => {
        const list = [...questionList];
        list.splice(index, 1);
        setQuestionList(list);
    }

    const handleAddQuestion = () => {
        setQuestionList([...questionList, {questionName: "",questionType: defaultType, questionOptions: ["",""]}]);
    }

    const handleQuestionNameChange = (event,index) => {
        const value = event.target.value;
        let list = [...questionList];
        list[index]['questionName'] = value;
        setQuestionList(list);
    }

    const handleAddOption = (questionIndex) => {
        let list = [...questionList];
        list[questionIndex]['questionOptions'].push("");
        setQuestionList(list);
    }

    const handleDeleteOption = (optionIndex, questionIndex) => {
        const list = [...questionList];
        if(list[questionIndex]["questionOptions"].length > 2)
            list[questionIndex]["questionOptions"].splice(optionIndex, 1);
        setQuestionList(list);
    }

    const handleOptionChange = (e, optionIndex, questionIndex) => {
        const list = [...questionList];
        list[questionIndex]["questionOptions"][optionIndex] = e.target.value;
        setQuestionList(list);
        console.log(questionList)
    }

    const handleSubmit = async () => {
        if (experName === "") {
            setShowAlert({isOpen:true,type:"warning",message:"Experiment name is mandatory!"});
        }
        else if (questionList.filter(question => 
            question.questionName === "" || 
            (question.questionType === "MCQ" && question.questionOptions.length === 0)).length > 0){
                setShowAlert({isOpen:true,type:"warning",message:"All fields are mandatory!"});
        }
        else{
            const experiment = {
                experimentName:experName,
                questions: questionList
            };
    
            const data = await createExperiment(experiment);
            if(data.status === 201) {
                setShowAlert({isOpen: true, message: "Create successfully",type:"success"})
                navigate('/');
            }
        }

      

    }

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setShowAlert({isOpen:false,type:"",message:""});
    }

    const hanldeExperNameChange = (event) => {
        setExperName(event.target.value)
    }

  return (
    <div>
        <Snackbar open= {showAlert.isOpen} autoHideDuration={3000} onClose={handleAlertClose}>
          <Alert severity={showAlert.type} sx={{ width: '100%' }} onClose={handleAlertClose}>
            {showAlert.message}
          </Alert>
        </Snackbar>
        <Typography variant="h4">Experiment Name:</Typography>
        <TextField id="outlined-experienmentName" label="Experiment Name" variant="outlined" value={experName} onChange ={(event) => hanldeExperNameChange(event)}/>
        <Button variant="contained" onClick={handleAddQuestion}> Add Question</Button>
        <div id = "questionSection">
            {questionList.map((question,index) => (
                <div key={index}>
                    <TextField variant='standard' value={question.questionName} label={question.questionName } onChange={(e) => handleQuestionNameChange(e,index)}></TextField>
                    <RadioGroup row name={index.toString()} value={question.questionType} onChange={(e) => handleRadioChange(e,index)}>
                        <FormControlLabel value="singleLine" control={<Radio />} label="singleLine" />
                        <FormControlLabel value="multiLine" control={<Radio />} label="multiLine" />
                        <FormControlLabel value="MCQ" control={<Radio />} label="MCQ" />
                    </RadioGroup>
                    {question.questionType === "MCQ" &&
                    <div>
                        <div>Please add options for your question</div>
                        {question.questionOptions.map((option,i) => ( 
                            <span key={i}>
                                <TextField onChange={(e) => handleOptionChange(e,i,index)} variant="filled" value={option}></TextField>
                                <Button onClick={() => handleDeleteOption(i,index)}>Delete</Button>
                                {question.questionOptions.length-1 === i &&
                                <Button onClick={() => handleAddOption(index)}>Add</Button>}
                            </span>
                        ))}
                    </div>}
                    <Button onClick={() => handleRemoveQuestion(index)}>Remove</Button>
                </div>
            ))}
        </div>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
    </div>
  )
}
