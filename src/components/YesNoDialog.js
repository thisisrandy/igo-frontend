import {
  Dialog,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "../hooks/useStyles";
import { DraggableDialogTitle, DraggablePaper } from "./DraggablePaper";

function YesNoDialog({ zIndex, open, title, text, yesHandler, noHandler }) {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      style={{ zIndex: zIndex }}
      PaperComponent={DraggablePaper}
    >
      <DraggableDialogTitle>{title}</DraggableDialogTitle>
      <DialogContent className={classes.DialogContent}>
        <DialogContentText className={classes.MessageText}>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        disableSpacing={true}
        className={classes.MessageButtonContainer}
      >
        <Button
          className={classes.Button}
          variant="contained"
          onClick={yesHandler}
        >
          Yes
        </Button>
        <Button
          className={classes.Button}
          variant="contained"
          onClick={noHandler}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default YesNoDialog;
