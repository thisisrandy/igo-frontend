import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACCEPT, REJECT } from "../constants/GameActionTypes";
import { INITIATOR, REQUEST_TYPE } from "../constants/RequestKeys";
import {
  KEYS,
  PENDINGREQUEST,
  STATUS,
  YOUR_COLOR,
} from "../constants/StateKeys";
import { useStyles } from "../hooks/useStyles";
import dedent from "dedent-js";
import { send } from "@giantmachines/redux-websocket";
import { ACTION_TYPE, KEY, TYPE } from "../constants/OutgoingMessageKeys";
import { GAME_ACTION } from "../constants/OutgoingMessageTypes";
import { MARK_DEAD, DRAW, TALLY_SCORE } from "../constants/RequestType";
import { REQUEST_PENDING } from "../constants/GameStatus";

function RequestResponseDialog({ zIndex }) {
  const classes = useStyles();
  const {
    [STATUS]: gameStatus,
    [PENDINGREQUEST]: pendingRequest,
    [YOUR_COLOR]: your_color,
    [KEYS]: keys,
  } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const getDialogOpen = useCallback(() => {
    if (gameStatus !== REQUEST_PENDING) return false;
    return pendingRequest[INITIATOR] !== your_color;
  }, [gameStatus, pendingRequest, your_color]);

  const getRequestText = useCallback(() => {
    if (gameStatus !== REQUEST_PENDING) return "";
    const color =
      pendingRequest[INITIATOR].charAt(0).toUpperCase() +
      pendingRequest[INITIATOR].slice(1);
    switch (pendingRequest[REQUEST_TYPE]) {
      case MARK_DEAD:
        return dedent(`${color} has marked a group as dead. Do you concur? If
          yes, the group will be removed and counted as prisoner(s). If no, you
          will be returned to play to resolve the disagreement`);
      case DRAW:
        return `${color} has requested a draw. Do you accept?`;
      case TALLY_SCORE:
        return dedent(`${color} has indicated that they are ready to tally
          the score. Do you concur? If yes, territory will be calculated and
          the game will end. If no, you will be returned to play to resolve
          the disagreement`);
      default:
        throw new TypeError(
          `Unknown request type ${pendingRequest[REQUEST_TYPE]} encountered`
        );
    }
  }, [gameStatus, pendingRequest]);

  const accept = () => {
    dispatch(
      send({
        [TYPE]: GAME_ACTION,
        [KEY]: keys[your_color],
        [ACTION_TYPE]: ACCEPT,
      })
    );
  };
  const reject = () => {
    dispatch(
      send({
        [TYPE]: GAME_ACTION,
        [KEY]: keys[your_color],
        [ACTION_TYPE]: REJECT,
      })
    );
  };

  return (
    <Dialog open={getDialogOpen()} style={{ zIndex: zIndex }}>
      <DialogContent className={classes.DialogContent}>
        <DialogContentText className={classes.MessageText}>
          {getRequestText()}
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.MessageButtonContainer}>
        <Button className={classes.Button} variant="contained" onClick={accept}>
          Yes
        </Button>
        <Button className={classes.Button} variant="contained" onClick={reject}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RequestResponseDialog;
