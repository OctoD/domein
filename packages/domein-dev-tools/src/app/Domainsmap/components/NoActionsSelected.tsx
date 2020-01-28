import InfoNotice from "@components/InfoNotice";
import React from "react";
import { FormattedMessage } from "react-intl";

export default function NoActionsSelected() {
  return (
    <InfoNotice
      title={
        <FormattedMessage
          defaultMessage="No action selected"
          id="Domainsmap.components.NoActionsSelected.title"
        />
      }
      body={
        <FormattedMessage
          defaultMessage="Select an action to dispatch"
          id="Domainsmap.components.NoActionsSelected.description"
        />
      }
    />
  );
}
