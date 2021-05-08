import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Zoom,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PLAY, ENDGAME } from "../constants/GameStatus";
import { STATUS } from "../constants/StateKeys";
import { useStyles } from "../hooks/useStyles";
import { DraggablePaper, DraggableDialogTitle } from "./DraggablePaper";
import dedent from "dedent-js";

function EndgameHelpMessage({ zIndex }) {
  const classes = useStyles();
  const { [STATUS]: status } = useSelector((state) => state.game);

  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (status === PLAY) {
      setShown(false);
    }
  }, [status]);

  return (
    <Dialog
      open={status === ENDGAME && !shown}
      style={{ zIndex: zIndex }}
      PaperComponent={DraggablePaper}
      TransitionComponent={Zoom}
    >
      <DraggableDialogTitle>Endgame</DraggableDialogTitle>
      <DialogContent className={classes.DialogContent}>
        <DialogContentText className={classes.MessageText}>
          {dedent(`As both players have passed in succession, the endgame has
            begun. Please click on any groups you believe to be dead to mark them
            as such. Your opponent will be given the opportunity to accept or
            reject any marks you make, and likewise you will be given the
            opportunity to respond to any marks your opponent makes. When you are
            satisfied that all dead stones have been removed from the board, click
            the Request Tally Score button, or respond in the affirmative if your
            opponent clicks it first.`)}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        disableSpacing={true}
        className={classes.MessageButtonContainer}
      >
        <Button
          className={classes.Button}
          variant="contained"
          onClick={() => setShown(true)}
        >
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EndgameHelpMessage;
