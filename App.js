import React, { useState, useEffect } from 'react';
import './App.css';

const sequenceLength = 5;

const App = () => {
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      startNewGame();
    }
  }, [gameStarted]);
useEffect(()=>{
  if (playerSequence.length && playerSequence.length === sequence.length) {
    checkPlayerSequence();
  }
},[playerSequence,sequence])
  const startNewGame = () => {
    const newSequence = Array.from({ length: sequenceLength }, () => randomNumber());
    setSequence(newSequence);
    setPlayerSequence([]);
    setMessage('');
    setGameOver(false);
    showSequence(newSequence);
  };
  

  const randomNumber = () => Math.floor(Math.random() * 10);

  const showSequence = (sequence) => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < sequence.length) {
        setPlayerSequence([...playerSequence, sequence[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setPlayerSequence([]);
          setMessage('Your turn! Repeat the sequence.');
        }, 1000);
      }
    }, 1000);
  };

  const handleNumberClick = (number) => {
    if (!gameOver && playerSequence.length < sequence.length) {
      setPlayerSequence([...playerSequence, number]);

      // if (playerSequence.length + 1 === sequence.length) {
      //   checkPlayerSequence();
      // }
    }
  };

  const checkPlayerSequence = () => {
    console.log("sequence",sequence)
    console.log("playerSequence",playerSequence)

    for (let i = 0; i < sequence.length; i++) {
      if (playerSequence[i] !== sequence[i]) {
        setMessage('Game Over! You made a mistake.');
        setGameOver(true);
        setPlayerSequence([])
      return;
      }
    }
    setMessage('Congratulations! You remembered the sequence.');
    setGameOver(true);
    setPlayerSequence([])

  
  };

  return (
    <div className="App">
      <header>
        <h1>Number Memory Game</h1>
      </header>
      <main>
        {gameStarted ? (
          <div className="number-grid">
            {Array.from({ length: 10 }, (_, index) => (
              <div
                key={index}
                className={`number ${playerSequence.includes(index) ? 'selected' : ''}`}
                onClick={() => handleNumberClick(index)}
              >
                {index}
              </div>
            ))}
            <p>{message}</p>
            {gameOver && <button onClick={() => setGameStarted(false)}>Play Again</button>}
          </div>
        ) : (
          <button onClick={() => setGameStarted(true)}>Start Game</button>
        )}
      </main>
    </div>
  );
};


export default App;
