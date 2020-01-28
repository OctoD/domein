import InfoNotice from "@components/InfoNotice";
import React from "react";
import { FormattedMessage } from "react-intl";

export default function NoDomainCreated() {
  return (
    <InfoNotice
      title={
        <FormattedMessage
          defaultMessage="No domain detected"
          id="Domainsmap.components.NoDomainCreated.title"
        />
      }
      body={
        <FormattedMessage
          defaultMessage="Add at least one domain to your state and refresh your app"
          id="Domainsmap.components.NoDomainCreated.description"
        />
      }
    />
  );
}
