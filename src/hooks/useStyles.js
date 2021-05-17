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
    TopDrawer: {
      width: "auto",
    },
    TopBarButton: {
      marginRight: theme.spacing(2),
    },
    TopBarTitle: {
      flexGrow: 1,
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
      padding: 10,
      [theme.breakpoints.down(850)]: {
        margin: 10,
        height: "90vw",
        width: "90vw",
      },
      [theme.breakpoints.up(850)]: {
        margin: 20,
        height: 800,
        width: 800,
      },
      display: "grid",
      justifyItems: "center",
      alignItems: "center",
      borderColor: theme.palette.grey[700],
      borderWidth: 3,
    },
    BoardContainerMyTurn: {
      borderColor: theme.palette.primary.main,
    },
    BoardImage: {
      gridColumn: "1 / -1",
      gridRow: "1 / -1",
      display: "block",
      height: "100%",
      width: "auto",
    },
    ImageCell: {
      height: "100%",
      width: "100%",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    StoneImage: {
      position: "absolute",
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
      position: "absolute",
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
      padding: 10,
      [theme.breakpoints.down(850)]: {
        margin: 10,
        width: "84vw",
        flexWrap: "wrap",
      },
      [theme.breakpoints.up(850)]: {
        margin: 20,
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
    FormContainer: {
      display: "flex",
      flexDirection: "column",
    },
    BoardSizeSelectContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    BoardSizeSelect: {
      width: "50%",
    },
    KomiTextContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    KomiTextField: {
      width: "50%",
    },
    CentralContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    CentralSubContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    ChatCard: {
      minWidth: 350,
      minHeight: 350,
      padding: 10,
      [theme.breakpoints.down(850)]: {
        margin: 10,
      },
      [theme.breakpoints.up(850)]: {
        margin: "20px 10px",
      },
    },
    PlayerCardContainer: {
      minWidth: 350,
      [theme.breakpoints.down(850)]: {
        margin: 10,
      },
      [theme.breakpoints.up(850)]: {
        margin: "20px 10px",
      },
      padding: 10,
      borderWidth: 3,
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
      width: "100%",
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
      display: "flex",
      justifyContent: "space-evenly",
      [theme.breakpoints.down(850)]: {
        margin: 10,
        width: "80vw",
        flexWrap: "wrap",
      },
      [theme.breakpoints.up(850)]: {
        margin: 20,
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
