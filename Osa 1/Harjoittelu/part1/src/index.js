import React from 'react';
import ReactDOM from 'react-dom';


const Hello = (props) => {
  return(
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
};

const App = () => {
  const nimi = 'Pekka';
  const ika = 10;
  
  return(
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={nimi} age={ika}/>
      <Hello name="Jouni" age={88-64+11}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));