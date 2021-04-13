import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  () => ({
    App: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    Status: {
      display: "flex",
      flexDirection: "row",
    },
    Board: {
      width: "800px",
      height: "800px",
    },
  }),
  // without this, MUI styles override user-specified styles in some cases.
  // supposedly import order is the real culprit (makeStyles must be called
  // after MUI imports), but changing that didn't make a difference. see
  // https://stackoverflow.com/questions/49180192/how-to-specify-the-order-in-which-the-style-sheets-appear-in-the-document
  { index: 1 }
);

export { useStyles };
