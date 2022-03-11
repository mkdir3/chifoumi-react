import React, { useEffect, useState } from "react";
import Rock from "./icons/Rock";
import Paper from "./icons/Paper";
import Scissors from "./icons/Scissors";
import "./App.css";

// choices available
const choices = [
  {
    id: 1,
    name: "pierre",
    component: Rock,
    losesTo: 2,
  },
  {
    id: 2,
    name: "feuille",
    component: Paper,
    losesTo: 3,
  },
  {
    id: 3,
    name: "ciseaux",
    component: Scissors,
    losesTo: 1,
  },
];

export default function App() {
  // use state for the player choice
  const [userChoice, setuserChoice] = useState(null);
  // use state for the ai choice
  const [aiChoice, setAiChoice] = useState(null);
  // use state for the wins
  const [wins, setWins] = useState(0);
  // use state for the losses
  const [losses, setLosses] = useState(0);
  // use state to set the result between win, loss or draw
  const [gameState, setGameState] = useState(null);

  // choose a random choice for the ai at each rendering
  useEffect(() => {
    restartGame();
  }, []);

  // function to restart game
  function restartGame() {
    setGameState(null);
    setuserChoice(null);
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setAiChoice(randomChoice);
  }

  // knowing what user is choosing
  function handleChoices(choice) {
    const chosenChoice = choices.find((c) => c.id === choice);
    setuserChoice(chosenChoice);

    // check if player lose against ai
    if (chosenChoice.losesTo === aiChoice.id) {
      setLosses((losses) => losses + 1);
      setGameState("lose");
    } else if (aiChoice.losesTo === chosenChoice.id) {
      setWins((wins) => wins + 1);
      setGameState("win");
    } else if (aiChoice.id === chosenChoice.id) {
      setGameState("draw");
    }
  }

  // render the specific choice icon
  function renderComponent(choice) {
    const Component = choice.component;
    return <Component />;
  }

  return (
    <div className="app">
      {/* game title */}
      <div className="info">
        <h2>Pierre. Feuille. Ciseaux</h2>

        {/* wins vs losses stats */}
        <div className="wins-losses">
          <div className="wins">
            <span className="number">{wins}</span>
            <span className="text">
              {wins === 1 ? "Victoire" : "Victoires"}
            </span>
          </div>

          <div className="losses">
            <span className="number">{losses}</span>
            <span className="text">
              {losses === 1 ? "Défaite" : "Défaites"}
            </span>
          </div>
        </div>
      </div>

      {/* pop up to show who's win */}
      {gameState && (
        <div
          className={`game-state ${gameState}`}
          onClick={() => restartGame()}
        >
          <div>
            <div className="game-state-content">
              <p>{renderComponent(userChoice)}</p>
              {gameState === "win" && <p>Gagné !</p>}
              {gameState === "lose" && <p>Perdu !</p>}
              {gameState === "draw" && <p>Match nul !</p>}
              <p>{renderComponent(aiChoice)}</p>
            </div>

            <button onClick={() => restartGame()}>Rejouer</button>
          </div>
        </div>
      )}

      <div className="choices">
        {/* choices captions */}
        <div>Vous</div>
        <div />
        <div>IA</div>

        {/* buttons for my choice */}
        <div>
          <button
            className="rock"
            onClick={() => {
              handleChoices(1);
            }}
          >
            <Rock />
          </button>
          <button
            className="paper"
            onClick={() => {
              handleChoices(2);
            }}
          >
            <Paper />
          </button>
          <button
            className="scissors"
            onClick={() => {
              handleChoices(3);
            }}
          >
            <Scissors />
          </button>
        </div>

        <div className="vs">vs</div>

        {/* show the computer's choice */}
        <div>
          <button className="computer-choice">?</button>
        </div>
      </div>
    </div>
  );
}
