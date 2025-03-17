import React, { useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
// import { requestForVideoStream } from "../utils/streamHandler";
import I from "../assets/I";
export default function VideoCard({ id }) {
  const ref = useRef();
  useEffect(() => {
    setTimeout(() => {
      ref.current.srcObject = document.myapi.stream;
    }, 2000);
  }, []);

  return (
    <Rnd
      bounds=".VideoGallery"
      lockAspectRatio={true}
      className="VideoCard"
      maxWidth={"600"}
      default={{ width: 300, x: 0, y: 0 }}
      maxHeight={"600"}
      minHeight={100}
      minWidth={100}
    >
      <div className="VideoCard_wrapper">
        {/* <vide ></vide> */}
        <video
          ref={ref}
          autoPlay
          src={null}
          id={`myvideo`}
          className="VideoCard_video"
        ></video>
        <div className="VideoCard_wrapper_control">
          <img src={I.cam}></img>
          <img src={I.mic}></img>
        </div>
      </div>
    </Rnd>
  );
}
