const initState = {
  remotes: {},
  conn: {},
  // [id]:{id, type, haveScreenStream, haveVideoStream}
  myid: null,
  signals: {
    normal: {
      have: false,
      offer: {},
    },
  },
  chat: {},
};
export default initState;
