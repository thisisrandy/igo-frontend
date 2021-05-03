import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { useStyles } from "../hooks/useStyles";
import { useDispatch, useSelector } from "react-redux";
import { send } from "@giantmachines/redux-websocket";
import { JOIN_GAME } from "../constants/OutgoingMessageTypes";
import { TYPE, KEY } from "../constants/OutgoingMessageKeys";
import { CONNECTED } from "../constants/StateKeys";

function JoinResumeDialog({ joinResumeDialogOpen, setJoinResumeDialogOpen }) {
  const classes = useStyles();
  const { [CONNECTED]: connected } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const [joinResumeKey, setJoinResumeKey] = useState("");
  const joinResumeSubmitClick = () => {
    setJoinResumeDialogOpen(false);
    dispatch(send({ [TYPE]: JOIN_GAME, [KEY]: joinResumeKey }));
    setJoinResumeKey("");
  };
  const joinResumeCancelClick = () => {
    setJoinResumeDialogOpen(false);
    setJoinResumeKey("");
  };

  return (
    <Dialog
      open={joinResumeDialogOpen}
      onClose={() => setJoinResumeDialogOpen(false)}
    >
      <DialogTitle>Join/Resume Game</DialogTitle>
      <DialogContent className={classes.DialogContent}>
        <DialogContentText>
          To join a new game, ask the player who created the game for the
          10-digit player key for their opponent. If resuming, enter the same
          key that was previously assigned to you. If you want to view a past
          game, enter your player key from that game.
        </DialogContentText>
        <TextField
          autoFocus
          id="joinResumeKeyField"
          label="Player key"
          margin="dense"
          inputProps={{ maxLength: 10 }}
          onInput={(e) => {
            setJoinResumeKey(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.Button}
          variant="contained"
          onClick={joinResumeSubmitClick}
          disabled={joinResumeKey.length !== 10 || !connected}
        >
          Submit
        </Button>
        <Button
          className={classes.Button}
          variant="contained"
          onClick={joinResumeCancelClick}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default JoinResumeDialog;
