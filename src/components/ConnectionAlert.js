import React, { useEffect, useState } from "react";
import PersistentAlert from "./PersistentAlert";
import { CONNECTED } from "../constants/StateKeys";
import { useSelector } from "react-redux";
import { CONNECTION_ALERT_DELAY_MS } from "../constants/ConnectionSettings";
import { GAME } from "../constants/ReducerKeys";
import { breakLongWords } from "../utils";

function ConnectionAlert({ zIndex }) {
  const { [CONNECTED]: connected } = useSelector((state) => state[GAME]);
  const serverUri = process.env.REACT_APP_GAME_SERVER_URI;

  // We don't want this popping up immediately before the initial connection
  // under normal circumstances, so give it a small delay
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    if (!connected) {
      const timeout = setTimeout(
        () => setHidden(false),
        CONNECTION_ALERT_DELAY_MS
      );
      return () => clearTimeout(timeout);
    } else {
      setHidden(true);
    }
  }, [connected]);

  return (
    <PersistentAlert zIndex={zIndex} open={!hidden && !connected}>
      Connection to the game server (
      {/* On small screens, a long websocket string can cause ugly horizontal
          scrolling, so break it up if need be */}
      {document.documentElement.clientWidth >= 500
        ? serverUri
        : breakLongWords(serverUri, 30)}
      ) either lost or not previously established. Attempting to (re)connect...
    </PersistentAlert>
  );
}

export default ConnectionAlert;
