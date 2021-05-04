import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../actions";
import { MESSAGE } from "../constants/StateKeys";
import { useStyles } from "../hooks/useStyles";
import {
  DraggablePaper,
  DraggableDialogTitle,
  DraggableDialogActions,
} from "./DraggablePaper";

function Message({ zIndex }) {
  const classes = useStyles();
  const { [MESSAGE]: message } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const clickHandler = () => dispatch(clearMessage());

  return (
    <Dialog
      open={message != null && message !== ""}
      style={{ zIndex: zIndex }}
      PaperComponent={DraggablePaper}
    >
      <DraggableDialogTitle>Message</DraggableDialogTitle>
      <DialogContent className={classes.DialogContent}>
        <DialogContentText className={classes.MessageText}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DraggableDialogActions className={classes.MessageButtonContainer}>
        <Button
          className={classes.Button}
          variant="contained"
          onClick={clickHandler}
        >
          Okay
        </Button>
      </DraggableDialogActions>
    </Dialog>
  );
}

export default Message;
