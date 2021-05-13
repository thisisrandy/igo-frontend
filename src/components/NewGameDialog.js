import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Zoom,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Tooltip,
  Input,
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
import { VS, COLOR, SIZE, KOMI } from "../constants/OutgoingMessageKeys";
import { BLACK, WHITE } from "../constants/Colors";
import { capitalizeFirstLetter } from "../utils";
import { DEFAULT_BOARD_SIZE, DEFAULT_KOMI } from "../constants/Defaults";
import {
  KOMI_SELECT,
  VS_SELECT,
  COLOR_SELECT,
  BOARD_SIZE_SELECT,
} from "../constants/Ids";

function NewGameDialog({ newGameDialogOpen, setNewGameDialogOpen }) {
  const classes = useStyles();
  const { [CONNECTED]: connected } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const [vs, setVs] = useState(HUMAN);
  const handleVsChange = (e) => {
    setVs(e.target.value);
  };

  const [color, setColor] = useState(BLACK);
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const [size, setSize] = useState(DEFAULT_BOARD_SIZE);
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const [komi, setKomi] = useState(DEFAULT_KOMI);
  const [komiValid, setKomiValid] = useState(true);
  const handleKomiChange = (e) => {
    const val = e.target.value;
    const asNum = Number(val);
    const fractional = asNum % 1;
    if (
      val.length &&
      !Number.isNaN(asNum) &&
      asNum >= 0 &&
      asNum < 101 &&
      (fractional === 0 || fractional === 0.5)
    ) {
      setKomiValid(true);
      setKomi(asNum);
    } else {
      setKomiValid(false);
    }
  };

  const dialogClose = () => {
    setNewGameDialogOpen(false);
    if (!komiValid) {
      setKomi(DEFAULT_KOMI);
      setKomiValid(true);
    }
  };

  const submit = (e) => {
    setNewGameDialogOpen(false);
    dispatch(
      send({
        [TYPE]: NEW_GAME,
        [VS]: vs,
        [COLOR]: color,
        [SIZE]: size,
        [KOMI]: komi,
      })
    );
  };

  const getRadio = () => <Radio color="primary" />;

  return (
    <Dialog
      open={newGameDialogOpen}
      onClose={dialogClose}
      PaperComponent={DraggablePaper}
      TransitionComponent={Zoom}
    >
      <DraggableDialogTitle>New Game</DraggableDialogTitle>
      <DialogContent className={classes.DialogContent}>
        <FormControl component="fieldset">
          <FormLabel component="legend" htmlFor={VS_SELECT}>
            VS.
          </FormLabel>
          <RadioGroup id={VS_SELECT} row onChange={handleVsChange} value={vs}>
            <FormControlLabel
              value={HUMAN}
              control={getRadio()}
              label={HUMAN}
            />
            <Tooltip title="Not yet supported. Please check back later">
              <FormControlLabel
                value={COMPUTER}
                control={getRadio()}
                label={COMPUTER}
                disabled
              />
            </Tooltip>
          </RadioGroup>
          <FormLabel component="legend" htmlFor={COLOR_SELECT}>
            Your Color
          </FormLabel>
          <RadioGroup
            id={COLOR_SELECT}
            row
            onChange={handleColorChange}
            value={color}
          >
            <FormControlLabel
              value={BLACK}
              control={getRadio()}
              label={BLACK}
            />
            <FormControlLabel
              value={WHITE}
              control={getRadio()}
              label={WHITE}
            />
          </RadioGroup>
          <FormLabel component="legend" htmlFor={BOARD_SIZE_SELECT}>
            Board Size
          </FormLabel>
          <div className={classes.BoardSizeSelectContainer}>
            <Select
              id={BOARD_SIZE_SELECT}
              className={classes.BoardSizeSelect}
              value={size}
              onChange={handleSizeChange}
            >
              <MenuItem value={9}>9x9</MenuItem>
              <MenuItem value={13}>13x13</MenuItem>
              <MenuItem value={19}>19x19</MenuItem>
            </Select>
          </div>
          <FormLabel component="legend" htmlFor={KOMI_SELECT}>
            {capitalizeFirstLetter(KOMI)}
          </FormLabel>
          <div className={classes.KomiTextContainer}>
            <Input
              id={KOMI_SELECT}
              name={KOMI}
              className={classes.KomiTextField}
              type="number"
              inputProps={{
                min: 0,
                max: 100.5,
                step: 0.5,
              }}
              defaultValue={komi}
              error={!komiValid}
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
          disabled={!connected || !komiValid}
        >
          Submit
        </Button>
        <Button
          className={classes.Button}
          variant="contained"
          onClick={dialogClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewGameDialog;
