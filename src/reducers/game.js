import {
  CLEAR_MESSAGE,
  CLEAR_REJOIN_NEEDED,
  WS_CLOSED,
  WS_MESSAGE,
  WS_OPEN,
} from "../constants/ActionTypes";
import {
  EXPLANATION,
  KEYS as KEYS_MSG,
  SUCCESS,
  YOUR_COLOR as YOUR_COLOR_MSG,
} from "../constants/IncomingMessageKeys";
import {
  GAME_ACTION_RESPONSE,
  GAME_STATUS,
  JOIN_GAME_RESPONSE,
  NEW_GAME_RESPONSE,
} from "../constants/IncomingMessageTypes";
import {
  MESSAGE,
  BOARD,
  CONNECTED,
  REJOIN_NEEDED,
  KEYS as KEYS_STATE,
  YOUR_COLOR as YOUR_COLOR_STATE,
} from "../constants/StateKeys";

const initialState = {
  [BOARD]: Array.from({ length: 19 }, () =>
    Array.from({ length: 19 }, () => ["", false, false, ""])
  ),
  [CONNECTED]: false,
};

export default function game(state = initialState, action) {
  switch (action.type) {
    case CLEAR_MESSAGE:
      return {
        ...state,
        [MESSAGE]: "",
      };
    case CLEAR_REJOIN_NEEDED:
      return {
        ...state,
        [REJOIN_NEEDED]: false,
      };
    case WS_MESSAGE:
      const msg = action.payload.message;
      const data = msg.data;
      // check the type and process accordingly
      switch (msg.message_type) {
        case NEW_GAME_RESPONSE:
        case JOIN_GAME_RESPONSE:
          return {
            ...state,
            // we want to be careful to preserve state on failure in case we are
            // already in a game
            [KEYS_STATE]: data[SUCCESS] ? data[KEYS_MSG] : state[KEYS_STATE],
            [YOUR_COLOR_STATE]: data[SUCCESS]
              ? data[YOUR_COLOR_MSG]
              : state[YOUR_COLOR_STATE],
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
      return {
        ...state,
        [CONNECTED]: true,
        [REJOIN_NEEDED]: KEYS_STATE in state,
      };
    case WS_CLOSED:
      return {
        ...state,
        [CONNECTED]: false,
      };

    default:
      return state;
  }
}
