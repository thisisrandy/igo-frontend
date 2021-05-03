import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { STATUS, TURN, YOUR_COLOR } from "../constants/StateKeys";
import { COMPLETE, PLAY } from "../constants/GameStatus";

function GameStatusProvider(props) {
  const {
    [STATUS]: status,
    [TURN]: turn,
    [YOUR_COLOR]: your_color,
  } = useSelector((state) => state.game);

  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    setPlaying(typeof status !== "undefined" && status === PLAY);
  }, [status]);

  const [gameInProgress, setGameInProgress] = useState(false);
  useEffect(() => {
    setGameInProgress(typeof status !== "undefined" && status !== COMPLETE);
  }, [status]);

  const [myTurn, setMyTurn] = useState(false);
  useEffect(() => {
    setMyTurn(typeof turn !== "undefined" && turn === your_color);
  }, [turn, your_color]);

  return (
    <React.Fragment>
      {React.Children.map(props.children, (child) =>
        React.cloneElement(child, { playing, gameInProgress, myTurn })
      )}
    </React.Fragment>
  );
}

export default GameStatusProvider;
