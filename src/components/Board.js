import React from "react";
import { useStyles } from "../hooks/useStyles";
import goBoard from "../images/board_19x19.png";
import { Paper } from "@material-ui/core";
import { useSelector } from "react-redux";
import { BOARD } from "../constants/StateKeys";
import Point from "./Point";
import { POINTS } from "../constants/BoardKeys";

function Board({ myTurn, playing, endGame }) {
  const classes = useStyles();
  const { [POINTS]: points } = useSelector((state) => state.game[BOARD]);

  return (
    <Paper className={classes.BoardContainer}>
      <img src={goBoard} alt="go board" className={classes.BoardImage} />
      {Array.from(points.entries(), ([i, row]) =>
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
