import React from "react";
import classnames from "classnames";

const Card = ({ onClick, card, index, isMatch, isFlipped, isDisabled }) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };

  return (
    <li
      className={classnames("card", {
        "is-flipped": isFlipped,
        "is-match": isMatch
      })}
      onClick={handleClick}>
      <i className={card.image}></i>
    </li >
  );
};

export default Card;