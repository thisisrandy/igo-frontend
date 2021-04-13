const initialState = {
  pieces: new Array(19).fill(new Array(19).fill(".")),
};

export default function board(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
