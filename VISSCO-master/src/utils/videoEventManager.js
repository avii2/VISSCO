import store from "../store/store";
import { mapper } from "./allEvents";
import { send } from "./initators";
const { myapi } = document;
const videoEventManager = (id) => {
  // const { myid } = store.getState();
  let myid = myapi.id;
  let vid = document.querySelector(`#screen${id}`);
  let peer = myapi.getRemote(id);
  vid.addEventListener("mousemove", (e) => {
    const { videoWidth, videoHeight } = vid;
    let { top, left, width, height } = vid.getBoundingClientRect();
    const { layerX: x, layerY: y } = e;

    send(id, {
      info: {
        x: Math.round((x * 1920) / width),
        y: Math.round((y * 1080) / height),
      },
      type: "MOUSE",
      data: "MOVE",
    });
  });

  vid.addEventListener("keydown", (e) => {
    e.preventDefault();
    send(id, {
      key: mapper[e.code],
      type: "KEYBOARD",
      data: "DOWN",
    });
  });

  vid.addEventListener("keyup", (e) => {
    e.preventDefault();

    send(id, {
      key: mapper[e.code],
      type: "KEYBOARD",
      data: "UP",
    });
  });

  vid.addEventListener("click", (e) => {
    e.preventDefault();

    send(id, {
      key: "LEFT",
      type: "MOUSE",
      data: "CLICK",
    });
  });

  vid.addEventListener("contextmenu", (e) => {
    e.preventDefault();

    send(id, {
      key: "RIGHT",
      type: "MOUSE",
      data: "CLICK",
    });
  });
};

export default videoEventManager;
