import React from "react";
import { FormattedMessage } from "react-intl";

export interface IActionTitleProps {
  action?: string;
  domain?: string;
}

export default function ActionTitle(props: IActionTitleProps) {
  return (
    <FormattedMessage
      defaultMessage="Action {domain}.{action}"
      id="Changeset.components.ActionTitle"
      tagName="span"
      values={{
        action: props.action,
        domain: props.domain
      }}
    />
  );
}
