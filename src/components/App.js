import React, { useEffect } from "react";
import Board from "./Board";
import GameControls from "./GameControls";
import PlayerCard from "./PlayerCard";
import Clock from "./Clock";
import { useStyles } from "../hooks/useStyles";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "@giantmachines/redux-websocket";
import { SERVER_URI } from "../constants/ServerInfo";
import Message from "./Message";
import RequestResponseDialog from "./RequestResponseDialog";
import GameStatusProvider from "./GameStatusProvider";
import RequestResponsePendingAlert from "./RequestResponsePendingAlert";
import ConnectionAlert from "./ConnectionAlert";
import GameRejoiner from "./GameRejoiner";
import { CONNECTED } from "../constants/StateKeys";

function App() {
  const classes = useStyles();
  const { [CONNECTED]: connected } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  // NOTE: as noted in middleware setup, redux-websocket for doesn't attempt to
  // reconnect if the first connection attempt fails, instead opting to only
  // reconnect a previously successful connection on certain configurable
  // conditions. As this doesn't fully meet our needs, it's easier just to turn
  // its mechanisms off and handle reconnection ourselves via an effect
  useEffect(() => {
    if (!connected) {
      const do_connect = () => dispatch(connect(SERVER_URI));
      do_connect();
      const interval = setInterval(do_connect, 2000);
      return () => clearInterval(interval);
    }
  }, [connected, dispatch]);

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
