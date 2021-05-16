import React, { useCallback } from "react";
import PersistentAlert from "./PersistentAlert";
import { REQUEST_PENDING } from "../constants/GameStatus";
import { PENDING_REQUEST, STATUS, YOUR_COLOR } from "../constants/StateKeys";
import { useSelector } from "react-redux";
import { INITIATOR, REQUEST_TYPE } from "../constants/RequestKeys";
import { MARK_DEAD, DRAW, TALLY_SCORE } from "../constants/RequestType";
import dedent from "dedent-js";

function RequestResponsePendingAlert({ zIndex }) {
  const {
    [STATUS]: gameStatus,
    [PENDING_REQUEST]: pendingRequest,
    [YOUR_COLOR]: yourColor,
  } = useSelector((state) => state.game);

  const getOpen = useCallback(() => {
    if (gameStatus !== REQUEST_PENDING) return false;
    return pendingRequest[INITIATOR] === yourColor;
  }, [gameStatus, pendingRequest, yourColor]);

  const getText = useCallback(() => {
    if (gameStatus !== REQUEST_PENDING) return "";
    switch (pendingRequest[REQUEST_TYPE]) {
      case MARK_DEAD:
        return dedent(`You marked a group as dead. If your opponent accepts,
          the group will be removed and counted as prisoner(s). Otherwise,
          you will be returned to play to resolve the disagreement. Awaiting
          their response...`);
      case DRAW:
        return `You requested a draw. Awaiting your opponent's response...`;
      case TALLY_SCORE:
        return dedent(`You indicated that you are ready to tally the score. If
          your opponent agrees, territory will be calculated and the game will
          end. Otherwise, you will be returned to the endgame to resolve the
          disagreement. Awaiting their response...`);
      default:
        throw new TypeError(
          `Unknown request type ${pendingRequest[REQUEST_TYPE]} encountered`
        );
    }
  }, [gameStatus, pendingRequest]);

  return (
    <PersistentAlert zIndex={zIndex} open={getOpen()} message={getText()} />
  );
}

export default RequestResponsePendingAlert;
