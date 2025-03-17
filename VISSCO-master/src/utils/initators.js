import { io } from "socket.io-client";
import handShaker from "./handShaker";
import SimplePeer from "simple-peer";
import { SOCKET_URL } from "./configs";

export const socektInit = (id) => (res, rej) => {
  const socket = io(SOCKET_URL);
  document.myapi.socket = socket;
  socket.on("connect", () => {
    socket.on(id, (data) => {
      // console.log(`you`, data);
      handShaker(data);
    });
    socket.emit("makeio", { id });

    res(socket);
  });
};

export const emit = (id, data) => {
  const { id: myid, socket } = document.myapi;
  socket.emit(id, { ...data, from: myid, to: id });
};

export const send = (id, data) => {
  const peer = document.myapi.getRemote(id);
  const { id: myid } = document.myapi;

  peer.send(JSON.stringify({ ...data, from: myid, to: id }));
};

export const sendRequestJoin = () => {
  // grab id
  // subscribe for youID
  // send through soceket

  const { socket, id } = document.myapi;

  const youid = document.getElementById("yourID").value;

  socket.on(youid, (data) => {
    handShaker(data);
  });
  socket.emit(youid, { from: id, type: "REQUEST", to: youid });
};

export const makePeerInstance = ({
  onSignal = () => {},
  onData = () => {},
  onConnect = () => {},
  onStream = () => {},
  id,
  init,
  offer,
}) => {
  const peer = new SimplePeer({
    initiator: init,
    trickle: false,
  });
  // console.log(peer);

  peer.on("connect", () => {
    onConnect(peer);
    peer.on("data", onData);
  });
  peer.on("stream", onStream);
  peer.on("signal", onSignal);

  // peer.addStream(document.myapi.stream.screen);

  if (!init) {
    peer.signal(offer);
  }
  document.myapi.addRemotes(id, peer);
};
