import React from "react";
import Board from "./Board";
import GameControls from "./GameControls";
import PlayerCard from "./PlayerCard";
import Clock from "./Clock";
import { useStyles } from "../hooks/useStyles";
import Message from "./Message";
import RequestResponseDialog from "./RequestResponseDialog";
import GameStatusProvider from "./GameStatusProvider";
import RequestResponsePendingAlert from "./RequestResponsePendingAlert";
import ConnectionAlert from "./ConnectionAlert";
import GameRejoiner from "./GameRejoiner";
import ConnectionManager from "./ConnectionManager";
import { BLACK, WHITE } from "../constants/Colors";

function App() {
  const classes = useStyles();

  return (
    <div className={classes.App}>
      <ConnectionManager />
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
          <PlayerCard color={WHITE} />
          <PlayerCard color={BLACK} />
        </GameStatusProvider>
        <Clock />
      </div>
    </div>
  );
}

export default App;
