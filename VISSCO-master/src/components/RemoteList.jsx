import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import store from "../store/store";
import dataManager from "../utils/dataManger";
import { emit, makePeerInstance } from "../utils/initators";

import "./_One.scss";
export default connect((state) => ({
  remotes: state.remotes,
  NormalSignal: state.signals.normal,
  myid: state.myid,
}))(function RemoteList({ remotes, NormalSignal, myid }) {
  const vidRef = useRef();

  const handleCall = (id) => {
    return () => {
      makePeerInstance({
        id,
        init: true,
        onConnect: (p) => {
          // console.log(p);
          // alert("true");

          store.dispatch({
            type: "CONNECTION",
            data: { id: id, type: "client" },
          });
        },
        onSignal: (signal) => {
          emit(id, {
            type: "REQUEST_SIGNAL",
            offer: signal,
            stage: 0,
            what: signal.type,
          });
        },
        onData: (data) => {
          // console.log("chat", data);

          dataManager(data, myid);
        },
        onStream: (stream) => {
          document.myapi.setStream(id, stream);

          let vid = document.querySelector(`#video${id}`);
          vid.srcObject = new MediaStream([
            stream.getTracks()[1],
            stream.getTracks()[0],
          ]);
        },
      });
      // emit(id, {
      //   type: "REQUEST_SIGNAL",
      // });
    };
  };

  return (
    <div className="RemoteList">
      {Object.keys(remotes)?.map((e) => {
        let { id, connected } = remotes[e];
        return (
          <div className="RemoteList_list" key={e}>
            <span className="RemoteList_list_name">{id}</span>{" "}
            <button
              className="RemoteList_list_button Button"
              onClick={handleCall(e)}
            >
              {!connected ? "Accept" : "Rejected"}
            </button>
          </div>
        );
      })}
      {/* <video className="RemoteList_video" ref={vidRef} autoPlay controls /> */}
    </div>
  );
});
