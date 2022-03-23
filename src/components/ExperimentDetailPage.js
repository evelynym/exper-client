import React from 'react'
import ShowQuestionItems from './ShowQuestionItems'

export default function ExperimentDetailPage() {

    const mockData = {
        id: "1",
        experimentName: "Experiment A",
        questions: [{
          question_id: "1",
          question_type: "singleLine",
          question_name: "Name:",
          question_options: []
        },{
          question_id: "2",
          question_type: "multiLine",
          question_name: "Skills:",
          question_options: []
        },{
          question_id: "3",
          question_type: "mcq",
          question_name: "Gender:",
          question_options: ['F','M','Other']
        }]
    }
  return (
    <div>
      <h1>{mockData.experimentName}</h1>
      <div>

          {mockData.questions.map((question,index) => (
            <div>
              <ShowQuestionItems 
                question={question}
              />

              
            </div>
          ))}

          <button>click me</button>

      </div>
    </div>
  )
}
