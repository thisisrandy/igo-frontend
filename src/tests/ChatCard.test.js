import { BLACK, WHITE } from "../constants/Colors";
import { YOUR_COLOR, KEYS, CHAT_MESSAGES } from "../constants/StateKeys";
import createMockStore from "redux-mock-store";
import { TYPE } from "../constants/OutgoingMessageKeys";
import { CHAT_MESSAGE } from "../constants/OutgoingMessageTypes";
import { render, act, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import ChatCard from "../components/ChatCard";
import { ID, COLOR, MESSAGE, TIMESTAMP } from "../constants/ChatMessageKeys";
import userEvent from "@testing-library/user-event";

const keyW = "0123456789";
const keyB = "9876543210";
const state = {
  game: {
    [YOUR_COLOR]: BLACK,
    [KEYS]: { [WHITE]: keyW, [BLACK]: keyB },
    [CHAT_MESSAGES]: [
      {
        [ID]: "1231231231",
        [COLOR]: BLACK,
        [TIMESTAMP]: Date.now() / 1000,
        [MESSAGE]: "cheese for president",
      },
    ],
  },
};

const mockStore = createMockStore([]);

test("dispatches message when send is pressed", () => {
  const store = mockStore(state);
  render(
    <Provider store={store}>
      <ChatCard joinedToGame={true} />
    </Provider>
  );

  const input = screen.getByLabelText(/chat message/i);
  expect(input).toBeInTheDocument();
  userEvent.type(input, "hey hi");
  const sendButton = screen.getByRole("button", { name: /send/i });
  act(() => {
    sendButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(store.getActions().length).toBe(1);
  expect(store.getActions()[0].payload[TYPE]).toBe(CHAT_MESSAGE);
});

test("displays messages", () => {
  render(
    <Provider store={mockStore(state)}>
      <ChatCard joinedToGame={true} />
    </Provider>
  );

  const message = screen.getByText("cheese for president");
  expect(message).toBeInTheDocument();
});

test("send disabled when not joined to game", () => {
  const store = mockStore(state);
  render(
    <Provider store={store}>
      <ChatCard joinedToGame={false} />
    </Provider>
  );

  const input = screen.getByLabelText(/chat message/i);
  expect(input).toBeInTheDocument();
  userEvent.type(input, "hey hi");
  const sendButton = screen.getByRole("button", { name: /send/i });
  act(() => {
    sendButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(store.getActions().length).toBe(0);
});

test("send disabled when message is empty", () => {
  const store = mockStore(state);
  render(
    <Provider store={store}>
      <ChatCard joinedToGame={true} />
    </Provider>
  );

  const sendButton = screen.getByRole("button", { name: /send/i });
  act(() => {
    sendButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(store.getActions().length).toBe(0);
});
