import React from "react";
import { useStyles } from "../hooks/useStyles";
import goBoard from "../images/board.png";
import black from "../images/black.png";
import white from "../images/white.png";
import { Paper } from "@material-ui/core";
import { useSelector } from "react-redux";

function Board() {
  const classes = useStyles();
  const { stones } = useSelector((state) => state.board);

  return (
    <Paper className={classes.BoardContainer}>
      <img src={goBoard} alt="board" className={classes.BoardImage} />
      {Array.from(stones.entries(), ([i, row]) =>
        Array.from(
          row.entries(),
          ([j, point]) =>
            point !== "." &&
            (point === "w" ? (
              <img
                src={white}
                alt="white stone"
                className={classes.StoneImage}
                style={{ gridRow: i + 2, gridColumn: j + 2 }}
              />
            ) : (
              <img
                src={black}
                alt="black stone"
                className={classes.StoneImage}
                style={{ gridRow: i + 2, gridColumn: j + 2 }}
              />
            ))
        )
      )}
    </Paper>
  );
}

export default Board;
