export default () => {};
const statusFormate = {
  screenConncted: false,
  micConnected: false,
  videoConnected: false,
  micPaused: false,
  videoPaused: false,
  connected: false,
};
const myapi = {
  socket: null,
  id: null,
  remotes: {},
  clients: {},
  setMouse: {},
  status: {},

  stream: null,
  remoteStream: {},
  addRemotes: function (id, peer) {
    this.remotes[id] = peer;
    this.status[id] = statusFormate;
  },
  getRemote: function (id) {
    return this.remotes[id];
  },
  setStream: function (id, stream) {
    this.remoteStream[id] = stream;
  },
  getStream: function (id) {
    return this.remoteStream[id];
  },
  setStatus: function (id, status) {
    this.status[id] = { ...this.status[id], ...status };
  },
  getStatus: function (id) {
    return this.status[id];
  },
};

document.myapi = myapi;

export const KEY_CONFIG = { string: "0123456789", length: 9 };
// export const SOCKET_URL = "https://chitraBackend.gultion.repl.co";
export const SOCKET_URL = "http://127.0.0.1:5000/"
// export const SOCKET_URL = "https://9ca3e553-c458-464d-adf5-8b5b3c4f9a71-00-1t3pn03cqnrav.janeway.replit.dev/";
// export const SOCKET_URL = "https://kind-owl-67.loca.lt/";
// export const SOCKET_URL = "https://miniServer.gultion.repl.co";
// export const
