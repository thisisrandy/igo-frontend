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
import GameStatusProvider from "./GameStatusProvider";
import RequestResponsePendingAlert from "./RequestResponsePendingAlert";
import ConnectionAlert from "./ConnectionAlert";
import GameRejoiner from "./GameRejoiner";

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  // FIXME: the connection gets immediately severed and reconnected on startup.
  // this is undoubtably because App gets re-rendered, but unclear why...
  dispatch(connect(SERVER_URI));

  return (
    <div className={classes.App}>
      <GameRejoiner />
      <RequestResponseDialog zIndex={2000} />
      <RequestResponsePendingAlert zIndex={2000} />
      <Message zIndex={2001} />
      <ConnectionAlert zIndex={2002} />
      <GameStatusProvider>
        <Board />
      </GameStatusProvider>
      <div className={classes.StatusControlsContainer}>
        <GameStatusProvider>
          <GameControls />
        </GameStatusProvider>
        <PlayerCard color="white" />
        <PlayerCard color="black" />
        <Clock />
      </div>
    </div>
  );
}

export default App;
