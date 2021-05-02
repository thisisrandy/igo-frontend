import {
  CLEAR_MESSAGE,
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
import { MESSAGE, BOARD, CONNECTED } from "../constants/StateKeys";

const initialState = {
  [BOARD]: Array.from({ length: 19 }, () =>
    Array.from({ length: 19 }, () => ["", false, false, ""])
  ),
  [CONNECTED]: false,
};

export default function board(state = initialState, action) {
  switch (action.type) {
    case CLEAR_MESSAGE:
      return {
        ...state,
        [MESSAGE]: "",
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
            [MESSAGE]: data[EXPLANATION],
          };
        case GAME_ACTION_RESPONSE:
          // there's no reason to alert the player after a successful game
          // action, only on failure
          if (!data[SUCCESS]) {
            return {
              ...state,
              [MESSAGE]: data[EXPLANATION],
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
