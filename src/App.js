import React from "react";
import rock from "./rps/rock.png";
import paper from "./rps/paper.png";
import scissors from "./rps/scissors.png";

export function App() {
  const [score, setScore] = React.useState(
    () => JSON.parse(localStorage.getItem("score")) || { Y: 0, C: 0, T: 0 }
  );
  const [stat, setStat] = React.useState("");
  const [moves, setMoves] = React.useState({});

  function getComputerMove() {
    const randomNum = Math.floor(Math.random() * 3);
    return randomNum === 0 ? "Rock" : randomNum === 1 ? "Paper" : "Scissors";
  }

  function compareMove(myMove, computerMove) {
    if (myMove === "Rock" && computerMove === "Scissors") {
      setStat("You Win");
      setScore((prevState) => ({ ...prevState, Y: ++prevState.Y }));
    } else if (myMove === "Paper" && computerMove === "Rock") {
      setStat("You Win");
      setScore((prevState) => ({ ...prevState, Y: ++prevState.Y }));
    } else if (myMove === "Scissors" && computerMove === "Paper") {
      setStat("You Win");
      setScore((prevState) => ({ ...prevState, Y: ++prevState.Y }));
    } else if (myMove === computerMove) {
      setStat("Tie");
      setScore((prevState) => ({ ...prevState, T: ++prevState.T }));
    } else {
      setScore((prevState) => ({ ...prevState, C: ++prevState.C }));
      setStat("You lose");
    }
  }

  function play(playerMove, computerMove) {
    compareMove(playerMove, computerMove);
    setMoves({ Y: playerMove, C: computerMove });
    localStorage.setItem("score", JSON.stringify(score));
  }

  function resetScore() {
    localStorage.removeItem("score");
    setScore({ Y: 0, C: 0, T: 0 });
  }

  return (
    <section>
      <div className="logo-container">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6836/6836871.png"
          alt=""
        />
        <h1>Rock Paper Scissors</h1>
      </div>
      <div className="button-container">
        <button onClick={() => play("Rock", getComputerMove())}>
          <img src={rock} alt="" />
        </button>
        <button onClick={() => play("Paper", getComputerMove())}>
          <img src={paper} alt="" />
        </button>
        <button onClick={() => play("Scissors", getComputerMove())}>
          <img src={scissors} alt="" />
        </button>
      </div>

      <div className="stat-container">
        <h1>{stat}</h1>
        <div className="move-container">
          {moves.Y && (
            <>
              <p>
                You:
                <img
                  src={
                    moves.Y === "Rock"
                      ? rock
                      : moves.Y === "Scissors"
                      ? scissors
                      : paper
                  }
                  alt=""
                />
              </p>
              <p>
                Computer:
                <img
                  src={
                    moves.C === "Rock"
                      ? rock
                      : moves.C === "Scissors"
                      ? scissors
                      : paper
                  }
                  alt=""
                />
              </p>
            </>
          )}
        </div>
      </div>

      <div className="score-container">
        <h4>Score</h4>
        <p>
          Y: {score.Y} | C:{score.C} | T: {score.T}
        </p>
      </div>
      <div className="button-bottom">
        <button onClick={resetScore}>Reset Score</button>
        <button>Auto Play</button>
      </div>
    </section>
  );
}
