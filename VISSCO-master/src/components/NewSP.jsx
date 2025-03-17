import React, { useEffect, useState } from "react";
import { customAlphabet } from "nanoid";
import { KEY_CONFIG } from "../utils/configs";
import { sendRequestJoin, socektInit } from "../utils/initators";
import {
  requestForScreenStream,
  requestForVideoStream,
} from "../utils/streamHandler";
import RemoteList from "./RemoteList";
import "./_One.scss";
import { Input } from "./MiniOne";
import Front from "./Front/Front";

const nanoid = customAlphabet(KEY_CONFIG.string, KEY_CONFIG.length);

export default function NewSP() {
  // Generate ID
  // SaveID at document.id
  // connect to socket
  // register a route of myID
  // request for stream

  // make changes in the Server for the MainTain Map of the ID for the Subscrbing or Making new Port

  const [state, setState] = useState("");

  useEffect(() => {
    const initiator = async () => {
      const id = await new Promise((res, rej) => {
        let id = null;
        let fromL = localStorage.getItem("id");
        if (fromL) {
          id = fromL;
        } else {
          id = nanoid();
          localStorage.setItem("id", id);
        }
        document.myapi.id = id;

        setState(id);
        res(id);
      });
      const socket = await new Promise(socektInit(id));
      // const screenStream = requestForVideoStream();
    };

    initiator();
  }, []);

  return (
    <>
      <div className="NewSp">
        {/* <h1>{state}</h1> */}
        <div className=" flex wrap acenter NewSp_head">
          <Input disabled label={"Me ID : "} defaultValue={state} />
          <Input label={"Remote ID :  "} id={"yourID"} />

          <Input
            value="Connect"
            type="button"
            label={"Click Me to"}
            className="Button"
            onClick={sendRequestJoin}
          />

          {/* </button> */}
        </div>

        <RemoteList />
      </div>
      <Front />
    </>
  );
}
