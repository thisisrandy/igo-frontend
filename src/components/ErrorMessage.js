import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Zoom,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../actions";
import { ERROR_MESSAGE } from "../constants/StateKeys";
import { useStyles } from "../hooks/useStyles";
import { DraggablePaper, DraggableDialogTitle } from "./DraggablePaper";
import { GAME } from "../constants/ReducerKeys";

function ErrorMessage({ zIndex }) {
  const classes = useStyles();
  const { [ERROR_MESSAGE]: message } = useSelector((state) => state[GAME]);
  const dispatch = useDispatch();

  const clickHandler = () => dispatch(clearError());

  return (
    <Dialog
      open={message != null && message !== ""}
      style={{ zIndex: zIndex }}
      PaperComponent={DraggablePaper}
      TransitionComponent={Zoom}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          clickHandler();
        }
      }}
    >
      <DraggableDialogTitle>Error</DraggableDialogTitle>
      <DialogContent className={classes.DialogContent}>
        <DialogContentText>
          The game server encountered an error: "{message}". This is likely
          because it is having connectivity issues with the underlying database,
          which should be remedied shortly. Please wait a while and try again.
        </DialogContentText>
      </DialogContent>
      <DialogActions
        disableSpacing={true}
        className={classes.MessageButtonContainer}
      >
        <Button
          className={classes.Button}
          variant="contained"
          onClick={clickHandler}
        >
          Dismiss
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ErrorMessage;
