import React from "react";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";

export interface IPaneProps {
  children?: React.ReactNode;
}

const usecss = makeStyles(theme => ({
  root: {
    flexFlow: "column",
    padding: theme.spacing(2)
  }
}));

export default function Pane(props: IPaneProps) {
  const classes = usecss();

  return <Paper className={classes.root}>{props.children}</Paper>;
}
