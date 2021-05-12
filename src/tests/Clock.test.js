import { act, render, screen } from "../utils/test-utils";
import Clock from "../components/Clock";
import { TIME_PLAYED, STATUS } from "../constants/StateKeys";
import { COMPLETE, PLAY } from "../constants/GameStatus";

test("renders Clock", () => {
  render(<Clock />, { initialState: { game: {} } });
  const clock = screen.getByText("Time played: 00:00:00");
  expect(clock).toBeInTheDocument();
});

test("Clock uses server time", () => {
  render(<Clock />, {
    initialState: { game: { [TIME_PLAYED]: 92165, [STATUS]: PLAY } },
  });
  const clock = screen.getByText("Time played: 1d, 01:36:05");
  expect(clock).toBeInTheDocument();
});

test("Clock ticks during play", () => {
  jest.useFakeTimers();
  render(<Clock />, {
    initialState: { game: { [TIME_PLAYED]: 0, [STATUS]: PLAY } },
  });
  act(() => {
    jest.advanceTimersByTime(66000);
  });
  const clock = screen.getByText("Time played: 00:01:06");
  expect(clock).toBeInTheDocument();
});

test("Clock doesn't tick after play complete", () => {
  jest.useFakeTimers();
  render(<Clock />, {
    initialState: { game: { [TIME_PLAYED]: 0, [STATUS]: COMPLETE } },
  });
  act(() => {
    jest.advanceTimersByTime(66000);
  });
  const clock = screen.getByText("Time played: 00:00:00");
  expect(clock).toBeInTheDocument();
});
