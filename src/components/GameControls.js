import { Button, Paper } from "@material-ui/core";
import React, { useState } from "react";
import { useStyles } from "../hooks/useStyles";
import { useDispatch, useSelector } from "react-redux";
import { send } from "@giantmachines/redux-websocket";
import { GAME_ACTION, NEW_GAME } from "../constants/OutgoingMessageTypes";
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
import { CONNECTED, KEYS, YOUR_COLOR } from "../constants/StateKeys";
import {
  PASS_TURN,
  REQUEST_DRAW,
  REQUEST_TALLY_SCORE,
  RESIGN,
} from "../constants/GameActionTypes";
import JoinResumeDialog from "./JoinResumeDialog";

function GameControls({ playing, endGame, gameInProgress, myTurn }) {
  const classes = useStyles();
  const {
    [YOUR_COLOR]: your_color,
    [KEYS]: keys,
    [CONNECTED]: connected,
  } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const newGameButtonClick = () => {
    // TODO: make this a dialog
    dispatch(
      send({ [TYPE]: NEW_GAME, [VS]: HUMAN, [COLOR]: WHITE, [KOMI]: 6.5 })
    );
  };

  const [joinResumeDialogOpen, setJoinResumeDialogOpen] = useState(false);
  const joinResumeGameButtonClick = () => {
    setJoinResumeDialogOpen(true);
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

  const requestTallyScore = () => {
    dispatch(
      send({
        [TYPE]: GAME_ACTION,
        [KEY]: keys[your_color],
        [ACTION_TYPE]: REQUEST_TALLY_SCORE,
      })
    );
  };

  // TODO: Need request tally button and callback

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
            disabled={!connected || !playing || !myTurn}
          >
            Request Draw
          </Button>
          <Button
            variant="contained"
            className={classes.Button}
            onClick={requestTallyScore}
            disabled={!connected || !endGame}
          >
            Request Tally Score
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
            Join/Resume Game
          </Button>
          <JoinResumeDialog
            {...{ joinResumeDialogOpen, setJoinResumeDialogOpen }}
          />
        </React.Fragment>
      )}
    </Paper>
  );
}

export default GameControls;
