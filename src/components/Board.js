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
      <div className={classes.BoardImage}>
        <img src={goBoard} alt="board" className={classes.board} />
      </div>
      {Array.from(stones.entries(), ([i, row]) =>
        Array.from(row.entries(), ([j, point]) => (
          <div
            style={{ gridRow: i + 2, gridColumn: j + 2, overflow: "hidden" }}
          >
            {point === "w" ? (
              <img src={white} alt="piece" className={classes.piece} />
            ) : point === "b" ? (
              <img src={black} alt="piece" className={classes.piece} />
            ) : (
              <React.Fragment />
            )}
          </div>
        ))
      )}
    </Paper>
  );
}

export default Board;
