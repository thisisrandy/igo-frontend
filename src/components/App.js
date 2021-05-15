import React, { useState } from "react";
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
import { blueGrey } from "@material-ui/core/colors";
// See https://stackoverflow.com/a/64135466/12162258
import {
  unstable_createMuiStrictModeTheme,
  MuiThemeProvider,
} from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";

function App() {
  const classes = useStyles();

  // TODO: persist this to local storage
  const [darkMode, setDarkMode] = useState(true);
  const theme = unstable_createMuiStrictModeTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: blueGrey,
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.App}>
        <ConnectionManager />
        <GameRejoiner />
        <RequestResponseDialog zIndex={ALERT_ZINDEX_BASE} />
        <RequestResponsePendingAlert zIndex={ALERT_ZINDEX_BASE} />
        <EndgameHelpMessage zIndex={ALERT_ZINDEX_BASE + 1} />
        <Message zIndex={ALERT_ZINDEX_BASE + 2} />
        <ConnectionAlert zIndex={ALERT_ZINDEX_BASE + 3} />
        <TopBar {...{ darkMode, setDarkMode }} />
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
    </MuiThemeProvider>
  );
}

export default App;
