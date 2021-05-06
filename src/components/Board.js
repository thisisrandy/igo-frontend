import React from "react";
import { useStyles } from "../hooks/useStyles";
import goBoard from "../images/board_19x19.png";
import { Paper } from "@material-ui/core";
import { useSelector } from "react-redux";
import { BOARD } from "../constants/StateKeys";
import Point from "./Point";

function Board({ myTurn, playing, endGame }) {
  const classes = useStyles();
  const { [BOARD]: board } = useSelector((state) => state.game);

  return (
    <Paper className={classes.BoardContainer}>
      <img src={goBoard} alt="go board" className={classes.BoardImage} />
      {Array.from(board.entries(), ([i, row]) =>
        Array.from(row.entries(), ([j, point]) => (
          <Point
            key={`${i},${j}`}
            {...{ i, j, point, myTurn, playing, endGame }}
          />
        ))
      )}
    </Paper>
  );
}

export default Board;
