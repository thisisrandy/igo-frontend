const pieces = Array.from({ length: 19 }, () =>
  Array.from({ length: 19 }, () => ".")
);
// TODO: Remove these after play logic is implemented
pieces[5][5] = "w";
pieces[5][6] = "w";
pieces[6][6] = "w";
pieces[6][5] = "b";
pieces[8][10] = "b";
pieces[9][10] = "b";
pieces[9][11] = "b";
pieces[8][11] = "w";
const initialState = {
  pieces: pieces,
};

export default function board(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
