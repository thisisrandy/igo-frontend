import {
  CLEAR_ALERT,
  PLACE_STONE,
  WS_CLOSED,
  WS_MESSAGE,
  WS_OPEN,
} from "../constants/ActionTypes";
import {
  EXPLANATION,
  KEYS,
  SUCCESS,
  YOUR_COLOR,
} from "../constants/IncomingMessageKeys";
import {
  GAME_ACTION_RESPONSE,
  GAME_STATUS,
  JOIN_GAME_RESPONSE,
  NEW_GAME_RESPONSE,
} from "../constants/IncomingMessageTypes";
import { ALERT, BOARD, CONNECTED } from "../constants/StateKeys";

const initialState = {
  [BOARD]: Array.from({ length: 19 }, () =>
    Array.from({ length: 19 }, () => ["", false, false, ""])
  ),
  [CONNECTED]: false,
};

export default function board(state = initialState, action) {
  switch (action.type) {
    case PLACE_STONE:
      // TODO: This is just a POC stub for board clicking. Flesh out later
      return {
        ...state,
        [BOARD]: Array.from(state.board.entries(), ([i, row]) =>
          Array.from(row.entries(), ([j, point]) =>
            i === action.payload.i && j === action.payload.j
              ? Array.from(point.entries(), ([k, attr]) =>
                  k === 0 ? action.payload.turn : attr
                )
              : point
          )
        ),
      };
    case CLEAR_ALERT:
      return {
        ...state,
        [ALERT]: "",
      };
    case WS_MESSAGE:
      const msg = action.payload.message;
      console.log(`got message of type ${msg.message_type}`);
      const data = msg.data;
      // check the type and process accordingly
      switch (msg.message_type) {
        case NEW_GAME_RESPONSE:
        case JOIN_GAME_RESPONSE:
          return {
            ...state,
            // we want to be careful to preserve state on failure in case we are
            // already in a game
            [KEYS]: data[SUCCESS] ? data[KEYS] : state[KEYS],
            [YOUR_COLOR]: data[SUCCESS] ? data[YOUR_COLOR] : state[YOUR_COLOR],
            [ALERT]: data[EXPLANATION],
          };
        case GAME_ACTION_RESPONSE:
          // there's no reason to alert the player after a successful game
          // action, only on failure
          if (!data[SUCCESS]) {
            return {
              ...state,
              [ALERT]: data[EXPLANATION],
            };
          }
          return state;
        case GAME_STATUS:
          return {
            ...state,
            ...data,
          };
        default:
          return state;
      }
    case WS_OPEN:
      // Check if we have a game open and rejoin if necessary
      console.log("websocket open");
      return {
        ...state,
        [CONNECTED]: true,
      };
    case WS_CLOSED:
      // TODO: Pop up an alert saying we're disconnected
      // Also, we might actually want WEBSOCKET_BROKEN, since we will never
      // manually close the connection, but it might drop and need to be
      // reconnected
      console.log("websocket closed");
      return {
        ...state,
        [CONNECTED]: false,
      };

    default:
      return state;
  }
}
