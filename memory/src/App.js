import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle
} from "@material-ui/core";
import Card from "./card";
import "./index.css";

// Cards
const cardsArray = [
  {
    type: "Diamond",
    image: "fa fa-diamond"
  },
  {
    type: "Plane",
    image: "fa fa-paper-plane-o"
  },
  {
    type: "Anchor",
    image: "fa fa-anchor"
  },
  {
    type: "Bolt",
    image: "fa fa-bolt"
  },
  {
    type: "Cube",
    image: "fa fa-cube"
  },
  {
    type: "Leaf",
    image: "fa fa-leaf"
  },
  {
    type: "Bike",
    image: "fa fa-bicycle"
  },
  {
    type: "Bomb",
    image: "fa fa-bomb"
  }
];

function shuffleCards(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}
export default function App() {
  const [cards, setCards] = useState(() =>
    shuffleCards(cardsArray.concat(cardsArray))
  );
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [isFirstClick, setFirstClick] = useState(true);
  const [time, setTime] = useState(0);
  const [myTimer, setMyTimer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [lowestMoves, setLowestMoves] = useState(
    localStorage.getItem("lowestMoves")
      ? JSON.parse(localStorage.getItem("lowestMoves"))
      : '-'
  );
  const [lowestMovesTime, setLowestMovesTime] = useState(
    localStorage.getItem("lowestMovesTime")
      ? JSON.parse(localStorage.getItem("lowestMovesTime"))
      : '-'
  );
  const [quickestTime, setQuickestTime] = useState(
    localStorage.getItem("quickestTime")
      ? JSON.parse(localStorage.getItem("quickestTime"))
      : '-'
  );
  const [quickestTimeMoves, setQuickestTimeMoves] = useState(
    localStorage.getItem("quickestTimeMoves")
      ? JSON.parse(localStorage.getItem("quickestTimeMoves"))
      : '-'
  );
  const [name, setName] = useState('Player');
  const [highScores, setHighScores] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [rowNumber, setRowNumber] = useState(1);
  const timeout = useRef(null);

  const openLeaderboard = () => {
    setShowLeaderboard(true);
  };

  const closeLeaderboard = () => {
    setShowLeaderboard(false);
  };

  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === cardsArray.length) {
      setShowModal(true);

      // Moves
      if (lowestMoves === '-') {
        setLowestMoves(moves);
        localStorage.setItem("lowestMoves", moves);
        setLowestMovesTime(time);
        localStorage.setItem("lowestMovesTime", time);
      } else {
        const lowestScore = Math.min(moves, lowestMoves);
        setLowestMoves(lowestScore);
        localStorage.setItem("lowestMoves", lowestScore);
        if (moves == lowestMoves) {
          if (time < lowestMovesTime) {
            setLowestMovesTime(time);
            localStorage.setItem("lowestMovesTime", time);
          }
        } else if (moves < lowestMoves) {
          setLowestMovesTime(time);
          localStorage.setItem("lowestMovesTime", time);
        }
      }

      // Time
      setMyTimer(null);
      if (quickestTime === '-') {
        setQuickestTime(time);
        localStorage.setItem("quickestTime", time);
        setQuickestTimeMoves(moves);
        localStorage.setItem("quickestTimeMoves", moves);
        clearInterval(myTimer);
      } else {
        const lowestTime = Math.min(time, quickestTime);
        setQuickestTime(lowestTime);
        localStorage.setItem("quickestTime", lowestTime);
        if (time == quickestTime) {
          if (moves < quickestTimeMoves) {
            setQuickestTimeMoves(moves);
            localStorage.setItem("quickestTimeMoves", moves);
          }
        } else if (time < quickestTime) {
          setQuickestTimeMoves(moves);
          localStorage.setItem("quickestTimeMoves", moves);
        }
        clearInterval(myTimer);
      }

      if (name === '') {
        setName('Player');
      }
    }
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].type === cards[second].type) {
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
      setOpenCards([]);
      return;
    }
    // This is to flip the cards back after 500ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };

  const handleCardClick = (index) => {
    if (isFirstClick === true) {
      const timer = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
      setMyTimer(timer);
      setFirstClick(false)
    }

    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);
  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const checkIsMatch = (card) => {
    return Boolean(clearedCards[card.type]);
  };

  const handleRestart = () => {
    clearInterval(myTimer);
    setClearedCards({});
    setOpenCards([]);
    setShowModal(false);
    setMoves(0);
    setFirstClick(true);
    setTime(0);
    setShouldDisableAllCards(false);
    // set a shuffled deck of cards
    setCards(shuffleCards(cardsArray.concat(cardsArray)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://www.brandonvernon.com/memory.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          player: name,
          moves: moves,
          time: time,
        }),
      });
      if (response.ok) {
        // Reset the form and retrieve updated data
        setName('Player');
        fetchData();
      } else {
        console.error("Error submitting data.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const fetchData = async () => {
    try {
      // Fetch game data from the PHP script
      const response = await fetch("https://www.brandonvernon.com/memory.php?retrieve=true");
      if (response.ok) {
        const data = await response.json();
        // Update your state with the retrieved data
        setHighScores(data);
      } else {
        console.error("Error fetching data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Initial data retrieval
    fetchData();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>MEMORY</h1>
      </header>

      <section className="score-panel">
        <div>
          <span className="moves">Moves:<span>{moves}</span></span>
          <span className="time">Time:<span>{time}</span></span>
          <div className="restart">
            <Button onClick={handleRestart}>
              <i className="fa fa-repeat"></i>
            </Button>
          </div>
        </div>
        <div>
          <span className="lowest-moves">Lowest Moves:<span>{lowestMoves} moves in {lowestMovesTime} seconds</span></span>
          <span className="quickest-time">Best Time:<span>{quickestTime} seconds in {quickestTimeMoves} moves</span></span>
        </div>
        <Button onClick={openLeaderboard}>Leaderboard</Button>
      </section>

      <ul className="container">
        {cards.map((card, index) => {
          return (
            <Card
              key={index}
              card={card}
              index={index}
              isDisabled={shouldDisableAllCards}
              isMatch={checkIsMatch(card)}
              isFlipped={checkIsFlipped(index)}
              onClick={handleCardClick}
            />
          );
        })}
      </ul>

      <Dialog
        open={showLeaderboard}
        onClose={closeLeaderboard}
        aria-labelledby="leaderboard-title"
      >
        <DialogTitle id="leaderboard-title">Leaderboard</DialogTitle>
        <DialogContent>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Player</th>
                <th>Moves</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {highScores.map((score, index) => (
                <tr key={index}>
                  <td>{rowNumber + index}</td>
                  <td>{score.player}</td>
                  <td>{score.moves}</td>
                  <td>{score.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeLeaderboard} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showModal}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="game-over-title"
        aria-describedby="game-over-description"
      >
        <DialogTitle id="game-over-title">
          Brilliant!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="game-over-description">
            You completed the game in {moves} moves in {time} seconds<br></br>
            Lowest Moves: {lowestMoves} moves in {lowestMovesTime} seconds<br></br>
            Best Time: {quickestTime} seconds in {quickestTimeMoves} moves
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </label>
            <button type="submit">SUBMIT</button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRestart} color="primary">
            Play Again?
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
