const pieces = Array.from({ length: 19 }, () =>
  Array.from({ length: 19 }, () => ".")
);
pieces[5][5] = "w";
pieces[8][10] = "b";
const initialState = {
  pieces: pieces,
};

export default function board(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
