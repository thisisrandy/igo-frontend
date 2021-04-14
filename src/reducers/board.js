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
    default:
      return state;
  }
}
