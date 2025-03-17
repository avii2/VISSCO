import store from "../store/store";
const signalApi = {
  haveOwnOffer: false,
  haveToAnwser: null, // id
  offerType: "normal",
};
document.signalApi = signalApi;
const signalManager = (signal) => {
  const { signalApi } = document;
  const { myid } = store.getState();
  if (window.location.hash === "#1") {
    if (signalApi.haveToAnwser) {
      document.socket.emit(signalApi.haveToAnwser, {
        type: "ANSWER",
        from: myid,
        to: signalApi.haveToAnwser,
        offerType: signalApi.offerType,
        offer: signal,
      });
      signalApi.haveToAnwser = null;
    } else {
    }
  } else {
    signalApi.haveOwnOffer = true;
    store.dispatch({
      type: "ADD_OFFER",
      data: { type: "normal", have: true, offer: signal },
    });
  }
};

export default signalManager;
