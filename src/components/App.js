import React from "react";
import Board from "./Board";
import GameControls from "./GameControls";
import PlayerCard from "./PlayerCard";
import InfoCard from "./InfoCard";
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
import EndgameHelpMessage from "./EndgameHelpMessage";
import TopBar from "./TopBar";

function App() {
  const classes = useStyles();

  return (
    <div className={classes.App}>
      <ConnectionManager />
      <GameRejoiner />
      <RequestResponseDialog zIndex={ALERT_ZINDEX_BASE} />
      <RequestResponsePendingAlert zIndex={ALERT_ZINDEX_BASE} />
      <EndgameHelpMessage zIndex={ALERT_ZINDEX_BASE + 1} />
      <Message zIndex={ALERT_ZINDEX_BASE + 2} />
      <ConnectionAlert zIndex={ALERT_ZINDEX_BASE + 3} />
      <TopBar />
      <GameStatusProvider>
        <Board />
      </GameStatusProvider>
      <div className={classes.StatusControlsContainer}>
        <GameStatusProvider>
          <GameControls />
          <PlayerCard color={BLACK} />
          <PlayerCard color={WHITE} />
        </GameStatusProvider>
        <InfoCard />
      </div>
    </div>
  );
}

export default App;
