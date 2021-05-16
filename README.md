## igo-frontend

<p align="center"><img alt="igo screenshot" src="screenshot.png" /></p>

This is the frontend (user interface) code for a browser-based
[igo](<https://en.wikipedia.org/wiki/Go_(game)>) (囲碁, go) application, which you
can play [here](#). The backend (game server) code is
[here](https://github.com/thisisrandy/igo-backend).

### Installation

Clone the repository and run `yarn install` from the root directory.

### Running locally

Run `yarn start` for the [react](https://reactjs.org/) development server and
`yarn build` for the production server. You will need an instance of the [game
server](https://github.com/thisisrandy/igo-backend) to be running, and
[ServerInfo.js](src/constants/ServerInfo.js) must be pointing to it. If you want
to play with other machines on the local network, change the address in
[ServerInfo.js](src/constants/ServerInfo.js) to your local IP address instead of
`localhost`.
