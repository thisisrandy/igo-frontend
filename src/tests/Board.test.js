import Board from "../components/Board";
import { POINTS, SIZE } from "../constants/BoardKeys";
import { BLACK, WHITE } from "../constants/Colors";
import { BOARD, YOUR_COLOR, KEYS, CONNECTED } from "../constants/StateKeys";
import { act, render, screen } from "../utils/test-utils";
import createMockStore from "redux-mock-store";
import {
  ACTION_TYPE,
  COORDS,
  KEY,
  TYPE,
} from "../constants/OutgoingMessageKeys";
import { GAME_ACTION } from "../constants/OutgoingMessageTypes";
import { MARK_DEAD, PLACE_STONE } from "../constants/GameActionTypes";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { WS_SEND } from "../constants/ActionTypes";

const keyW = "0123456789";
const keyB = "9876543210";
const emptyBoard = {
  game: {
    [BOARD]: {
      [SIZE]: 19,
      [POINTS]: Array.from({ length: 19 }, () =>
        Array.from({ length: 19 }, () => ["", false, false, ""])
      ),
    },
    [YOUR_COLOR]: BLACK,
    [KEYS]: { [WHITE]: keyW, [BLACK]: keyB },
    [CONNECTED]: true,
  },
};

test("renders empty Board", () => {
  render(<Board myTurn={true} playing={true} endGame={false} />, {
    initialState: emptyBoard,
  });
  const board = screen.getByAltText("go board");
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
  const white = screen.getByAltText("white stone");
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
  const black = screen.getByAltText("black stone");
  expect(black).toBeInTheDocument();
});

test("renders Board with several stones", () => {
  const board = JSON.parse(JSON.stringify(emptyBoard));
  board.game[BOARD][POINTS][0][0][0] = "b";
  board.game[BOARD][POINTS][0][1][0] = "b";
  board.game[BOARD][POINTS][1][0][0] = "b";
  board.game[BOARD][POINTS][0][10][0] = "w";
  board.game[BOARD][POINTS][0][11][0] = "w";
  render(<Board myTurn={true} playing={true} endGame={false} />, {
    initialState: board,
  });
  const white = screen.getAllByAltText("white stone");
  expect(white.length).toBe(2);
  const black = screen.getAllByAltText("black stone");
  expect(black.length).toBe(3);
});

test("board size is correct", () => {
  render(<Board myTurn={true} playing={true} endGame={false} />, {
    initialState: emptyBoard,
  });
  const bottomRight = screen.getByRole("button", { name: /\(18, 18\)/ });
  expect(bottomRight).toBeInTheDocument();
  const tooFarDown = screen.queryByRole("button", { name: /\(19, 18\)/ });
  expect(tooFarDown).not.toBeInTheDocument();
  const tooFarRight = screen.queryByRole("button", { name: /\(18, 19\)/ });
  expect(tooFarRight).not.toBeInTheDocument();
});

test("board button labels are correct during play on my turn", () => {
  const board = JSON.parse(JSON.stringify(emptyBoard));
  board.game[BOARD][POINTS][0][0][0] = "b";
  board.game[BOARD][POINTS][0][1][0] = "w";
  render(<Board myTurn={true} playing={true} endGame={false} />, {
    initialState: board,
  });

  const blackStone = screen.getByRole("button", {
    name: /unclickable black stone.*\(0, 0\)/,
  });
  expect(blackStone).toBeInTheDocument();
  const whiteStone = screen.getByRole("button", {
    name: /unclickable white stone.*\(0, 1\)/,
  });
  expect(whiteStone).toBeInTheDocument();
  const emptyPoint = screen.getByRole("button", {
    name: /^clickable point.*\(1, 1\)/,
  });
  expect(emptyPoint).toBeInTheDocument();
});

test("board button labels are correct during play on my opponent's turn", () => {
  render(<Board myTurn={false} playing={true} endGame={false} />, {
    initialState: emptyBoard,
  });
  const emptyPoint = screen.getByRole("button", {
    name: /unclickable point.*\(1, 1\)/,
  });
  expect(emptyPoint).toBeInTheDocument();
});

test("board button labels are correct during the endgame", () => {
  const board = JSON.parse(JSON.stringify(emptyBoard));
  board.game[BOARD][POINTS][0][0][0] = "b";
  render(<Board myTurn={false} playing={false} endGame={true} />, {
    initialState: board,
  });
  const blackStone = screen.getByRole("button", {
    name: /^clickable black stone.*\(0, 0\)/,
  });
  expect(blackStone).toBeInTheDocument();
  const emptyPoint = screen.getByRole("button", {
    name: /unclickable point.*\(1, 1\)/,
  });
  expect(emptyPoint).toBeInTheDocument();
});

const mockStore = createMockStore([]);

test("clicks dispatch correct actions during play", () => {
  const store = mockStore(emptyBoard);
  rtlRender(
    <Provider store={store}>
      <Board myTurn={true} playing={true} endGame={false} />
    </Provider>
  );
  const emptyPoint = screen.getByRole("button", { name: /\(0, 0\)/ });
  act(() => {
    emptyPoint.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(store.getActions().length).toBe(1);
  const action = store.getActions().pop();
  expect(action.type).toBe(WS_SEND);
  expect(action.payload).toEqual({
    [TYPE]: GAME_ACTION,
    [KEY]: keyB,
    [ACTION_TYPE]: PLACE_STONE,
    [COORDS]: [0, 0],
  });
});

test("clicks dispatch correct actions during endgame", () => {
  const board = JSON.parse(JSON.stringify(emptyBoard));
  board.game[BOARD][POINTS][0][0][0] = "b";
  const store = mockStore(board);
  rtlRender(
    <Provider store={store}>
      <Board myTurn={true} playing={false} endGame={true} />
    </Provider>
  );
  const emptyPoint = screen.getByRole("button", { name: /\(0, 0\)/ });
  act(() => {
    emptyPoint.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(store.getActions().length).toBe(1);
  const action = store.getActions().pop();
  expect(action.type).toBe(WS_SEND);
  expect(action.payload).toEqual({
    [TYPE]: GAME_ACTION,
    [KEY]: keyB,
    [ACTION_TYPE]: MARK_DEAD,
    [COORDS]: [0, 0],
  });
});

// TODO: check marked dead and counted work as expected
// TODO: check hover works as expected
