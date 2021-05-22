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
import { clearMessage } from "../actions";
import { MESSAGE } from "../constants/StateKeys";
import { useStyles } from "../hooks/useStyles";
import { DraggablePaper, DraggableDialogTitle } from "./DraggablePaper";
import { GAME } from "../constants/ReducerKeys";

function Message({ zIndex }) {
  const classes = useStyles();
  const { [MESSAGE]: message } = useSelector((state) => state[GAME]);
  const dispatch = useDispatch();

  const clickHandler = () => dispatch(clearMessage());

  return (
    <Dialog
      open={message != null && message !== ""}
      style={{ zIndex: zIndex }}
      PaperComponent={DraggablePaper}
      // NOTE: for unknown reasons, the outgoing transition is sometimes a
      // combination of whichever transition is chosen and Zoom. Choosing Zoom
      // explicitly patches the weird double-transition bug, so that is what we
      // elect to do. This applies anywhere that a Dialog component is used in
      // this codebase
      TransitionComponent={Zoom}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          clickHandler();
        }
      }}
    >
      <DraggableDialogTitle>Message</DraggableDialogTitle>
      <DialogContent className={classes.DialogContent}>
        <DialogContentText className={classes.MessageText}>
          {message}
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
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Message;
