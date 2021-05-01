import { Button, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useStyles } from "../hooks/useStyles";
import { useDispatch, useSelector } from "react-redux";
import { send } from "@giantmachines/redux-websocket";
import {
  GAME_ACTION,
  JOIN_GAME,
  NEW_GAME,
} from "../constants/OutgoingMessageTypes";
import { HUMAN } from "../constants/OpponentTypes";
import {
  TYPE,
  VS,
  COLOR,
  KOMI,
  KEY,
  ACTION_TYPE,
} from "../constants/OutgoingMessageKeys";
import { WHITE } from "../constants/Colors";
import {
  CONNECTED,
  KEYS,
  STATUS,
  TURN,
  YOUR_COLOR,
} from "../constants/StateKeys";
import { COMPLETE, PLAY } from "../constants/GameStatus";
import { PASS_TURN, REQUEST_DRAW, RESIGN } from "../constants/GameActionTypes";

function GameControls() {
  const classes = useStyles();
  const {
    [STATUS]: status,
    [TURN]: turn,
    [YOUR_COLOR]: your_color,
    [KEYS]: keys,
    [CONNECTED]: connected,
  } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    setPlaying(typeof status !== "undefined" && status === PLAY);
  }, [status]);

  const [gameInProgress, setGameInProgress] = useState(false);
  useEffect(() => {
    setGameInProgress(typeof status !== "undefined" && status !== COMPLETE);
  }, [status]);

  const [myTurn, setMyTurn] = useState(false);
  useEffect(() => {
    setMyTurn(typeof turn !== "undefined" && turn === your_color);
  }, [turn, your_color]);

  const newGameButtonClick = () => {
    dispatch(
      send({ [TYPE]: NEW_GAME, [VS]: HUMAN, [COLOR]: WHITE, [KOMI]: 6.5 })
    );
  };

  const joinResumeGameButtonClick = () => {
    // TODO: unhide form dialog which sends a message like the below
    dispatch(send({ [TYPE]: JOIN_GAME, [KEY]: "0123456789" }));
  };

  const passButtonClick = () => {
    dispatch(
      send({
        [TYPE]: GAME_ACTION,
        [KEY]: keys[your_color],
        [ACTION_TYPE]: PASS_TURN,
      })
    );
  };

  const resignButtonClick = () => {
    // TODO: probably best to do an "are you sure?" type dialog first
    dispatch(
      send({
        [TYPE]: GAME_ACTION,
        [KEY]: keys[your_color],
        [ACTION_TYPE]: RESIGN,
      })
    );
  };

  const requestDrawButtonClick = () => {
    dispatch(
      send({
        [TYPE]: GAME_ACTION,
        [KEY]: keys[your_color],
        [ACTION_TYPE]: REQUEST_DRAW,
      })
    );
  };

  // TODO: Need request tally button and callback

  // TODO: Grey out when not playing, highlight when current turn, and add
  // indicator (star in upper-right) of which color is the user

  // TODO: Add help button which explains player keys and how to use them

  return (
    <Paper className={classes.GameControlsContainer}>
      {gameInProgress ? (
        <React.Fragment>
          <Button
            variant="contained"
            className={classes.Button}
            onClick={passButtonClick}
            disabled={!connected || !playing || !myTurn}
          >
            Pass
          </Button>
          <Button
            variant="contained"
            className={classes.Button}
            onClick={resignButtonClick}
            disabled={!connected || !playing}
          >
            Resign
          </Button>
          <Button
            variant="contained"
            className={classes.Button}
            onClick={requestDrawButtonClick}
            disabled={!connected || !playing}
          >
            Request Draw
          </Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Button
            variant="contained"
            className={classes.Button}
            onClick={newGameButtonClick}
            disabled={!connected}
          >
            New Game
          </Button>
          <Button
            variant="contained"
            className={classes.Button}
            onClick={joinResumeGameButtonClick}
            disabled={!connected}
          >
            Resume Game
          </Button>
          <Button
            variant="contained"
            className={classes.Button}
            onClick={joinResumeGameButtonClick}
            disabled={!connected}
          >
            Join Game
          </Button>
        </React.Fragment>
      )}
    </Paper>
  );
}

export default GameControls;
