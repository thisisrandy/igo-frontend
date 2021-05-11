import React from "react";
import { useStyles } from "../hooks/useStyles";
import blackStone from "../images/black.png";
import whiteStone from "../images/white.png";
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
import { CONNECTED, KEYS, YOUR_COLOR } from "../constants/StateKeys";
import clsx from "clsx";
import ClearIcon from "@material-ui/icons/Clear";
import { BLACK, WHITE } from "../constants/Colors";

function Point({ i, j, point, myTurn, playing, endGame }) {
  const classes = useStyles();
  const {
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

  // NOTE: point is an array of length 4 with contents as follows:
  // [
  //    stone in ("w", "b", ""),
  //    marked dead in (true, false),
  //    counted in (true, false),
  //    counted for in ("w", "b", "")
  // ]

  return (
    <React.Fragment>
      {point[0] && (
        <img
          src={point[0] === "w" ? whiteStone : blackStone}
          alt={`${point[0] === "w" ? WHITE : BLACK} stone`}
          className={classes.StoneImage}
          style={{ gridRow: i + 2, gridColumn: j + 2 }}
        />
      )}
      {point[1] && (
        <ClearIcon
          style={{ gridRow: i + 2, gridColumn: j + 2 }}
          className={classes.DeadStone}
        />
      )}
      <div
        className={clsx(
          classes.Point,
          (!point[0] && playing && myTurn) || (point[0] && endGame)
            ? classes.PointHover
            : {},
          point[2] && point[3] === "w" ? classes.CountedWhite : {},
          point[2] && point[3] === "b" ? classes.CountedBlack : {}
        )}
        style={{ gridRow: i + 2, gridColumn: j + 2 }}
        onClick={
          !point[0] ? emptyPointClickHandler(i, j) : stoneClickHandler(i, j)
        }
      />
    </React.Fragment>
  );
}

export default Point;
