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
  let borderDim = null;
  let stoneHeightWidth = null;
  // board measurements in pixels
  // 9x9: 135, 210*8, 135 -> (135-210/2)/210
  // 13x13: 105, 145*12, 105 -> (105-145/2)/145
  // 19x19: 75, 100*18, 75 -> (75-100/2)/100
  switch (size) {
    case 9:
      board = board_9x9;
      borderDim = (135 - 210 / 2) / 210;
      stoneHeightWidth = "80%";
      break;
    case 13:
      board = board_13x13;
      borderDim = (105 - 145 / 2) / 145;
      stoneHeightWidth = "90%";
      break;
    case 19:
      board = board_19x19;
      borderDim = (75 - 100 / 2) / 100;
      stoneHeightWidth = "90%";
      break;
    default:
      throw new RangeError(`Unsupported board size ${size}`);
  }
  const gridTemplateStyling = `${borderDim}fr repeat(${size}, 1fr) ${borderDim}fr`;

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
            {...{ i, j, point, myTurn, playing, endGame, stoneHeightWidth }}
          />
        ))
      )}
    </Paper>
  );
}

export default Board;
