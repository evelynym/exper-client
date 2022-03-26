import React, { useEffect,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper, Button,Alert,Snackbar} from '@mui/material'
import {fetchExperiments,deleteExperimentById} from "../api/index.js"

export default function HomePage() {

    const navigate = useNavigate();
    const [experimentList,setExperimentList] = useState([]);
    const handleAddBtn = () => {
        navigate('/createNewExperient')
    }
    const [showAlert, setShowAlert] = useState({isOpen: false, message: "",type:""});
    const getData = async  () => {
      const data = await fetchExperiments();
      if (data.status === 200){
        setExperimentList(data.data);
      }
    }
    useEffect (() => {
      getData();
    },[])

    const handleClickViewBtn = (name) => {
      navigate(`/experimentDetailPage/${name}`);
    }

    const handleDeleteBtn = async (_id) => {
      const data = await deleteExperimentById(_id);
      if(data.status === 200) {
        setShowAlert({isOpen: true, message: "Delete successfully",type:"success"})
        // alert("Your file is being uploaded!")
        getData();
        
      }
      else if (data.status === 409) {
        <Alert variant="filled" severity="error">
          This is an error alert — check it out!
        </Alert>
      }
    }

    const handleAlertClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setShowAlert({isOpen:false,type:"",message:""});
    }

  return (
    <div>
        <Snackbar open= {showAlert.isOpen} autoHideDuration={3000} onClose={handleAlertClose}>
          <Alert severity={showAlert.type} sx={{ width: '100%' }} onClose={handleAlertClose}>
            {showAlert.message}
          </Alert>
        </Snackbar>
        <h3>HomePage</h3>
        {console.log(experimentList)}
        <button onClick={handleAddBtn}>Add</button>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Experiment Name</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {experimentList && experimentList.map((item,index) =>(
            <TableRow
            key={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            {console.log(item)}
           
              
              <TableCell  align="right">{index}</TableCell>
              <TableCell align="right">{item.experimentName}</TableCell>
              <TableCell>
                  <Button variant="outlined">Edit</Button>
                  <Button variant="outlined" onClick={() => handleDeleteBtn(item._id)}>Delete</Button>
                  <Button variant="outlined" onClick={()=>handleClickViewBtn(item.experimentName)}>view</Button>
              </TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
        
    </div>
  )
}
