import React from "react";
import Grid from "@material-ui/core/Grid";
import ActionStateTitle from "./ActionStateTitle";
import ActionState from "./ActionState";

export interface IStateDiffProps {
  previousstate?: any;
  nextstate?: any;
}

export default function StateDiff(props: IStateDiffProps) {
  return (
    <Grid container>
      <Grid item xs={6}>
        <ActionStateTitle type="previous" />
        <ActionState state={props.previousstate} />
      </Grid>
      <Grid item xs={6}>
        <ActionStateTitle type="next" />
        <ActionState state={props.nextstate} />
      </Grid>
    </Grid>
  );
}
