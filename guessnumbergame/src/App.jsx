import React, { useEffect, useState } from 'react'

const App = () => {

  const totalAttempts = 10;


  const [userInput, setuserInput] = useState('');
  const [attemptsRemaining, setattemptsRemaining] = useState(totalAttempts);
  const [prevAttempts, setprevAttempts] = useState([]);
  const [randomNumber, setrandomNumber] = useState(null);

  const [play, setplay] = useState(true);

  useEffect(
    () => {
      setrandomNumber(Math.floor(Math.random() * 100))
    }, []
  )
  console.log(randomNumber)
  const handleInput = (e) => {
    if (e.target.value < 0 || e.target.value > 100) {
      alert("Please enter number between 1-100")
    } else if (isNaN(e.target.value || e.target.value == undefined || e.target.value == null)) {
      alert('Enter a valid Number')
    } else {
      setuserInput(e.target.value)
    }
  }

  const previousAttempts = () => {
    setprevAttempts((prev) => [...prev, userInput])
    setattemptsRemaining((prevRemaining) => prevRemaining - 1)

    displayMessage();
  }

  const displayMessage = () => {
    if (userInput > randomNumber) {
      document.getElementById('message').innerText = "Number is too high"

    }
    if (userInput < randomNumber) {
      document.getElementById('message').innerText = "Number is too low"
    }

    
    if (userInput == randomNumber) {
      document.getElementById('results').innerHTML = `<p id='results' >Hurray! you have guessed the right number...</p><br/><span id="startnewgame" style="color:blue">Click here to start a new game...</span>`
      document.getElementById('checkAnswer').setAttribute('disabled', '')
      setuserInput('');
      setprevAttempts([]);
      setattemptsRemaining(totalAttempts)
      document.getElementById('startnewgame').addEventListener('click', () => {
        setplay(true)
        document.getElementById('checkAnswer').removeAttribute('disabled')
        document.getElementById('message').innerText = " "
        setattemptsRemaining(totalAttempts)
        document.getElementById('results').innerHTML = ''
      })
    }
    if (attemptsRemaining <= 1) {
      endGame()
    }
  }
  const endGame = () => {
    document.getElementById('checkAnswer').setAttribute('disabled', '')
    setplay(false)
    document.getElementById('results').innerHTML = `<p id='results' >Oops!! you failed to guess the number</p><br/><h5>The correct number is ${randomNumber} </h5><br/><span id="startnewgame" style="color:blue">Click here to start a new game...</span>`
    document.getElementById('startnewgame').addEventListener('click', () => {
      setplay(true)
      document.getElementById('checkAnswer').removeAttribute('disabled')
      document.getElementById('message').innerText = " "
      setuserInput('');
      setprevAttempts([]);
      setattemptsRemaining(totalAttempts)
      document.getElementById('results').innerHTML = ''
    })

  }



  console.log(prevAttempts)
  return (
    <>
      <div className='container'>
        <h1 className='text-center my-4 text-danger fw-bold '>Welcome to the Guess Number Game</h1>

        {/* Number entered by the user */}
        <label htmlFor="input" className='form-label'>Enter your Number</label>
        <input type='text' id='input' className='form-control' value={userInput} autoFocus onChange={handleInput} ></input>

        {/* Previous Attempts of user will shown here */}
        <div className='my-4' >
          <h6>{`Total Attempts : ${totalAttempts}`}</h6><br />
          <h6>{`Attempts Remaining : ${attemptsRemaining}`}</h6><br />
          <h6 >{`Your Previous Attempts : ${prevAttempts} `}</h6>
          <div className='mt-3' style={{ display: "flex", justifyContent: "center" }}>
            <button id="checkAnswer" className='btn btn-primary mt-2' onClick={previousAttempts}>Check Answer</button>
          </div>
          <p id='message' ></p><br />
          <p id='results' ></p><br />
        </div>


      </div>
    </>
  )
}

export default App
