import React from "react";
import { useStyles } from "../hooks/useStyles";
import board from "../images/board.png";
import { Paper } from "@material-ui/core";

function Board() {
  const classes = useStyles();
  return (
    <Paper className={classes.BoardContainer}>
      <img src={board} alt="board" className={classes.BoardImage} />
    </Paper>
  );
}

export default Board;
