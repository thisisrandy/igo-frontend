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
