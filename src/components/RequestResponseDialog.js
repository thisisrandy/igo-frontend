import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACCEPT, MARK_DEAD, REJECT } from "../constants/GameActionTypes";
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
import { DRAW, TALLY_SCORE } from "../constants/RequestType";

function RequestResponseDialog() {
  const classes = useStyles();
  const {
    [STATUS]: gameStatus,
    [PENDINGREQUEST]: pendingRequest,
    [YOUR_COLOR]: your_color,
    [KEYS]: keys,
  } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  // TODO: use status to determine open and text
  // TODO: try using useCallback with deps instead of args
  const determineDialogOpen = useCallback(
    (request) => {
      if (request == null) return false;
      return request[INITIATOR] !== your_color;
    },
    [your_color]
  );
  const [dialogOpen, setDialogOpen] = useState(
    determineDialogOpen(pendingRequest)
  );
  useEffect(() => {
    setDialogOpen(determineDialogOpen(pendingRequest));
  }, [determineDialogOpen, pendingRequest]);

  const determineRequestText = (request) => {
    if (request == null) return "";
    const color =
      request[INITIATOR].charAt(0).toUpperCase() + request[INITIATOR].slice(1);
    switch (request[REQUEST_TYPE]) {
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
          `Unknown request type ${request[REQUEST_TYPE]} encountered`
        );
    }
  };
  const [requestText, setRequestText] = useState(
    determineRequestText(pendingRequest)
  );
  useEffect(() => {
    setRequestText(determineRequestText(pendingRequest));
  }, [pendingRequest]);

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
    <Dialog open={dialogOpen}>
      <DialogContent className={classes.DialogContent}>
        <DialogContentText className={classes.MessageText}>
          {requestText}
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
