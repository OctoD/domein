import InfoNotice from "@components/InfoNotice";
import React from "react";
import { FormattedMessage } from "react-intl";

export default function NoActionsRecorded() {
  return (
    <InfoNotice
      title={
        <FormattedMessage
          defaultMessage="No action recorded"
          id="Changeset.components.NoActionsRecorded.title"
        />
      }
      body={
        <FormattedMessage
          defaultMessage="Start interacting with your UI to see if something happen"
          id="Changeset.components.NoActionsRecorded.description"
        />
      }
    />
  );
}
