import React from "react";
import PersistentAlert from "./PersistentAlert";
import { CONNECTED } from "../constants/StateKeys";
import { useSelector } from "react-redux";
import { SERVER_URI } from "../constants/ServerInfo";
import dedent from "dedent-js";

function ConnectionAlert({ zIndex }) {
  const { [CONNECTED]: connected } = useSelector((state) => state.game);

  return (
    <PersistentAlert
      zIndex={zIndex}
      open={!connected}
      message={dedent(
        `Connection to the game server (${SERVER_URI}) either lost or not
        previously established. Attempting to (re)connect...`
      )}
    />
  );
}

export default ConnectionAlert;
