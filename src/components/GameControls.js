import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
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
import { CONNECTED, KEYS, YOUR_COLOR } from "../constants/StateKeys";
import { PASS_TURN, REQUEST_DRAW, RESIGN } from "../constants/GameActionTypes";

function GameControls({ playing, gameInProgress, myTurn }) {
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

  const [joinResumeKey, setJoinResumeKey] = useState("");
  const joinResumeSubmitClick = () => {
    setJoinResumeDialogOpen(false);
    dispatch(send({ [TYPE]: JOIN_GAME, [KEY]: joinResumeKey }));
    setJoinResumeKey("");
  };
  const joinResumeCancelClick = () => {
    setJoinResumeDialogOpen(false);
    setJoinResumeKey("");
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
            disabled={!connected || !playing || !myTurn}
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
            Join/Resume Game
          </Button>
          <Dialog
            open={joinResumeDialogOpen}
            onClose={() => setJoinResumeDialogOpen(false)}
          >
            <DialogTitle>Join/Resume Game</DialogTitle>
            <DialogContent className={classes.DialogContent}>
              <DialogContentText>
                To join a new game, ask the player who created the game for the
                10-digit player key for their opponent. If resuming, enter the
                same key that was previously assigned to you. If you want to
                view a past game, enter your player key from that game.
              </DialogContentText>
              <TextField
                autoFocus
                id="joinResumeKeyField"
                label="Player key"
                margin="dense"
                inputProps={{ maxLength: 10 }}
                onInput={(e) => {
                  setJoinResumeKey(e.target.value);
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                className={classes.Button}
                variant="contained"
                onClick={joinResumeSubmitClick}
                disabled={joinResumeKey.length !== 10}
              >
                Submit
              </Button>
              <Button
                className={classes.Button}
                variant="contained"
                onClick={joinResumeCancelClick}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      )}
    </Paper>
  );
}

export default GameControls;
