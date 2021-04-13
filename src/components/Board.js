import React from "react";
import { useStyles } from "../hooks/useStyles";
import board from "../images/board.png";

function Board() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <img src={board} alt="board" className={classes.Board} />
    </React.Fragment>
  );
}

export default Board;
