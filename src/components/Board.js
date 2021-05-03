import React from "react";
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
import { BOARD, CONNECTED, KEYS, YOUR_COLOR } from "../constants/StateKeys";
import clsx from "clsx";

function Board({ myTurn }) {
  const classes = useStyles();
  const {
    [BOARD]: board,
    [YOUR_COLOR]: your_color,
    [KEYS]: keys,
    [CONNECTED]: connected,
  } = useSelector((state) => state.game);
  const dispatch = useDispatch();

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
                // TODO: this styling, as well as stone styling (we want to
                // highlight stones instead of empty points during the endgame
                // and nothing while complete or pending request), also depends
                // on game status. build that in later
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
