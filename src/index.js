import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { brown } from "@material-ui/core/colors";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import reduxWebsocket from "@giantmachines/redux-websocket";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: brown,
  },
});

const reduxWebsocketMiddleware = reduxWebsocket({
  deserializer: JSON.parse,
});

const store = createStore(
  rootReducer,
  applyMiddleware(reduxWebsocketMiddleware)
);

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
