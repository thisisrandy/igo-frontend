import * as types from "../constants/ActionTypes";

export const placeStone = (i, j, turn) => ({
  type: types.PLACE_STONE,
  payload: { i, j, turn },
});

export const clearAlert = () => ({
  type: types.CLEAR_ALERT,
  payload: {},
});
