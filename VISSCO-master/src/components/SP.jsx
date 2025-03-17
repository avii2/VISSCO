import React, { useEffect, useState, useRef } from "react";
import SimplePeer from "simple-peer";
import Socket from "./Socket";
import { customAlphabet } from "nanoid";
import RemoteList from "./RemoteList";
import store from "../store/store";
import handShaker from "../utils/handShaker";
import signalManager from "../utils/signalManager";
const nanoid = customAlphabet("abcdef", 4);
import "regenerator-runtime/runtime";
import dataManager from "../utils/dataManger";
import videoEventManager from "../utils/videoEventManager";

export default function SP() {
  const [offer, setOffer] = useState({ offer: null, answer: null });
  const [id] = useState(nanoid());
  const [_id, set_id] = useState(null);
  const [havePeer, setPeer] = useState(false);
  const [init] = useState(window.location.hash !== "#1");

  useEffect(() => {
    store.dispatch({ type: "ADD_ID", data: { id: id } });

    var p = new SimplePeer({
      initiator: init,
      trickle: false,
    });

    document.p = p;
    setPeer(true);
    // console.log(p);
    // window.p = p;
    p.on("signal", (data) => {
      // console.log("SIGNAL", JSON.stringify(data));

      signalManager(data);
    });

    p.on("connect", () => {
      // console.log("CONNECT");
      // store.dispatch({type:"EDIT_PEER", data:{id:}})
      const { myid } = store.getState();

      p.on("data", (data) => {
        // console.log("data: " + JSON.stringify(data));
        dataManager(data, myid);
      });

      // p.send("whatever" + Math.random());
    });

    p.on("stream", function (remoteStream) {
      vidRef.current.srcObject = remoteStream;
      // console.log("stream");
      videoEventManager(vidRef.current, _id);
    });
  }, []);
  const vidRef = useRef();
  useEffect(() => {
    // vidRef.current.
    videoEventManager(vidRef.current, _id);
  }, [vidRef]);

  const handleCall = (id) => {
    // document.remotes[id].send("hi");
    return async () => {
      let stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      document.p.addStream(stream);
    };
  };

  const handleConnectSocekt = (e) => {
    e.target.style.display = "none";
    let cuId = init ? id : _id;

    document.socket.on(cuId, (data) => {
      // console.log(cuId, data);

      handShaker(id, data, cuId);
    });
    document.socket.emit("makeio", { id: cuId });
    document.socket.emit(cuId, { from: id, type: "REQUEST", to: cuId });
  };

  return (
    <div className="SP">
      <h1>Peer</h1>
      {init && <button onClick={handleConnectSocekt}>Connect</button>}
      {init && <button onClick={handleCall()}>Permission Stream</button>}
      {init && <input value={id} />}
      {init && <RemoteList />}
      {havePeer && <Socket id={id} />}

      <hr />
      <h1>Client</h1>
      {<input value={_id} onChange={(e) => set_id(e.target.value)} />}
      {<button onClick={handleConnectSocekt}>Connect</button>}
      {
        <button
          onClick={() => {
            window.location.hash = "#1";
            window.location.reload();
          }}
        >
          Init
        </button>
      }

      {/* <button onClick={}>MakeCall</button> */}

      <video
        // style={{ display: init ? "none" : "block" }}
        className="RemoteList_video"
        ref={vidRef}
        autoPlay
        controls
      />
    </div>
  );
}
