import React, { useCallback } from "react";
import PersistentAlert from "./PersistentAlert";
import { REQUEST_PENDING } from "../constants/GameStatus";
import { PENDING_REQUEST, STATUS, YOUR_COLOR } from "../constants/StateKeys";
import { useSelector } from "react-redux";
import { INITIATOR, REQUEST_TYPE } from "../constants/RequestKeys";
import { MARK_DEAD, DRAW, TALLY_SCORE } from "../constants/RequestType";
import { GAME } from "../constants/ReducerKeys";
import { Typography } from "@material-ui/core";

function RequestResponsePendingAlert({ zIndex }) {
  const {
    [STATUS]: gameStatus,
    [PENDING_REQUEST]: pendingRequest,
    [YOUR_COLOR]: yourColor,
  } = useSelector((state) => state[GAME]);

  const getOpen = useCallback(() => {
    if (gameStatus !== REQUEST_PENDING) return false;
    return pendingRequest[INITIATOR] === yourColor;
  }, [gameStatus, pendingRequest, yourColor]);

  const getText = useCallback(() => {
    if (gameStatus !== REQUEST_PENDING) return "";
    switch (pendingRequest[REQUEST_TYPE]) {
      case MARK_DEAD:
        return (
          <Typography>
            You marked a group as dead. If your opponent accepts, the group will
            be removed and counted as prisoner(s). Otherwise, you will be
            returned to play to resolve the disagreement. Awaiting their
            response...
          </Typography>
        );
      case DRAW:
        return (
          <Typography>
            You requested a draw. Awaiting your opponent's response...
          </Typography>
        );
      case TALLY_SCORE:
        return (
          <Typography>
            You indicated that you are ready to tally the score. If your
            opponent agrees, territory will be calculated and the game will end.
            Otherwise, you will be returned to the endgame to resolve the
            disagreement. Awaiting their response...
          </Typography>
        );
      default:
        throw new TypeError(
          `Unknown request type ${pendingRequest[REQUEST_TYPE]} encountered`
        );
    }
  }, [gameStatus, pendingRequest]);

  return (
    <PersistentAlert zIndex={zIndex} open={getOpen()}>
      {getText()}
    </PersistentAlert>
  );
}

export default RequestResponsePendingAlert;
