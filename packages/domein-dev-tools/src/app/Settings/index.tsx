import React, { FC } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { useSelector, useActions } from "@state";
import { FormattedMessage } from "react-intl";
import SettingsPane from "./components/SettingsPane";

const GridItem: FC = props => (
  <Grid children={props.children} item lg={4} md={6} xs={12} />
);

export default function Settings() {
  const actions = useActions();
  const settings = useSelector(state => state.settings);
  const actionstitle = (
    <FormattedMessage
      defaultMessage="Actions settings"
      id="Settings.actions.title"
    />
  );
  const domainstitle = (
    <FormattedMessage
      defaultMessage="Domains settings"
      id="Settings.domains.title"
    />
  );
  const generictitle = (
    <FormattedMessage
      defaultMessage="Generic settings"
      id="Settings.generic.title"
    />
  );

  return (
    <Grid container>
      <GridItem>
        <SettingsPane title={actionstitle}>
          <TextField
            fullWidth
            onChange={event =>
              actions.settings.actions_max_records(Number(event.target.value))
            }
            type="number"
            value={settings[actions.settings.actions_max_records.name]}
          />
        </SettingsPane>
      </GridItem>
      <GridItem>
        <SettingsPane title={domainstitle}>hello domain</SettingsPane>
      </GridItem>
      <GridItem>
        <SettingsPane title={generictitle}>hello generic</SettingsPane>
      </GridItem>
    </Grid>
  );
}
