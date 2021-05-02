import React from "react";
import Board from "./Board";
import GameControls from "./GameControls";
import PlayerCard from "./PlayerCard";
import Clock from "./Clock";
import { useStyles } from "../hooks/useStyles";
import { useDispatch } from "react-redux";
import { connect } from "@giantmachines/redux-websocket";
import { SERVER_URI } from "../constants/ServerInfo";
import Message from "./Message";
import RequestResponseDialog from "./RequestResponseDialog";

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  dispatch(connect(SERVER_URI));

  return (
    <div className={classes.App}>
      {/* TODO: specify z-indices for various message types to indicate priority
      if more than one is open at a time, e.g. when one joins a game
      ("successfully joined as...") and there is a pending request open, we
      would like the join message to display on top */}
      <Message />
      <RequestResponseDialog />
      <Board />
      <div className={classes.StatusControlsContainer}>
        <GameControls />
        <PlayerCard color="white" />
        <PlayerCard color="black" />
        <Clock />
      </div>
    </div>
  );
}

export default App;
