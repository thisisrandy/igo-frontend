import { send } from "@giantmachines/redux-websocket/dist";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  OutlinedInput,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KEY, MESSAGE, TYPE } from "../constants/OutgoingMessageKeys";
import { CHAT_MESSAGE } from "../constants/OutgoingMessageTypes";
import { KEYS, YOUR_COLOR } from "../constants/StateKeys";
import { useStyles } from "../hooks/useStyles";
import ChatDisplay from "./ChatDisplay";

function ChatCard({ joinedToGame }) {
  const classes = useStyles();
  const { [YOUR_COLOR]: yourColor, [KEYS]: keys } = useSelector(
    (state) => state.game
  );
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const sendMessageHandler = () => {
    dispatch(
      send({
        [TYPE]: CHAT_MESSAGE,
        [KEY]: keys[yourColor],
        [MESSAGE]: message,
      })
    );
    setMessage("");
  };

  const [canSend, setCanSend] = useState(false);
  useEffect(() => {
    setCanSend(joinedToGame && !!message);
  }, [joinedToGame, message]);

  return (
    <Card className={classes.ChatCard}>
      <CardHeader title="Chat" titleTypographyProps={{ variant: "h5" }} />
      <CardContent className={classes.ChatDisplayContainer}>
        <ChatDisplay />
      </CardContent>
      <CardActions disableSpacing={true} style={{ padding: 16 }}>
        <OutlinedInput
          variant="outlined"
          multiline
          rows={3}
          className={classes.ChatInput}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!joinedToGame}
          onKeyPress={(e) => {
            if (e.key === "Enter" && canSend) {
              e.preventDefault();
              sendMessageHandler();
            }
          }}
        ></OutlinedInput>
        <Button
          variant="contained"
          className={classes.ChatButton}
          disabled={!canSend}
          onClick={sendMessageHandler}
        >
          Send
        </Button>
      </CardActions>
    </Card>
  );
}

export default ChatCard;
