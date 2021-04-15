import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  () => ({
    App: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    StatusControlsContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
    },
    BoardContainer: {
      margin: 20,
      padding: 10,
      height: 800,
      width: 800,
      display: "grid",
      gridTemplateColumns: "0.25fr repeat(19, 1fr) 0.25fr",
      gridTemplateRows: "0.25fr repeat(19, 1fr) 0.25fr",
      justifyItems: "center",
      alignItems: "center",
    },
    BoardImage: {
      gridColumn: "1 / -1",
      gridRow: "1 / -1",
      overflow: "hidden",
      display: "block",
      height: "100%",
      width: "auto",
    },
    StoneImage: {
      display: "block",
      height: "90%",
      width: "auto",
      overflow: "hidden",
      zIndex: 1,
    },
    EmptyPoint: {
      height: "100%",
      width: "100%",
      zIndex: 1,
      // TODO: turn this off when it is not the player's turn
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
      },
    },
    ControlsContainer: {
      margin: 20,
      padding: 10,
    },
    PlayerCardContainer: {
      margin: 20,
      padding: 10,
    },
    ClockContainer: {
      margin: 20,
      padding: 10,
    },
  }),
  // without this, MUI styles override user-specified styles in some cases.
  // supposedly import order is the real culprit (makeStyles must be called
  // after MUI imports), but changing that didn't make a difference. see
  // https://stackoverflow.com/questions/49180192/how-to-specify-the-order-in-which-the-style-sheets-appear-in-the-document
  { index: 1 }
);

export { useStyles };
