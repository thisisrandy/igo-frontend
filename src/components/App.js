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
import { ALERT_ZINDEX_BASE } from "../constants/AlertZindex";

function App() {
  const classes = useStyles();

  // TODO: Add some sort of info link, probably to github

  return (
    <div className={classes.App}>
      <ConnectionManager />
      <GameRejoiner />
      <RequestResponseDialog zIndex={ALERT_ZINDEX_BASE} />
      <RequestResponsePendingAlert zIndex={ALERT_ZINDEX_BASE} />
      <Message zIndex={ALERT_ZINDEX_BASE + 1} />
      <ConnectionAlert zIndex={ALERT_ZINDEX_BASE + 2} />
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
