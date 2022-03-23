import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function HomePage() {

    const navigate = useNavigate();

    const handleAddBtn = () => {
        navigate('/createNewExperient')
    }
    
  return (
    <div>
        <h3>HomePage</h3>
        <button onClick={handleAddBtn}>Add</button>
        
    </div>
  )
}
