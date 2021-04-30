import {
  DEFAULT_PREFIX,
  WEBSOCKET_CLOSED,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN,
} from "@giantmachines/redux-websocket";

export const PLACE_STONE = "PLACE_STONE";
export const WS_CLOSED = `${DEFAULT_PREFIX}::${WEBSOCKET_CLOSED}`;
export const WS_OPEN = `${DEFAULT_PREFIX}::${WEBSOCKET_OPEN}`;
export const WS_MESSAGE = `${DEFAULT_PREFIX}::${WEBSOCKET_MESSAGE}`;
