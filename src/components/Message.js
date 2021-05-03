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
import { clearMessage } from "../actions";
import { MESSAGE } from "../constants/StateKeys";
import { useStyles } from "../hooks/useStyles";

function Message({ zIndex }) {
  const classes = useStyles();
  const { [MESSAGE]: message } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const clickHandler = () => dispatch(clearMessage());

  return (
    // TODO: Use commented markup as template for "waiting," e.g. waiting for a
    // reply from the other player for something or reconnecting to server

    // <Backdrop
    //   className={classes.AlertBackdrop}
    //   open={typeof alert !== "undefined" && alert !== ""}
    //   onClick={() => dispatch(clearAlert())}
    // >
    //   <Paper className={classes.AlertPaper}>
    //     <Typography className={classes.AlertText} variant="h6">
    //       {alert}
    //     </Typography>
    //   </Paper>
    // </Backdrop>

    // TODO: the outgoing transition doesn't look very nice. figure out how to
    // get rid of it here and elsewhere
    <Dialog
      open={typeof message !== "undefined" && message !== ""}
      onClick={clickHandler}
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
