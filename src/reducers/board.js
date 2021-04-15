import { PLACE_STONE } from "../constants/ActionTypes";

const stones = Array.from({ length: 19 }, () =>
  Array.from({ length: 19 }, () => ".")
);
// TODO: Remove these after play logic is implemented
stones[5][5] = "w";
stones[5][6] = "w";
stones[6][6] = "w";
stones[6][5] = "b";
stones[8][10] = "b";
stones[9][10] = "b";
stones[9][11] = "b";
stones[8][11] = "w";
const initialState = {
  stones: stones,
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
