import { PLACE_STONE } from "../constants/ActionTypes";

const initialState = {
  stones: Array.from({ length: 19 }, () =>
    Array.from({ length: 19 }, () => ".")
  ),
};

export default function board(state = initialState, action) {
  switch (action.type) {
    case PLACE_STONE:
      // TODO: This is just a POC stub for board clicking. Flesh out later
      return {
        ...state,
        stones: Array.from(state.stones.entries(), ([i, row]) =>
          Array.from(row.entries(), ([j, point]) =>
            i === action.payload.i && j === action.payload.j
              ? action.payload.turn
              : point
          )
        ),
      };
    default:
      return state;
  }
}
