import InfoNotice from "@components/InfoNotice";
import React from "react";
import { FormattedMessage } from "react-intl";

export default function NoActionsSubscribed() {
  return (
    <InfoNotice
      title={
        <FormattedMessage
          defaultMessage="No action subscribed on this domain"
          id="Domainsmap.components.NoActionsSubscribed.title"
        />
      }
      body={
        <FormattedMessage
          defaultMessage="Subscribe an action to your domain"
          id="Domainsmap.components.NoActionsSubscribed.description"
        />
      }
    />
  );
}
