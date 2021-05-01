import React, { useEffect, useState } from "react";
import { useStyles } from "../hooks/useStyles";
import goBoard from "../images/board.png";
import black from "../images/black.png";
import white from "../images/white.png";
import { Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { send } from "@giantmachines/redux-websocket";
import {
  ACTION_TYPE,
  COORDS,
  KEY,
  TYPE,
} from "../constants/OutgoingMessageKeys";
import { GAME_ACTION } from "../constants/OutgoingMessageTypes";
import { PLACE_STONE } from "../constants/GameActionTypes";
import {
  BOARD,
  CONNECTED,
  KEYS,
  TURN,
  YOUR_COLOR,
} from "../constants/StateKeys";
import clsx from "clsx";

function Board() {
  const classes = useStyles();
  const {
    [BOARD]: board,
    [TURN]: turn,
    [YOUR_COLOR]: your_color,
    [KEYS]: keys,
    [CONNECTED]: connected,
  } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const [myTurn, setMyTurn] = useState(false);
  useEffect(() => {
    setMyTurn(typeof turn !== "undefined" && turn === your_color);
  }, [turn, your_color]);

  const clickHandler = (i, j) => () => {
    if (connected && myTurn) {
      dispatch(
        send({
          [TYPE]: GAME_ACTION,
          [KEY]: keys[your_color],
          [ACTION_TYPE]: PLACE_STONE,
          [COORDS]: [i, j],
        })
      );
    }
  };

  return (
    <Paper className={classes.BoardContainer}>
      <img
        src={goBoard}
        alt="go board"
        className={classes.BoardImage}
        onClick={clickHandler}
      />
      {Array.from(board.entries(), ([i, row]) =>
        Array.from(row.entries(), ([j, point]) =>
          point[0] === "w" ? (
            <img
              key={`${i},${j}`}
              src={white}
              alt="white stone"
              className={classes.StoneImage}
              style={{ gridRow: i + 2, gridColumn: j + 2 }}
            />
          ) : point[0] === "b" ? (
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
              className={clsx(
                classes.EmptyPoint,
                myTurn ? classes.EmptyPointHover : {}
              )}
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
