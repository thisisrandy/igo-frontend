import {
  DEFAULT_PREFIX,
  WEBSOCKET_CLOSED,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN,
} from "@giantmachines/redux-websocket";

// TODO: get rid of place stone
export const PLACE_STONE = "PLACE_STONE";

// websocket actions
export const WS_CLOSED = `${DEFAULT_PREFIX}::${WEBSOCKET_CLOSED}`;
export const WS_OPEN = `${DEFAULT_PREFIX}::${WEBSOCKET_OPEN}`;
export const WS_MESSAGE = `${DEFAULT_PREFIX}::${WEBSOCKET_MESSAGE}`;

// internal actions
export const CLEAR_ALERT = "CLEAR_ALERT";
