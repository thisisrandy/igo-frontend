import { PLACE_STONE } from "../constants/ActionTypes";

const initialState = {
  board: Array.from({ length: 19 }, () =>
    Array.from({ length: 19 }, () => ["", false, false, ""])
  ),
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
    default:
      return state;
  }
}
