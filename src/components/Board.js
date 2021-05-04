import React from "react";
import { useStyles } from "../hooks/useStyles";
import goBoard from "../images/board.png";
import blackStone from "../images/black.png";
import whiteStone from "../images/white.png";
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
import { MARK_DEAD, PLACE_STONE } from "../constants/GameActionTypes";
import { BOARD, CONNECTED, KEYS, YOUR_COLOR } from "../constants/StateKeys";
import clsx from "clsx";
import ClearIcon from "@material-ui/icons/Clear";
import { BLACK, WHITE } from "../constants/Colors";

function Board({ myTurn, playing, endGame }) {
  const classes = useStyles();
  const {
    [BOARD]: board,
    [YOUR_COLOR]: your_color,
    [KEYS]: keys,
    [CONNECTED]: connected,
  } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const emptyPointClickHandler = (i, j) => () => {
    if (connected && playing && myTurn) {
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

  const stoneClickHandler = (i, j) => () => {
    if (connected && endGame) {
      dispatch(
        send({
          [TYPE]: GAME_ACTION,
          [KEY]: keys[your_color],
          [ACTION_TYPE]: MARK_DEAD,
          [COORDS]: [i, j],
        })
      );
    }
  };

  return (
    <Paper className={classes.BoardContainer}>
      <img src={goBoard} alt="go board" className={classes.BoardImage} />
      {Array.from(board.entries(), ([i, row]) =>
        Array.from(row.entries(), ([j, point]) =>
          point[0] === "w" ? (
            <React.Fragment>
              <img
                key={`${i},${j}`}
                src={whiteStone}
                alt={`${WHITE} stone`}
                className={clsx(
                  classes.StoneImage,
                  endGame ? classes.PointHover : {}
                )}
                style={{ gridRow: i + 2, gridColumn: j + 2 }}
                onClick={stoneClickHandler(i, j)}
              />
              {point[1] && (
                <ClearIcon
                  style={{ gridRow: i + 2, gridColumn: j + 2 }}
                  className={classes.DeadStone}
                />
              )}
            </React.Fragment>
          ) : point[0] === "b" ? (
            <React.Fragment>
              <img
                key={`${i},${j}`}
                src={blackStone}
                alt={`${BLACK} stone`}
                className={clsx(
                  classes.StoneImage,
                  endGame ? classes.PointHover : {}
                )}
                style={{ gridRow: i + 2, gridColumn: j + 2 }}
                onClick={stoneClickHandler(i, j)}
              />
              {point[1] && (
                <ClearIcon
                  style={{ gridRow: i + 2, gridColumn: j + 2 }}
                  className={classes.DeadStone}
                />
              )}
            </React.Fragment>
          ) : (
            <div
              key={`${i},${j}`}
              className={clsx(
                classes.EmptyPoint,
                playing && myTurn ? classes.PointHover : {}
              )}
              style={{ gridRow: i + 2, gridColumn: j + 2 }}
              onClick={emptyPointClickHandler(i, j)}
            />
          )
        )
      )}
    </Paper>
  );
}

export default Board;
