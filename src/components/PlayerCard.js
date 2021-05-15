import { Paper, Typography } from "@material-ui/core";
import clsx from "clsx";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { WHITE } from "../constants/Colors";
import {
  KEYS,
  KOMI,
  PRISONERS,
  TERRITORY,
  YOUR_COLOR,
  OPPONENT_CONNECTED,
  TURN,
} from "../constants/StateKeys";
import { useStyles } from "../hooks/useStyles";
import black from "../images/black.png";
import white from "../images/white.png";
import StarIcon from "@material-ui/icons/Star";

function PlayerCard({ color, joinedToGame, playing }) {
  const classes = useStyles();
  const {
    [YOUR_COLOR]: your_color,
    [PRISONERS]: prisoners,
    [TERRITORY]: territory,
    [KOMI]: komi,
    [KEYS]: keys,
    [OPPONENT_CONNECTED]: opponentConnected,
    [TURN]: turn,
  } = useSelector((state) => state.game);

  const isThisMe = useCallback(() => {
    return color === your_color;
  }, [color, your_color]);

  return (
    <Paper
      className={clsx(
        classes.PlayerCardContainer,
        isThisMe()
          ? classes.PlayerCardSelf
          : joinedToGame && !opponentConnected
          ? classes.PlayerCardOpponentNotConnected
          : classes.PlayerCardNeutral
      )}
      variant="outlined"
      style={{ opacity: joinedToGame ? "100%" : "60%" }}
    >
      <span className={classes.PlayerCardSpan}>
        <Paper className={classes.PlayerCardSubContainer}>
          <img
            src={color === WHITE ? white : black}
            alt="player stone display"
            className={classes.PlayerStoneImage}
          />
        </Paper>
        <Paper className={classes.PlayerCardSubContainer}>
          {/* TODO: this wraps on mobile. Use a table or something to keep the
          rows lined up */}
          <div className={classes.PlayerCardScoreColumn}>
            <Typography>Prisoners:</Typography>
            <Typography>Territory:</Typography>
            <Typography>Total Score:</Typography>
          </div>
          <div className={classes.PlayerCardScoreColumn}>
            <Typography>{joinedToGame ? prisoners[color] : "-"}</Typography>
            <Typography>{joinedToGame ? territory[color] : "-"}</Typography>
            <Typography>
              {joinedToGame
                ? prisoners[color] +
                  territory[color] +
                  (color === WHITE ? komi : 0)
                : "-"}
            </Typography>
          </div>
        </Paper>
      </span>
      <Paper className={classes.PlayerCardKeyContainer}>
        {joinedToGame && playing && turn === color && <StarIcon />}
        <Typography
          variant="caption"
          style={{ marginLeft: joinedToGame ? 5 : 0 }}
        >
          Player Key: {joinedToGame ? keys[color] : "-"}
        </Typography>
        {joinedToGame && (
          <Typography variant="caption" style={{ marginLeft: 5 }}>
            {isThisMe()
              ? "(you)"
              : opponentConnected
              ? "(connected)"
              : "(not connected)"}
          </Typography>
        )}
      </Paper>
    </Paper>
  );
}

export default PlayerCard;
