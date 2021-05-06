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
    AlertProgressContainer: {
      display: "flex",
      justifyContent: "center",
      paddingBottom: 6,
    },
    AlertProgress: {
      marginBottom: 10,
    },
    MessageText: {
      margin: 0,
    },
    MessageButtonContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    DialogButtonContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
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
      [theme.breakpoints.down("850")]: {
        height: "90vw",
        width: "90vw",
      },
      [theme.breakpoints.up("850")]: {
        height: 800,
        width: 800,
      },
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
      [theme.breakpoints.down("850")]: {
        width: "84vw",
        flexWrap: "wrap",
      },
      [theme.breakpoints.up("850")]: {
        width: 750,
      },
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    Button: {
      margin: "8px 20px",
      minWidth: 110,
    },
    DialogContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    KomiTextContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    KomiTextField: {
      marginTop: 10,
      width: "50%",
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
    InfoCard: {
      margin: 20,
      display: "flex",
      justifyContent: "space-evenly",
      [theme.breakpoints.down("850")]: {
        width: "80vw",
        flexWrap: "wrap",
      },
    },
    InfoCardChild: {
      margin: 10,
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
