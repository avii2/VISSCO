import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import store from "../../store/store";
import { send } from "../../utils/initators";
import sendBtn from "./ico/send.png";
export default function ChatBox({ id }) {
  return (
    <div className="ChatBox">
      <ChatList id={id}></ChatList>
      <Input id={id} />
    </div>
  );
}

const Input = ({ id }) => {
  const [msg, setMsg] = useState("");
  const handleSend = () => {
    // document.myapi.getRemote(id).send({type})
    send(id, { data: msg, type: "TEXT" });

    store.dispatch({
      type: "ADD_CHAT",
      data: { id: id, text: msg, my: true },
    });
    setMsg("");
  };
  const handleChange = (e) => {
    setMsg(e.target.value);
  };

  return (
    <div className="ChatBox_Input">
      <textarea
        value={msg}
        onChange={handleChange}
        className="ChatBox_Input_textarea"
      />
      <button className="ChatBox_Input_button" onClick={handleSend}>
        <img src={sendBtn} />
      </button>
    </div>
  );
};
const ChatList = connect((state) => ({ list: state.chat }))(({ list, id }) => {
  //   const ref = useRef();
  useEffect(() => {
    autoscroll(document.querySelector(`#ChatBox_ChatList${id}`));
  }, [list]);
  return (
    <div id={`ChatBox_ChatList${id}`} className="ChatBox_ChatList">
      {(list[id] || []).map((e, i) => (
        <Chat key={i} {...e} />
      ))}
    </div>
  );
});

const Chat = ({ my, text }) => {
  //   const myref = useRef();
  //   useEffect(() => {
  //     parent.scrollTop(my.current.clientHeight);
  //   }, []);
  return (
    <div
      //   ref={myref}
      className={`ChatBox_ChatList_Chat  ${my ? "MySide" : "OtherSide"}`}
      //   key={i}
    >
      <div className={`ChatBox_ChatList_Chat_Text`}>{text}</div>
    </div>
  );
};

const autoscroll = ($messages) => {
  if ($messages) {
    const $newMessage = $messages.lastElementChild;
    if ($newMessage) {
      const newMessageStyles = getComputedStyle($newMessage);
      const newMessageMargin = parseInt(newMessageStyles.marginBottom);
      const newMessageHeigh = $newMessage.offsetHeight + newMessageMargin;

      const visibleHeight = $messages.offsetHeight;
      const containerHeight = $messages.scrollHeight;

      const scrolloffset = $messages.scrollTop + visibleHeight;
      if (containerHeight - newMessageHeigh <= scrolloffset) {
        $messages.scrollTop = $messages.scrollHeight;
      }
    }
  }
};
