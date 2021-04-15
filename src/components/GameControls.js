import { Button, Paper } from "@material-ui/core";
import React, { useState } from "react";
import { useStyles } from "../hooks/useStyles";

function GameControls() {
  const classes = useStyles();
  const [playing, setPlaying] = useState(false);

  // TODO: Callbacks and buttons are currently just stubs
  const gameButtonClick = () => setPlaying(true);
  const playButtonClick = () => setPlaying(false);

  return (
    <Paper className={classes.GameControlsContainer}>
      {playing ? (
        <React.Fragment>
          <Button
            variant="contained"
            className={classes.Button}
            onClick={playButtonClick}
          >
            Pass
          </Button>
          <Button
            variant="contained"
            className={classes.Button}
            onClick={playButtonClick}
          >
            Resign
          </Button>
          <Button
            variant="contained"
            className={classes.Button}
            onClick={playButtonClick}
          >
            Request Draw
          </Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Button
            variant="contained"
            className={classes.Button}
            onClick={gameButtonClick}
          >
            New Game
          </Button>
          <Button
            variant="contained"
            className={classes.Button}
            onClick={gameButtonClick}
          >
            Resume Game
          </Button>
          <Button
            variant="contained"
            className={classes.Button}
            onClick={gameButtonClick}
          >
            Join Game
          </Button>
        </React.Fragment>
      )}
    </Paper>
  );
}

export default GameControls;
