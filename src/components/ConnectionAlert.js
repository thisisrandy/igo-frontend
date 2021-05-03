import React, { useEffect, useState } from "react";
import PersistentAlert from "./PersistentAlert";
import { CONNECTED } from "../constants/StateKeys";
import { useSelector } from "react-redux";
import { SERVER_URI } from "../constants/ServerInfo";
import dedent from "dedent-js";

function ConnectionAlert({ zIndex }) {
  const { [CONNECTED]: connected } = useSelector((state) => state.game);

  // We don't want this popping up immediately before the initial connection
  // under normal circumstances or otherwise for a short blip in the connection
  // (noting that redux-websocket defaults to a 2000ms reconnect interval, so
  // whether or not we "ignore" blips is up to configuration), so give it a
  // small delay
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    if (!connected) {
      const timeout = setTimeout(() => setHidden(false), 1000);
      return () => clearTimeout(timeout);
    } else {
      setHidden(true);
    }
  }, [connected]);

  return (
    <PersistentAlert
      zIndex={zIndex}
      open={!hidden && !connected}
      message={dedent(
        `Connection to the game server (${SERVER_URI}) either lost or not
        previously established. Attempting to (re)connect...`
      )}
    />
  );
}

export default ConnectionAlert;
