import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ReactJson from "react-json-view";

export interface IActionStateProps {
  name?: string;
  state?: any;
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => any;
}

const useCSS = makeStyles(theme => ({
  root: {
    overflow: "scroll",
    width: "100%"
  }
}));

export default function ActionState(props: IActionStateProps) {
  const classes = useCSS();
  return (
    <div className={classes.root} onScroll={props.onScroll}>
      <ReactJson name={props.name} src={props.state} />
    </div>
  );
}
