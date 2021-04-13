import { Paper } from "@material-ui/core";
import React from "react";
import { useStyles } from "../hooks/useStyles";

function Clock() {
  const classes = useStyles();
  return <Paper className={classes.ClockContainer}></Paper>;
}

export default Clock;
