import React, { useEffect } from "react";
import { connect } from "react-redux";
import Controller from "../Controller/Controller";
import "./_VideoGallery.scss";

export default connect((state) => ({ remotes: state.conn }))(
  function VideoGallery({ remotes }) {
    return (
      <>
        <div className="VideoGallery">
          {Object.keys(remotes)
            ?.map((e) => remotes[e])
            .map((e, i) => {
              return <VideoView key={i} id={e.id} stream={e.stream} />;
            })}
          {/* <VideoCard /> */}
          <Controller bounds=".VideoGallery" addMyVideo={true} />
        </div>
      </>
    );
  }
);

const VideoView = ({ id }) => {
  // useEffect(() => {
  //   console.log("Render", id);
  //   let video = document.querySelector(`#video${id}`);
  //   if (true) {
  //     if (video) {
  //       console.log("Stream", id);
  //       // video.focus();
  //       video.srcObject = document.myapi.getStream(id);
  //       video.play();
  //     }
  //   }
  // }, []);

  return (
    <div className="VideoView">
      <video
        className="video"
        id={`video${id}`}
        src={null}
        autoPlay
        // muted={true}
      />
    </div>
  );
};
