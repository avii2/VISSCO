import React, { useState } from "react";
import { Rnd } from "react-rnd";
import "./_Controller.scss";
import micoff from "./ico/micoff.png";
import micon from "./ico/micon.png";
import camoff from "./ico/camoff.png";
import camon from "./ico/camon.png";
import screen from "./ico/screen.png";
import chatoff from "./ico/chatoff.png";
import chaton from "./ico/chaton.png";
import { requestForAllStream } from "../../utils/streamHandler";
import ChatBox from "./ChatBox";
export default function Controller({
  bounds = ".Connection",
  haveScreen,
  id,
  addMyVideo = false,
}) {
  const [state, setState] = useState({
    mic: false,
    screen: false,
    video: false,
    chat: false,
  });

  const handleState = (p) => {
    return async () => {
      if (p.type === "screen") {
        if (!document.myapi.stream) {
          document.myapi.remotes[id].addStream(await requestForAllStream());
          const [m, v, s] = document.myapi.stream.getTracks();
          // document.getElementById(`myscreen${id}`).srcObject = new MediaStream(
          //   s]
          // );
          s.enabled = true;
          // document.myapi.stream.getTracks().forEach(e=>e.enabled = !e.enabled)
        } else {
          const [m, v, s] = document.myapi.stream.getTracks();
          s.enabled = !s.enabled;
        }
      } else if (p.type === "video") {
        if (!document.myapi.stream) {
          console.log();
          document.myapi.remotes[id].addStream(await requestForAllStream());
          const [m, v, s] = document.myapi.stream.getTracks();
          v.enabled = true;
        } else {
          const [m, v, s] = document.myapi.stream.getTracks();
          v.enabled = !v.enabled;
        }
      } else if (p.type === "mic") {
        if (!document.myapi.stream) {
          document.myapi.remotes[id].addStream(await requestForAllStream());
          const [m, v, s] = document.myapi.stream.getTracks();
          m.enabled = true;
        } else {
          const [m, v, s] = document.myapi.stream.getTracks();
          m.enabled = !m.enabled;
        }
      } else if (p.type === "chat") {
      }
      setState((k) => ({ ...k, ...p }));
    };
  };
  return (
    <>
      <Rnd
        bounds={bounds}
        className="Controller"
        enableResizing={{}}
        // lockAspectRatio={true}
        // default={{ y: 60 }}
      >
        {addMyVideo && <video className="Controller_video" id="myVideo" />}
        {/* <audio className="" /> */}
        <div className="Controller_bar">
          <img
            className={`Controller_control nodrag Controller_${
              !state.mic ? "active" : ""
            }`}
            src={state.mic ? micon : micoff}
            onClick={handleState({ mic: !state.mic, type: "mic" })}
          ></img>
          <img
            className={`Controller_control nodrag Controller_${
              !state.video ? "active" : ""
            }`}
            src={state.video ? camon : camoff}
            onClick={handleState({ video: !state.video, type: "video" })}
          ></img>
          {haveScreen && (
            <img
              className={`Controller_control nodrag Controller_${
                !state.screen ? "active" : ""
              }`}
              src={state.screen ? screen : screen}
              onClick={handleState({ screen: !state.screen, type: "screen" })}
            ></img>
          )}
          <img
            className={`Controller_control nodrag Controller_${
              !state.chat ? "active" : ""
            }`}
            src={state.chat ? chaton : chatoff}
            onClick={handleState({ chat: !state.chat, type: "chat" })}
          ></img>
        </div>
      </Rnd>
      {state.chat && <ChatBox id={id} />}
    </>
  );
}
