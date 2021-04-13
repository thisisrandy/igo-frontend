import React from "react";
import Board from "./Board";
import GameControls from "./GameControls";
import PlayerCard from "./PlayerCard";
import Clock from "./Clock";
import { useStyles } from "../hooks/useStyles";

function App() {
  const classes = useStyles();

  return (
    <div className={classes.App}>
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
