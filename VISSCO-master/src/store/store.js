// import main from "./reducers/";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import produce, { current } from "immer";
import initState from "./initState";
// const initState = {
//   ab: [],
// };
const main = produce((state = initState, action) => {
  const { data, type } = action;

  switch (type) {
    case "ADD_PEER":
      state[data.type][data.id] = {
        id: data.id,
        connected: false,
        stream: false,
      };
      break;

    case "ADD_ID":
      state.myid = data.id;
      break;

    case "EDIT_PEER":
      state[data.type][data.id] = { ...state[data.type][data.id], ...data };
      break;

    case "ADD_OFFER":
      state.signals[data.type] = { have: data.have, offer: data.offer };
      break;

    case "CONNECTION":
      state.conn[data.id] = { ...(state.conn[data.id] || {}), ...data };
      state.chat[data.id] = [];
      break;

    case "ADD_CHAT":
      state.chat[data.id].push({ text: data.text, my: data.my });
      break;

    default:
      return state;
      break;
  }
});
const store = createStore(main /* preloadedState, */, composeWithDevTools());
// const Store = store();
export default store;
