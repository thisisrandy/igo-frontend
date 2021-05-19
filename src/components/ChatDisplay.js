import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { CHAT_MESSAGES } from "../constants/StateKeys";
import { useStyles } from "../hooks/useStyles";
import { format, isSameDay } from "date-fns";
import { COLOR, ID, MESSAGE, TIMESTAMP } from "../constants/ChatMessageKeys";
import blackAvatar from "../images/black-avatar.png";
import whiteAvatar from "../images/white-avatar.png";
import { BLACK } from "../constants/Colors";
import { capitalizeFirstLetter } from "../utils";
import clsx from "clsx";
import { Typography } from "@material-ui/core";
import { breakLongWords } from "../utils";

// NOTE: we're not dealing with a fixed-width font, so obviously the "correct"
// line width varies depending on the characters involved, but for e.g. a string
// of O's, 26 is a good length. certainly there are some cases where the dashed
// portion will appear next to its suffix, but I don't care enough to find a
// better solution. this fixes horizontal scrolling/avatar squashing, which is
// the main point
const formatMessage = (text) => breakLongWords(text, 26);

function ChatDisplay() {
  const classes = useStyles();
  const { [CHAT_MESSAGES]: chatMessages } = useSelector((state) => state.game);

  return (
    // TODO: a custom scrollbar might be purty
    <ChatScroller className={classes.ChatMessages}>
      {chatMessages &&
        chatMessages.map((message, index) => {
          const previous = chatMessages[index - 1];
          const showDay = shouldShowDay(previous, message);

          return shouldShowAvatar(previous, message) ? (
            <FirstMessageFromUser
              key={message[ID]}
              {...{ message, showDay, classes }}
            />
          ) : (
            <SubsequentMessage key={message[ID]} {...{ message, classes }} />
          );
        })}
    </ChatScroller>
  );
}

function SubsequentMessage({ message, classes }) {
  return (
    <div>
      <div className={clsx(classes.ChatMessage, classes.ChatMessageNoAvatar)}>
        <Typography variant="body2">
          {formatMessage(message[MESSAGE])}
        </Typography>
      </div>
    </div>
  );
}

function FirstMessageFromUser({ message, showDay, classes }) {
  const author = message[COLOR];

  return (
    <div>
      {showDay && (
        <div className={classes.Day}>
          <div className={classes.DayLine} />
          <Typography className={classes.DayText}>
            {format(message[TIMESTAMP] * 1000, "PP")}
          </Typography>
          <div className={classes.DayLine} />
        </div>
      )}
      <div className={clsx(classes.ChatMessage, classes.ChatMessageWithAvatar)}>
        <div
          className={classes.Avatar}
          style={{
            backgroundImage: `url(${
              author === BLACK ? blackAvatar : whiteAvatar
            })`,
          }}
        />
        <div className={classes.Author}>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <Typography className={classes.UserName}>
              {capitalizeFirstLetter(author)}{" "}
            </Typography>
            <Typography className={classes.TimeStamp}>
              {format(message[TIMESTAMP] * 1000, "h:mm a")}
            </Typography>
          </div>
          <Typography variant="body2">
            {formatMessage(message[MESSAGE])}
          </Typography>
        </div>
      </div>
    </div>
  );
}

function shouldShowAvatar(previous, message) {
  // is this the first message of the game?
  if (!previous) return true;

  // is this message written by a different user than the previous one?
  if (previous[COLOR] !== message[COLOR]) return true;

  // has it been longer than five minutes?
  return message[TIMESTAMP] - previous[TIMESTAMP] > 300;
}

function shouldShowDay(previous, message) {
  // is this the first message of the game?
  if (!previous) return true;

  // otherwise only show when the day changes
  return !isSameDay(previous[TIMESTAMP] * 1000, message[TIMESTAMP] * 1000);
}

function ChatScroller(props) {
  // use ref to access the DOM node for the returned div below. we can then
  // check whenever the box is scrolled if it is at the bottom. if so, when the
  // component rerenders, we can auto-scroll to the bottom, and if not, we stay
  // where we are
  const ref = useRef();
  const shouldScrollRef = useRef(true);

  useEffect(() => {
    if (shouldScrollRef.current) {
      const node = ref.current;
      node.scrollTop = node.scrollHeight;
    }
  });

  const handleScroll = () => {
    const node = ref.current;
    const { clientHeight, scrollTop, scrollHeight } = node;
    shouldScrollRef.current = clientHeight + scrollTop === scrollHeight;
  };

  return <div {...props} ref={ref} onScroll={handleScroll} />;
}

export default ChatDisplay;
