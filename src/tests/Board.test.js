import Board from "../components/Board";
import { POINTS, SIZE } from "../constants/BoardKeys";
import { BLACK } from "../constants/Colors";
import { BOARD, YOUR_COLOR, KEYS, CONNECTED } from "../constants/StateKeys";
import { render, screen } from "../utils/test-utils";

const emptyBoard = {
  game: {
    [BOARD]: {
      [SIZE]: 19,
      [POINTS]: Array.from({ length: 19 }, () =>
        Array.from({ length: 19 }, () => ["", false, false, ""])
      ),
    },
    [YOUR_COLOR]: BLACK,
    [KEYS]: { WHITE: "0123456789", BLACK: "9876543210" },
    [CONNECTED]: true,
  },
};

test("renders empty Board", () => {
  render(<Board myTurn={true} playing={true} endGame={false} />, {
    initialState: emptyBoard,
  });
  const board = screen.queryByAltText("go board");
  expect(board).toBeInTheDocument();
  const stone = screen.queryByAltText(/stone/);
  expect(stone).not.toBeInTheDocument();
});

test("renders Board with white stone", () => {
  const board = JSON.parse(JSON.stringify(emptyBoard));
  board.game[BOARD][POINTS][0][0][0] = "w";
  render(<Board myTurn={true} playing={true} endGame={false} />, {
    initialState: board,
  });
  const white = screen.queryByAltText("white stone");
  expect(white).toBeInTheDocument();
  const black = screen.queryByAltText("black stone");
  expect(black).not.toBeInTheDocument();
});

test("renders Board with black stone", () => {
  const board = JSON.parse(JSON.stringify(emptyBoard));
  board.game[BOARD][POINTS][0][0][0] = "b";
  render(<Board myTurn={true} playing={true} endGame={false} />, {
    initialState: board,
  });
  const white = screen.queryByAltText("white stone");
  expect(white).not.toBeInTheDocument();
  const black = screen.queryByAltText("black stone");
  expect(black).toBeInTheDocument();
});

// TODO: check correct handlers called/dispatches made on clicks
// TODO: check correct board size used
// TODO: check marked dead and counted work as expected
// TODO: check hover works as expected
// TODO: check stones placed in correct spot. this might be difficult to verify
// in a non-artificial way, but at least think it through
