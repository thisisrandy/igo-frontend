import { send } from "@giantmachines/redux-websocket/dist";
import { Paper } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KEY, MESSAGE, TYPE } from "../constants/OutgoingMessageKeys";
import { CHAT_MESSAGE } from "../constants/OutgoingMessageTypes";
import { KEYS, YOUR_COLOR, CHAT_MESSAGES } from "../constants/StateKeys";
import { useStyles } from "../hooks/useStyles";

function ChatCard({ joinedToGame }) {
  const classes = useStyles();
  const {
    [YOUR_COLOR]: yourColor,
    [KEYS]: keys,
    [CHAT_MESSAGES]: chatMessages,
  } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const sendMessageHandler = () => {
    if (joinedToGame && message) {
      dispatch(
        send({
          [TYPE]: CHAT_MESSAGE,
          [KEY]: keys[yourColor],
          [MESSAGE]: message,
        })
      );
      setMessage("");
    }
  };

  return <Paper className={classes.ChatCard}></Paper>;
}

export default ChatCard;
