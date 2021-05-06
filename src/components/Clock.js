import { Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TIME_PLAYED, STATUS } from "../constants/StateKeys";
import { useStyles } from "../hooks/useStyles";
import { COMPLETE } from "../constants/GameStatus";

function Clock() {
  const classes = useStyles();
  const { [TIME_PLAYED]: serverTimePlayed, [STATUS]: gameStatus } = useSelector(
    (state) => state.game
  );

  // TODO: Add game status indicator

  const [timePlayed, setTimePlayed] = useState(0);
  useEffect(() => {
    if (serverTimePlayed != null) {
      setTimePlayed(serverTimePlayed);
      if (gameStatus !== COMPLETE) {
        const interval = setInterval(
          () => setTimePlayed((prevTimePlayed) => prevTimePlayed + 1),
          1000
        );
        return () => clearInterval(interval);
      }
    } else {
      // NOTE: in the current design, this branch will never be executed,
      // because we never leave a game, i.e. purge its state, without replacing
      // it with a new set of state. Leaving it here in case that changes at
      // some point in the future
      setTimePlayed(0);
    }
  }, [serverTimePlayed, gameStatus]);

  const hhmmss = (seconds) => {
    return (
      (seconds >= 86400 ? Math.floor(seconds / 86400) + "d, " : "") +
      new Date(seconds * 1000).toISOString().slice(11, 19)
    );
  };

  return (
    <Paper className={classes.ClockContainer}>
      <Typography>Time played: {hhmmss(timePlayed)}</Typography>
    </Paper>
  );
}

export default Clock;
