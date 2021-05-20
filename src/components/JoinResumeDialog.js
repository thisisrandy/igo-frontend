import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Zoom,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useStyles } from "../hooks/useStyles";
import { useDispatch, useSelector } from "react-redux";
import { send } from "@giantmachines/redux-websocket";
import { JOIN_GAME } from "../constants/OutgoingMessageTypes";
import { TYPE, KEY } from "../constants/OutgoingMessageKeys";
import { CONNECTED } from "../constants/StateKeys";
import { DraggableDialogTitle, DraggablePaper } from "./DraggablePaper";
import { PLAYER_KEY_LENGTH } from "../constants/PlayerKeyInfo";
import JoinResumeInput from "./JoinResumeInput";

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

  const [canSubmit, setCanSubmit] = useState(false);
  useEffect(() => {
    setCanSubmit(joinResumeKey.length === PLAYER_KEY_LENGTH && connected);
  }, [joinResumeKey.length, connected]);

  return (
    <Dialog
      open={joinResumeDialogOpen}
      onClose={() => setJoinResumeDialogOpen(false)}
      PaperComponent={DraggablePaper}
      TransitionComponent={Zoom}
    >
      <DraggableDialogTitle>Join/Resume Game</DraggableDialogTitle>
      <DialogContent className={classes.DialogContent}>
        <DialogContentText>
          To join a new game, ask the player who created the game for the{" "}
          {PLAYER_KEY_LENGTH}-digit player key for their opponent. If resuming,
          enter the same key that was previously assigned to you. If you want to
          view a past game, enter your player key from that game.
        </DialogContentText>
        <JoinResumeInput
          {...{
            joinResumeKey,
            setJoinResumeKey,
            canSubmit,
            joinResumeSubmitClick,
          }}
        />
      </DialogContent>
      <DialogActions
        disableSpacing={true}
        className={classes.DialogButtonContainer}
      >
        <Button
          className={classes.Button}
          variant="contained"
          onClick={joinResumeSubmitClick}
          disabled={!canSubmit}
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
