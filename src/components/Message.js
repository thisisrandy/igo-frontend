import {
  Backdrop,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAlert } from "../actions";
import { ALERT } from "../constants/StateKeys";
import { useStyles } from "../hooks/useStyles";

function Message() {
  const classes = useStyles();
  const { [ALERT]: alert } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const clickHandler = () => dispatch(clearAlert());

  return (
    // TODO: Use commented markup as template for "waiting," e.g. waiting for a
    // reply from the other player for something or reconnecting to server

    // <Backdrop
    //   className={classes.MessageBackdrop}
    //   open={typeof alert !== "undefined" && alert !== ""}
    //   onClick={() => dispatch(clearAlert())}
    // >
    //   <Paper className={classes.MessagePaper}>
    //     <Typography className={classes.MessageText} variant="h6">
    //       {alert}
    //     </Typography>
    //   </Paper>
    // </Backdrop>

    <Dialog
      open={typeof alert !== "undefined" && alert !== ""}
      onClick={clickHandler}
    >
      <DialogContent className={classes.DialogContent}>
        <DialogContentText className={classes.MessageText}>
          {alert}
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
