import React from "react";
import { useStyles } from "../hooks/useStyles";
import board_9x9 from "../images/board_9x9.png";
import board_13x13 from "../images/board_13x13.png";
import board_19x19 from "../images/board_19x19.png";
import { Paper } from "@material-ui/core";
import { useSelector } from "react-redux";
import { BOARD } from "../constants/StateKeys";
import Point from "./Point";
import { POINTS, SIZE } from "../constants/BoardKeys";

function Board({ myTurn, playing, endGame }) {
  const classes = useStyles();
  const { [SIZE]: size, [POINTS]: points } = useSelector(
    (state) => state.game[BOARD]
  );

  let board = null;
  switch (size) {
    case 9:
      board = board_9x9;
      break;
    case 13:
      board = board_13x13;
      break;
    case 19:
      board = board_19x19;
      break;
    default:
      throw new RangeError(`Unsupported board size ${size}`);
  }
  // TODO: adjust this accordingly for 9x9 and 13x13 boards with appropriately
  // sized borders
  const gridTemplateStyling = `0.25fr repeat(${size}, ${19 / size}fr) 0.25fr`;

  return (
    <Paper
      className={classes.BoardContainer}
      style={{
        gridTemplateColumns: gridTemplateStyling,
        gridTemplateRows: gridTemplateStyling,
      }}
    >
      <img src={board} alt="go board" className={classes.BoardImage} />
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
