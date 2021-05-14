import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "@giantmachines/redux-websocket";
import { RECONNECT_INTERVAL_MS, SERVER_URI } from "../constants/ServerInfo";
import { CONNECTED } from "../constants/StateKeys";

function ConnectionManager() {
  const { [CONNECTED]: connected } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  // NOTE: as noted in middleware setup, redux-websocket for doesn't attempt to
  // reconnect if the first connection attempt fails, instead opting to only
  // reconnect a previously successful connection on certain configurable
  // conditions. As this doesn't fully meet our needs, it's easier just to turn
  // its mechanisms off and handle reconnection ourselves via an effect
  useEffect(() => {
    if (!connected) {
      const do_connect = () => dispatch(connect(SERVER_URI));
      do_connect();
      const interval = setInterval(do_connect, RECONNECT_INTERVAL_MS);
      return () => clearInterval(interval);
    }
  }, [connected, dispatch]);

  return null;
}

export default ConnectionManager;
