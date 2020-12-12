import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <div>
      <p>
        {props.course}
      </p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.osa}: {props.exercises} tehtävää
      </p>
    </div>
  )
}

const Content = (props) => {
  
  return(
    <div>
      <Part osa= {props.parts[0].name} exercises = {props.parts[0].exercises}   />
      <Part osa= {props.parts[1].name} exercises = {props.parts[1].exercises}   />
      <Part osa= {props.parts[2].name} exercises = {props.parts[2].exercises}   />
    </div>
  )
}
const Total = (props) => {
  return(
    <div>
      <p>
        Tehtäviä on yhteensä: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
      </p>
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
  {
    name: 'Fundamentals of React',
    exercises: 10
  }, 
  
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  
  {
    name: 'State of a component',
    exercises: 14
  }
  ]
}

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
