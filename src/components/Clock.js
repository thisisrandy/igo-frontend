import { Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useStyles } from "../hooks/useStyles";

function Clock() {
  const classes = useStyles();
  const [time, setTime] = useState(0);

  // TODO: State and effects are just mocks for now
  useEffect(() => {
    setTimeout(() => setTime(time + 1), 1000);
  });

  // NOTE: This "overflows" after 24 hours, but I don't really care
  const hhmmss = (seconds) => {
    return new Date(seconds * 1000).toISOString().slice(11, 19);
  };

  return (
    <Paper className={classes.ClockContainer}>
      <Typography>{hhmmss(time)}</Typography>
    </Paper>
  );
}

export default Clock;
