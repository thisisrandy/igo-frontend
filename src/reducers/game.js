import {
  PLACE_STONE,
  WS_CLOSED,
  WS_MESSAGE,
  WS_OPEN,
} from "../constants/ActionTypes";
import { GAME_STATUS } from "../constants/IncomingMessageTypes";

const initialState = {
  board: Array.from({ length: 19 }, () =>
    Array.from({ length: 19 }, () => ["", false, false, ""])
  ),
  connected: false,
};

export default function board(state = initialState, action) {
  switch (action.type) {
    case PLACE_STONE:
      // TODO: This is just a POC stub for board clicking. Flesh out later
      return {
        ...state,
        board: Array.from(state.board.entries(), ([i, row]) =>
          Array.from(row.entries(), ([j, point]) =>
            i === action.payload.i && j === action.payload.j
              ? Array.from(point.entries(), ([k, attr]) =>
                  k === 0 ? action.payload.turn : attr
                )
              : point
          )
        ),
      };
    case WS_MESSAGE:
      console.log("got message!");
      const msg = action.payload.message;
      console.log(msg.message_type);
      // check the type and process accordingly
      switch (action.payload.message.message_type) {
        case GAME_STATUS:
          console.log("got game status");
          return {
            ...state,
            ...action.payload.message.data,
          };
        default:
          return state;
      }
    case WS_OPEN:
      // Check if we have a game open and rejoin if necessary
      console.log("websocket open");
      return {
        ...state,
        connected: true,
      };
    case WS_CLOSED:
      // TODO: Pop up an alert saying we're disconnected
      // Also, we might actually want WEBSOCKET_BROKEN, since we will never
      // manually close the connection, but it might drop and need to be
      // reconnected
      console.log("websocket closed");
      return {
        ...state,
        connected: false,
      };

    default:
      return state;
  }
}
