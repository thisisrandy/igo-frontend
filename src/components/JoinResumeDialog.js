import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
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
import { JOIN_RESUME_KEY_FIELD } from "../constants/Ids";

function JoinResumeDialog({ joinResumeDialogOpen, setJoinResumeDialogOpen }) {
  const classes = useStyles();
  const { [CONNECTED]: connected } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  // TODO: it'd be neat to have this auto-complete (w/dropdown) games played
  // before and persist them to local storage along with last played, which is
  // probably the last time the user received a status message about them and is
  // also the key by which they are sorted in the dropdown (descending)

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
        <TextField
          autoFocus
          id={JOIN_RESUME_KEY_FIELD}
          label="Player key"
          margin="dense"
          inputProps={{
            maxLength: PLAYER_KEY_LENGTH,
            spellCheck: false,
          }}
          onInput={(e) => {
            setJoinResumeKey(e.target.value.toLowerCase());
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter" && canSubmit) {
              joinResumeSubmitClick();
            }
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
