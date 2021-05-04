import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../actions";
import { MESSAGE } from "../constants/StateKeys";
import { useStyles } from "../hooks/useStyles";

function Message({ zIndex }) {
  const classes = useStyles();
  const { [MESSAGE]: message } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const clickHandler = () => dispatch(clearMessage());

  return (
    <Dialog
      open={typeof message !== "undefined" && message !== ""}
      style={{ zIndex: zIndex }}
    >
      <DialogContent className={classes.DialogContent}>
        <DialogContentText className={classes.MessageText}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.MessageButtonContainer}>
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
