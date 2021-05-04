import {
  Backdrop,
  CircularProgress,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "../hooks/useStyles";

/***
 * This is a display component which should be wrapped with logic to determine a
 * message and openness
 */
function PersistentAlert({ message, zIndex, open }) {
  const classes = useStyles();

  // TODO: make draggable
  return (
    <Backdrop className={classes.AlertBackdrop} open={open}>
      <Paper className={classes.AlertPaper} style={{ zIndex: zIndex }}>
        <Typography className={classes.AlertText} variant="body1">
          {message}
        </Typography>
        <CircularProgress className={classes.AlertProgress} />
      </Paper>
    </Backdrop>
  );
}

export default PersistentAlert;
