import { OutlinedInput } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { CHAT_MESSAGES } from "../constants/StateKeys";
import { useStyles } from "../hooks/useStyles";

function ChatDisplay() {
  const classes = useStyles();
  const { [CHAT_MESSAGES]: chatMessages } = useSelector((state) => state.game);

  // TODO: do this as a div following the react chat example you have squirreled
  // away

  return (
    <OutlinedInput
      variant="outlined"
      multiline
      className={classes.ChatInput}
      style={{
        width: "100%",
        // this actually goes on input props, and it's unclear if there's a way
        // to use the theme color
        "& .MuiInputBase-root.Mui-disabled": {
          color: "rgba(0, 0, 0, 0.0)",
        },
      }}
      value={
        chatMessages ? chatMessages.map((cm) => cm.message).join("\n") : ""
      }
      inputProps={{
        style: { overflowY: "scroll", color: "currentColor" },
      }}
      disabled={true}
    />
  );
}

export default ChatDisplay;
