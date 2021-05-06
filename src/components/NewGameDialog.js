import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { useStyles } from "../hooks/useStyles";
import { useDispatch, useSelector } from "react-redux";
import { send } from "@giantmachines/redux-websocket";
import { NEW_GAME } from "../constants/OutgoingMessageTypes";
import { TYPE } from "../constants/OutgoingMessageKeys";
import { CONNECTED } from "../constants/StateKeys";
import { DraggableDialogTitle, DraggablePaper } from "./DraggablePaper";
import { COMPUTER, HUMAN } from "../constants/OpponentTypes";
import { VS, COLOR, KOMI } from "../constants/OutgoingMessageKeys";
import { BLACK, WHITE } from "../constants/Colors";
import { capitalizeFirstLetter } from "../utils";

function NewGameDialog({ newGameDialogOpen, setNewGameDialogOpen }) {
  const classes = useStyles();
  const { [CONNECTED]: connected } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const [vs, setVs] = useState(HUMAN);
  const handleVsChange = (e) => {
    setVs(e.target.value);
  };

  const [color, setColor] = useState(WHITE);
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const [komi, setKomi] = useState(6.5);
  const handleKomiChange = (e) => {
    setKomi(Number(e.target.value));
  };

  const cancelClick = () => {
    setNewGameDialogOpen(false);
  };

  const submit = (e) => {
    setNewGameDialogOpen(false);
    dispatch(
      send({ [TYPE]: NEW_GAME, [VS]: vs, [COLOR]: color, [KOMI]: komi })
    );
  };

  return (
    <Dialog
      open={newGameDialogOpen}
      onClose={() => setNewGameDialogOpen(false)}
      PaperComponent={DraggablePaper}
    >
      <DraggableDialogTitle>New Game</DraggableDialogTitle>
      <DialogContent className={classes.DialogContent}>
        <FormControl component="fieldset">
          <FormLabel component="legend">VS.</FormLabel>
          <RadioGroup row onChange={handleVsChange} value={vs}>
            <FormControlLabel value={HUMAN} control={<Radio />} label={HUMAN} />
            <FormControlLabel
              value={COMPUTER}
              control={<Radio />}
              label={COMPUTER}
              disabled
            />
          </RadioGroup>
          <FormLabel component="legend">Your Color</FormLabel>
          <RadioGroup row onChange={handleColorChange} value={color}>
            <FormControlLabel value={WHITE} control={<Radio />} label={WHITE} />
            <FormControlLabel value={BLACK} control={<Radio />} label={BLACK} />
          </RadioGroup>
          <FormLabel component="legend">
            {capitalizeFirstLetter(KOMI)}
          </FormLabel>
          {/* TODO: this doesn't work on touch. Try typing with validation or
          something else */}
          <div className={classes.KomiTextContainer}>
            <TextField
              name={KOMI}
              className={classes.KomiTextField}
              type="number"
              inputProps={{
                min: 0.5,
                max: 100.5,
                step: 1,
                onKeyDown: (e) => {
                  e.preventDefault();
                },
              }}
              defaultValue={komi}
              onChange={handleKomiChange}
            />
          </div>
        </FormControl>
      </DialogContent>
      <DialogActions
        disableSpacing={true}
        className={classes.DialogButtonContainer}
      >
        <Button
          className={classes.Button}
          variant="contained"
          onClick={submit}
          disabled={!connected}
        >
          Submit
        </Button>
        <Button
          className={classes.Button}
          variant="contained"
          onClick={cancelClick}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewGameDialog;
