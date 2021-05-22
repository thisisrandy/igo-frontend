import React, { useEffect, useState } from "react";
import PersistentAlert from "./PersistentAlert";
import { CONNECTED } from "../constants/StateKeys";
import { useSelector } from "react-redux";
import { SERVER_URI } from "../constants/ServerInfo";
import { CONNECTION_ALERT_DELAY_MS } from "../constants/ConnectionAlertDelay";
import { GAME } from "../constants/ReducerKeys";
import { Typography } from "@material-ui/core";

function ConnectionAlert({ zIndex }) {
  const { [CONNECTED]: connected } = useSelector((state) => state[GAME]);

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
    <PersistentAlert
      zIndex={zIndex}
      open={!hidden && !connected}
      message={
        <Typography>
          Connection to the game server ({SERVER_URI}) either lost or not
          previously established. Attempting to (re)connect...
        </Typography>
      }
    />
  );
}

export default ConnectionAlert;
