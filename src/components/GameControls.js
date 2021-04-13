import { Paper } from "@material-ui/core";
import React from "react";
import { useStyles } from "../hooks/useStyles";

function GameControls() {
  const classes = useStyles();
  return <Paper className={classes.ControlsContainer}></Paper>;
}

export default GameControls;
