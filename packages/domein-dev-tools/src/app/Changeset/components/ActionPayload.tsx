import React from "react";
import { FormattedMessage } from "react-intl";
import Typography from "@material-ui/core/Typography";
import { Option } from "tiinvo";
import ReactJson from "react-json-view";
import Alert from "@material-ui/lab/Alert";

export interface IActionPayloadProps {
  payload?: any;
}

function ispayload(arg: any): boolean {
  return Option(arg).isSome();
}

function RenderPayload(props: { payload: any }) {
  const payload = props.payload;

  if (typeof payload === "object") {
    return <ReactJson name={null} src={payload} />;
  }

  return <Typography variant="body2">{payload}</Typography>;
}

export default function ActionPayload(props: IActionPayloadProps) {
  const haspayload = ispayload(props.payload);
  const payload = props.payload;

  return (
    <>
      {haspayload && (
        <>
          <Typography variant="subtitle1">
            <FormattedMessage
              defaultMessage="Payload"
              id="Changeset.components.ActionPayload.withpayload"
              tagName="span"
            />
          </Typography>
          <RenderPayload payload={payload} />
        </>
      )}
      {!haspayload && (
        <Alert severity="info">
          <FormattedMessage
            defaultMessage="This action was triggered without any payload"
            id="Changeset.components.ActionPayload.withoutpayload"
            tagName="span"
          />
        </Alert>
      )}
    </>
  );
}
