import React, { useEffect,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper, Button} from '@mui/material'
import {fetchExperiments} from "../api/index.js"

export default function HomePage() {

    const navigate = useNavigate();
    const [experimentList,setExperimentList] = useState([]);
    const handleAddBtn = () => {
        navigate('/createNewExperient')
    }
    const getData = async  () => {
      const data = await fetchExperiments();
      if (data.status === 200){
        setExperimentList(data.data);
      }
    }
    useEffect (() => {
      getData();
    },[])

    const handleViemBtn = (name) => {
      navigate(`/experimentDetailPage/${name}`);
    }

  return (
    <div>
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
                  <Button variant="outlined">Delete</Button>
                  <Button variant="outlined" onClick={()=>handleViemBtn(item.experimentName)}>view</Button>
              </TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
        
    </div>
  )
}
