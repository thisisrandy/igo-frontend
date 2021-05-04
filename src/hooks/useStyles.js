import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  (theme) => ({
    App: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    AlertBackdrop: {
      zIndex: theme.zIndex.drawer + 1,
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
    },
    AlertPaper: {
      maxWidth: 600,
      padding: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    AlertText: {
      padding: "16px 24px",
    },
    AlertProgressContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    AlertProgress: {
      marginBottom: 10,
    },
    MessageText: {
      margin: 0,
    },
    MessageButtonContainer: {
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
    },
    StatusControlsContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
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
    Point: {
      height: "100%",
      width: "100%",
      zIndex: 2,
    },
    PointHover: {
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        cursor: "pointer",
      },
    },
    DeadStone: {
      display: "block",
      height: "90%",
      width: "auto",
      overflow: "hidden",
      color: red[400],
      zIndex: 3,
    },
    CountedWhite: {
      backgroundColor: "rgba(255, 255, 255, 0.4)",
    },
    CountedBlack: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    GameControlsContainer: {
      margin: 20,
      padding: 10,
      width: 750,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    Button: {
      margin: "5px 20px",
      minWidth: 110,
    },
    DialogContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    PlayerCardContainer: {
      minWidth: 350,
      margin: 20,
      padding: 10,
      borderWidth: 5,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    PlayerCardSelf: {
      borderColor: theme.palette.primary.main,
    },
    PlayerCardNeutral: {
      borderColor: theme.palette.grey[700],
    },
    PlayerCardOpponentNotConnected: {
      borderColor: red[400],
    },
    PlayerCardSpan: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },
    PlayerCardSubContainer: {
      margin: 10,
      padding: 10,
      display: "flex",
    },
    PlayerCardScoreColumn: {
      padding: 5,
      minWidth: 55,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
    },
    PlayerStoneImage: {
      height: 100,
      width: "auto",
    },
    PlayerCardKeyContainer: {
      margin: "0px 10px 10px",
      padding: 10,
      display: "flex",
      alignItems: "center",
      minHeight: 45,
    },
    ClockContainer: {
      margin: 20,
      padding: "10px 30px",
    },
  }),
  // without this, MUI styles override user-specified styles in some cases.
  // supposedly import order is the real culprit (makeStyles must be called
  // after MUI imports), but changing that didn't make a difference. see
  // https://stackoverflow.com/questions/49180192/how-to-specify-the-order-in-which-the-style-sheets-appear-in-the-document
  { index: 1 }
);

export { useStyles };
