import React from "react";
import Pane from "@components/Pane";
import { useState } from "@state";
import ReactJson from "react-json-view";

export default function StateTree() {
  const state = useState();

  return (
    <Pane>
      <ReactJson name={null} src={state.statetree} />
    </Pane>
  );
}
