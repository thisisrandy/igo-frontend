import { TextField, Typography } from "@material-ui/core";
import AutoComplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import React, { useState } from "react";
import { useStyles } from "../hooks/useStyles";
import { useSelector } from "react-redux";
import { PLAYER_KEY_LENGTH } from "../constants/PlayerKeyInfo";
import { JOIN_RESUME_KEY_FIELD } from "../constants/Ids";
import { getDaysSince } from "../utils";

const filter = createFilterOptions();

function JoinResumeInput({
  joinResumeKey,
  setJoinResumeKey,
  canSubmit,
  joinResumeSubmitClick,
}) {
  const classes = useStyles();
  // const {} = useSelector((state) => state.game);

  // TODO: this all belongs in redux state since I also need it, at the very
  // least, in the new game dialog. POC here for now
  const [pastGames, setPastGames] = useState([
    { lastPlayed: 1601468000000, key: "5ea3927278" },
    { lastPlayed: 1609444800000, key: "76ddfc3888" },
    { lastPlayed: 1621468205847, key: "a865c7d0f1" },
    { lastPlayed: 1621468203847, key: "074be6c3a3" },
  ]);

  // FIXME: this doesn't drag with the dialog. the problem is moot when using a
  // mouse, as the input closes when we click away from it, which we of course
  // must in order to drag. however, it seems that it stays open on touch
  // screens, at the very least on iPads, which means that it disconnects from
  // the dialog until it is rerendered. moreover, the cursor no longer drags,
  // either, instead just staying floating on the screen where the textfield
  // used to be. may need to file a bug
  //
  // See https://stackoverflow.com/q/67643960/12162258
  return (
    <AutoComplete
      id={JOIN_RESUME_KEY_FIELD}
      className={classes.JoinResumeInput}
      autoComplete
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      freeSolo
      onKeyPress={(e) => {
        if (e.key === "Enter" && canSubmit) {
          joinResumeSubmitClick();
        }
      }}
      onChange={(_, newValue) => {
        if (typeof newValue === "string") {
          // normal typing (auto-complete ignored)
          setJoinResumeKey(newValue.toLowerCase());
        } else if (newValue && newValue.inputValue) {
          // a new value was typed and then selected from the dropdown menu
          setJoinResumeKey(newValue.inputValue.toLowerCase());
        } else if (newValue != null) {
          // an existing value was selected from the dropdown
          setJoinResumeKey(newValue.key.toLowerCase());
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== "") {
          filtered.push({
            inputValue: params.inputValue,
            key: `${params.inputValue}`,
            lastPlayed: "N/A",
          });
        }

        return filtered;
      }}
      options={pastGames.sort((a, b) =>
        // sort desc
        a.lastPlayed < b.lastPlayed ? 1 : a.lastPlayed > b.lastPlayed ? -1 : 0
      )}
      groupBy={(option) => {
        if (
          typeof option === "string" ||
          typeof option.lastPlayed !== "number"
        ) {
          return "(not yet played)";
        }

        const daysSince = getDaysSince(option.lastPlayed);
        if (daysSince === 0) {
          return "Today";
        } else if (daysSince === 1) {
          return "Yesterday";
        } else if (daysSince <= 7) {
          return "This week";
        } else if (daysSince <= 14) {
          return "Last week";
        } else {
          return "Older";
        }
      }}
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          // value selected with enter directly from the input
          return option;
        }
        if (option.inputValue) {
          // a new value typed and then selected from the dropdown menu
          return option.inputValue;
        }
        // extant option from the menu
        return option.key;
      }}
      renderOption={(option) => {
        const date = new Date(option.lastPlayed);

        return (
          <div className={classes.JoinResumeDropdownItemContainer}>
            <Typography style={{ marginRight: 5 }}>{option.key}</Typography>
            {!isNaN(date) && (
              <Typography variant="caption">{`Last played: ${date.toLocaleString()}`}</Typography>
            )}
          </div>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          autoFocus
          label="Player key"
          inputProps={{
            ...params.inputProps,
            ...{
              maxLength: PLAYER_KEY_LENGTH,
              spellCheck: false,
            },
          }}
        />
      )}
    />
  );
}

export default JoinResumeInput;
