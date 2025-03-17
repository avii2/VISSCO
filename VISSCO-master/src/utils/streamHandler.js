// import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime";

export default () => {};

export const requestForScreenStream = async () => {
  // let ss = document.myapi.stream.screen;
  // if (ss) {
  //   return ss;
  // } else {
  let stream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: true,
  });
  // document.myapi.stream.screen = stream;

  return stream;
  // return
  // }
};

export const requestForMicStream = async () => {
  // let ss = document.myapi.stream.mic;
  // if (ss) {
  //   return ss;
  // } else {
  let stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });
  // let stream = await navigator.mediaDevices.getUserMedia({
  //   video: true,
  // });
  // document.querySelectorAll(`myscreen${id}`).forEach((e) => {
  //   e.srcObject = stream;
  //   e.play();
  // });
  // document.myapi.stream.mic = stream;

  return stream;
  // return
  // }
};
export const requestForVideoStream = async () => {
  // let ss = document.myapi.stream.video;
  // if (ss) {
  //   return ss;
  // } else {
  let stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });
  document.querySelectorAll("#myVideo").forEach((e) => {
    e.srcObject = stream;
    e.play();
  });
  // document.myapi.stream.video = stream;

  return stream;
  // return
  // }
};

export const requestForAllStream = async () => {
  let screen = await requestForScreenStream();
  let video = await requestForVideoStream();
  let mic = await requestForMicStream();
  let stream = new MediaStream([
    ...mic.getTracks(),
    ...video.getTracks(),

    ...screen.getTracks(),
  ]);
  stream.getTracks().forEach((e) => (e.enabled = false));
  document.myapi.stream = stream;
  return stream;
};
