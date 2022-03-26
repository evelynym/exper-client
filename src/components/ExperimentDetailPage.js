import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import ShowQuestionItems from './ShowQuestionItems';
import {fetchExperimentByName} from '../api/index.js';
import { Button } from '@mui/material';

export default function ExperimentDetailPage() {

  const {name} = useParams();
  const [experiment, setExperiment] = useState({});

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
              />

              
            </div>
          ))}

      <Button variant="outlined">Submit</Button>
      <Button variant="outlined">Back</Button>

      </div>
      </div>
    }
    </div>
  )
}
