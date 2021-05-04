import { Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useStyles } from "../hooks/useStyles";

function Clock() {
  const classes = useStyles();
  const [time, setTime] = useState(0);

  // TODO: State and effects are just mocks for now
  // TODO: Add game status indicator
  useEffect(() => {
    setTimeout(() => setTime(time + 1), 1000);
  });

  const hhmmss = (seconds) => {
    return (
      (seconds >= 86400 ? Math.floor(seconds / 86400) + "d, " : "") +
      new Date(seconds * 1000).toISOString().slice(11, 19)
    );
  };

  return (
    <Paper className={classes.ClockContainer}>
      <Typography>{hhmmss(time)}</Typography>
    </Paper>
  );
}

export default Clock;
