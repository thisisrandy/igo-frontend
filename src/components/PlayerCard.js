import { Paper } from "@material-ui/core";
import React from "react";
import { useStyles } from "../hooks/useStyles";

function PlayerCard() {
  const classes = useStyles();
  return <Paper className={classes.PlayerCardContainer}></Paper>;
}

export default PlayerCard;
