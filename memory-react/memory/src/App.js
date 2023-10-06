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
  const [quickestTime, setQuickestTime] = useState(
    localStorage.getItem("quickestTime")
      ? JSON.parse(localStorage.getItem("quickestTime"))
      : '-'
  );
  const timeout = useRef(null);

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
      } else {
        const lowestScore = Math.min(moves, lowestMoves);
        setLowestMoves(lowestScore);
        localStorage.setItem("lowestMoves", lowestScore);
      }

      // Time
      setMyTimer(null);
      if (quickestTime === '-') {
        setQuickestTime(time);
        localStorage.setItem("quickestTime", time);
        clearInterval(myTimer);
      } else {
        const lowestTime = Math.min(time, quickestTime);
        setQuickestTime(lowestTime);
        localStorage.setItem("quickestTime", lowestTime);
        clearInterval(myTimer);
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

  return (
    <div className="App">
      <header>
        <h1>MEMORY</h1>
      </header>

      <section className="score-panel">
        <span className="moves">Moves <span>{moves}</span></span>
        <span className="time">Time <span>{time}</span></span>
        <span className="lowest-moves">Lowest Moves <span>{lowestMoves}</span></span>
        <span className="quickest-time">Best Time <span>{quickestTime}</span></span>

        <div className="restart">
          <Button onClick={handleRestart}>
            <i className="fa fa-repeat"></i>
          </Button>
        </div>
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
        open={showModal}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Brilliant!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You completed the game in {moves} moves in {time} seconds. Your best score is{" "}
            {lowestMoves} moves in {quickestTime} seconds.
          </DialogContentText>
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
