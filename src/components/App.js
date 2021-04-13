import React from "react";
import Board from "./Board";
import GameControls from "./GameControls";
import PlayerCard from "./PlayerCard";
import Clock from "./Clock";

function App() {
  return (
    <div>
      <Board />
      <GameControls />
      <div>
        <PlayerCard color="white" />
        <PlayerCard color="black" />
      </div>
      <Clock />
    </div>
  );
}

export default App;
