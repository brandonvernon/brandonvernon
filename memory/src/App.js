import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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

const cardsArrayPlus = [
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
  },
  {
    type: "Star",
    image: "fa fa-star"
  },
  {
    type: "Music",
    image: "fa fa-music"
  },
  {
    type: "Heart",
    image: "fa fa-heart"
  },
  {
    type: "Bell",
    image: "fa fa-bell"
  },
  {
    type: "Umbrella",
    image: "fa fa-umbrella"
  },
  {
    type: "Camera",
    image: "fa fa-camera"
  },
  {
    type: "Globe",
    image: "fa fa-globe"
  },
  {
    type: "Tree",
    image: "fa fa-tree"
  },
  {
    type: "Lock",
    image: "fa fa-lock"
  },
  {
    type: "Phone",
    image: "fa fa-phone"
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
  // Define the available card options
  const cardOptions = [
    { label: "16 Cards", value: 16 },
    { label: "32 Cards", value: 32 },
  ];

  const [selectedCardCount, setSelectedCardCount] = useState(16); // Default to 16 cards

  // Update the cards array based on the selected count
  const cardsArrayForSelectedCount = selectedCardCount === 32 ? cardsArrayPlus : cardsArray;

  // Set a shuffled deck of cards based on the selected count
  const [cards, setCards] = useState(() => shuffleCards(cardsArrayForSelectedCount.concat(cardsArrayForSelectedCount)));

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
  const [lowestMovesPlus, setLowestMovesPlus] = useState(
    localStorage.getItem("lowestMovesPlus")
      ? JSON.parse(localStorage.getItem("lowestMovesPlus"))
      : '-'
  );
  const [lowestMovesTimePlus, setLowestMovesTimePlus] = useState(
    localStorage.getItem("lowestMovesTimePlus")
      ? JSON.parse(localStorage.getItem("lowestMovesTimePlus"))
      : '-'
  );
  const [quickestTimePlus, setQuickestTimePlus] = useState(
    localStorage.getItem("quickestTimePlus")
      ? JSON.parse(localStorage.getItem("quickestTimePlus"))
      : '-'
  );
  const [quickestTimeMovesPlus, setQuickestTimeMovesPlus] = useState(
    localStorage.getItem("quickestTimeMovesPlus")
      ? JSON.parse(localStorage.getItem("quickestTimeMovesPlus"))
      : '-'
  );
  const [name, setName] = useState("");
  const [highScores, setHighScores] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [rowNumber, setRowNumber] = useState(1);
  const [userPosition, setUserPosition] = useState(-1);
  const [highlightUserScore, setHighlightUserScore] = useState(false);
  const timeout = useRef(null);

  const openLeaderboard = () => {
    setShowLeaderboard(true);
  };

  const closeLeaderboard = () => {
    setShowLeaderboard(false);
  };

  const clearUserPosition = () => {
    setUserPosition(-1);
  };

  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  // Function to handle the card count selection change
  const handleCardCountChange = (event) => {
    const selectedCount = parseInt(event.target.value);
    setSelectedCardCount(selectedCount);

    // Reset the game with the new card count
    const selectedCardsArray = selectedCount === 32 ? cardsArrayPlus : cardsArray;
    setCards(shuffleCards(selectedCardsArray.concat(selectedCardsArray)));

    // Update the cards array for the selected count
    const cardsArrayForSelectedCount = selectedCardsArray;

    // Add or remove the 'plus' class based on the selected card count
    const containerElement = document.querySelector(".container");
    if (containerElement) {
      if (selectedCount === 32) {
        containerElement.classList.add("plus");
      } else {
        containerElement.classList.remove("plus");
      }
    }

    // Fetch the leaderboard data based on the selected card count
    fetchData(selectedCount);
  };

  const checkCompletion = () => {
    const selectedCardsArray = selectedCardCount === 32 ? cardsArrayPlus : cardsArray;

    if (Object.keys(clearedCards).length === selectedCardsArray.length) {
      setShowModal(true);

      // Moves
      if (selectedCardCount === 16) {
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
      } else {
        if (lowestMovesPlus === '-') {
          setLowestMovesPlus(moves);
          localStorage.setItem("lowestMovesPlus", moves);
          setLowestMovesTimePlus(time);
          localStorage.setItem("lowestMovesTimePlus", time);
        } else {
          const lowestScorePlus = Math.min(moves, lowestMovesPlus);
          setLowestMovesPlus(lowestScorePlus);
          localStorage.setItem("lowestMovesPlus", lowestScorePlus);
          if (moves == lowestMovesPlus) {
            if (time < lowestMovesTimePlus) {
              setLowestMovesTimePlus(time);
              localStorage.setItem("lowestMovesTimePlus", time);
            }
          } else if (moves < lowestMovesPlus) {
            setLowestMovesTimePlus(time);
            localStorage.setItem("lowestMovesTimePlus", time);
          }
        }
      }

      // Time
      setMyTimer(null);
      if (selectedCardCount === 16) {
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
      } else {
        if (quickestTimePlus === '-') {
          setQuickestTimePlus(time);
          localStorage.setItem("quickestTimePlus", time);
          setQuickestTimeMovesPlus(moves);
          localStorage.setItem("quickestTimeMovesPlus", moves);
          clearInterval(myTimer);
        } else {
          const lowestTimePlus = Math.min(time, quickestTimePlus);
          setQuickestTimePlus(lowestTimePlus);
          localStorage.setItem("quickestTimePlus", lowestTimePlus);
          if (time == quickestTime) {
            if (moves < quickestTimeMovesPlus) {
              setQuickestTimeMovesPlus(moves);
              localStorage.setItem("quickestTimeMovesPlus", moves);
            }
          } else if (time < quickestTimePlus) {
            setQuickestTimeMovesPlus(moves);
            localStorage.setItem("quickestTimeMovesPlus", moves);
          }
          clearInterval(myTimer);
        }
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

    // Choose the appropriate cards array based on the selected card count
    const selectedCardsArray = selectedCardCount === 32 ? cardsArrayPlus : cardsArray;

    // set a shuffled deck of cards
    setCards(shuffleCards(selectedCardsArray.concat(selectedCardsArray)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name !== "") {
      let response;

      try {
        if (selectedCardCount === 16) {
          response = await fetch("https://www.brandonvernon.com/memory.php", {
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
        } else {
          response = await fetch("https://www.brandonvernon.com/memory-plus.php", {
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
        }

        if (response.ok) {
          // Reset the form and retrieve updated data
          setName("");
          fetchData();
        } else {
          console.error("Error submitting data.");
        }
      } catch (error) {
        console.error("Error submitting data:", error);
      }
      openLeaderboard();
      handleRestart();
    }
  };

  const fetchData = async (selectedCount) => {
    let response;

    try {
      // Fetch game data from the PHP script
      if (selectedCount === 16) {
        response = await fetch("https://www.brandonvernon.com/memory.php?retrieve=true");
      } else {
        response = await fetch("https://www.brandonvernon.com/memory-plus.php?retrieve=true");
      }

      if (response.ok) {
        const data = await response.json();

        const userIndex = data.findIndex((score) => score.player === name);
        setUserPosition(userIndex);

        // Check if the user's score is in the top 25
        if (userIndex !== -1 && userIndex < 25) {
          setHighlightUserScore(true);
        } else {
          setHighlightUserScore(false);
        }

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
    fetchData(selectedCardCount);
  }, []);

  return (
    <div className="App">
      <header>
        <h1>MEMORY</h1>
      </header>

      <section className="score-panel">
        <FormControl>
          <InputLabel htmlFor="card-count">Select Card Count</InputLabel>
          <Select
            value={selectedCardCount}
            onChange={handleCardCountChange}
            inputProps={{
              name: "card-count",
              id: "card-count",
            }}
          >
            {cardOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div>
          <span className="moves">Moves:<span>{moves}</span></span>
          <span className="time">Time:<span>{time}</span></span>
          <div className="restart">
            <Button onClick={handleRestart}>
              <i className="fa fa-repeat"></i>
            </Button>
          </div>
        </div>
        <Button onClick={openLeaderboard}>Leaderboard</Button>
      </section>

      <ul className={`container${selectedCardCount === 32 ? ' plus' : ''}`}>
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
        onClose={() => {
          closeLeaderboard();
        }}
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
                <tr
                  key={index}
                  className={
                    userPosition === index && highlightUserScore
                      ? "highlighted"
                      : ""
                  }
                >
                  <td>{rowNumber + index}</td>
                  <td>{score.player}</td>
                  <td>{score.moves}</td>
                  <td>{score.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <div>
              <span className="headline">16 Card Record:</span>
              <span className="lowest-moves">Moves: {lowestMoves} moves in {lowestMovesTime} seconds</span>
              <span className="quickest-time">Time: {quickestTime} seconds in {quickestTimeMoves} moves</span>
            </div>
            <div>
              <span className="headline">32 Card Record:</span>
              <span className="lowest-moves">Moves: {lowestMovesPlus} moves in {lowestMovesTimePlus} seconds</span>
              <span className="quickest-time">Time: {quickestTimePlus} seconds in {quickestTimeMovesPlus} moves</span>
            </div>
          </div>
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
            You completed the game in {moves} moves in {time} seconds.
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
    </div >
  );
}
