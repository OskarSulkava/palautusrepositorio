import React from 'react'

const Header = ({ header }) => {
    return (
      <h1>{header}</h1>
    )
  }
  
  const Total = ({ parts }) => {
    let sum = parts.reduce((current, number) =>
      current + number.exercises
    ,0)
    return(
      <p>Number of exercises {sum}</p>
    ) 
  }
  
  const Part = ({name, exercises}) => {
    return (
      <p>
        {name} {exercises}
      </p>    
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
      {parts.map(parts =>
        <Part key={parts.id} name={parts.name} exercises={parts.exercises} />
      )}
      </div>
    )
  }
  
  const Course = ({course}) => {
  
    return (
      <div>
      {course.map(course =>
        <div key={course.id}>
        <Header header={course.name}/>
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        </div>
      )}
      </div>
    )
  }

  export default Course