import React, { useState } from "react";
import { useStyles } from "../hooks/useStyles";
import goBoard from "../images/board.png";
import black from "../images/black.png";
import white from "../images/white.png";
import { Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { placeStone } from "../actions";

function Board() {
  const classes = useStyles();
  const { stones } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  // TODO: this is just a dummy POC for handling board clicks. Flesh out later
  const [turn, setTurn] = useState("w");
  const clickHandler = (i, j) => () => {
    console.log(`${turn}: ${i}, ${j}`);
    dispatch(placeStone(i, j, turn));
    setTurn(turn === "w" ? "b" : "w");
  };

  return (
    <Paper className={classes.BoardContainer}>
      <img
        src={goBoard}
        alt="go board"
        className={classes.BoardImage}
        onClick={clickHandler}
      />
      {Array.from(stones.entries(), ([i, row]) =>
        Array.from(row.entries(), ([j, point]) =>
          point === "w" ? (
            <img
              key={`${i},${j}`}
              src={white}
              alt="white stone"
              className={classes.StoneImage}
              style={{ gridRow: i + 2, gridColumn: j + 2 }}
            />
          ) : point === "b" ? (
            <img
              key={`${i},${j}`}
              src={black}
              alt="black stone"
              className={classes.StoneImage}
              style={{ gridRow: i + 2, gridColumn: j + 2 }}
            />
          ) : (
            <div
              key={`${i},${j}`}
              className={classes.EmptyPoint}
              style={{ gridRow: i + 2, gridColumn: j + 2 }}
              onClick={clickHandler(i, j)}
            />
          )
        )
      )}
    </Paper>
  );
}

export default Board;
