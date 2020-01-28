import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import React from "react";

export interface IInfoNoticeProps {
  title?: React.ReactNode;
  body?: React.ReactNode;
}

export default function InfoNotice(props: IInfoNoticeProps) {
  return (
    <Alert severity="info">
      <Typography gutterBottom variant="body1">
        {props.title}
      </Typography>
      <Typography variant="body2">{props.body}</Typography>
    </Alert>
  );
}
