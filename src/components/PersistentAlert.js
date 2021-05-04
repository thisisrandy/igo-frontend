import { Backdrop, CircularProgress, Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "../hooks/useStyles";
import {
  DraggablePaper,
  draggableStyle,
  genericDraggableId,
} from "./DraggablePaper";

/***
 * This is a display component which should be wrapped with logic to determine a
 * message and openness
 */
function PersistentAlert({ message, zIndex, open }) {
  const classes = useStyles();

  return (
    <Backdrop className={classes.AlertBackdrop} open={open}>
      <DraggablePaper className={classes.AlertPaper} style={{ zIndex: zIndex }}>
        <Typography className={classes.AlertText} variant="body1">
          {message}
        </Typography>
        <div
          id={genericDraggableId}
          style={draggableStyle}
          className={classes.AlertProgressContainer}
        >
          <CircularProgress className={classes.AlertProgress} />
        </div>
      </DraggablePaper>
    </Backdrop>
  );
}

export default PersistentAlert;
