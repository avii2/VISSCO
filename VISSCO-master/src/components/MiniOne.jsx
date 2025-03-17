import React from "react";
import "./_One.scss";

export function Input(p) {
  return (
    <div className="Input">
      <div className="Input_label">{p.label}</div>
      <input className="Input_input" {...p} />
    </div>
  );
}
