import React, { FC } from "react";
import { Typography } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

export interface IActionStateTitleProps {
  type?: "previous" | "next";
}

const Previous: FC = () => (
  <FormattedMessage
    defaultMessage="Previous state"
    id="Changeset.components.ActionStateTitle.previous"
  />
);
const Next: FC = () => (
  <FormattedMessage
    defaultMessage="Next state"
    id="Changeset.components.ActionStateTitle.next"
  />
);

export default function ActionStateTitle(props: IActionStateTitleProps) {
  return (
    <Typography variant="body1">
      {props.type === "next" && <Next></Next>}
      {props.type === "previous" && <Previous></Previous>}
    </Typography>
  );
}
