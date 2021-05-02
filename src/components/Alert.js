import { Backdrop, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAlert } from "../actions";
import { ALERT } from "../constants/StateKeys";
import { useStyles } from "../hooks/useStyles";

function Alert() {
  const classes = useStyles();
  const { [ALERT]: alert } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  return (
    <Backdrop
      className={classes.MessageBackdrop}
      open={typeof alert !== "undefined" && alert !== ""}
      onClick={() => dispatch(clearAlert())}
    >
      <Paper className={classes.MessagePaper}>
        <Typography className={classes.MessageText} variant="h6">
          {alert}
        </Typography>
      </Paper>
    </Backdrop>
  );
}

export default Alert;
