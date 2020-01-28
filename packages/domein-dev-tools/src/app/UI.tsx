import {
  Tabs,
  AppBar,
  Tab,
  Container,
  Grid,
  makeStyles
} from "@material-ui/core";
import React, { useState } from "react";
import Changeset from "./Changeset";
import { FormattedMessage } from "react-intl";
import Domainsmap from "./Domainsmap";
import StateTree from "./StateTree";
import Settings from "./Settings";

enum TabValues {
  actions,
  domains,
  statetree,
  settings
}

const usecss = makeStyles(theme => {
  return {
    Container: {
      height: "100vh",
      overflowX: "hidden",
      width: "100vw"
    }
  };
});

export default function UI() {
  const classes = usecss();
  const [tab, settab] = useState(TabValues.actions);

  return (
    <div className={classes.Container}>
      <Grid container direction="column">
        <Grid item>
          <AppBar position="static">
            <Container>
              <Tabs value={tab} onChange={(_, tab) => settab(tab)}>
                <Tab
                  label={
                    <FormattedMessage
                      defaultMessage="Actions"
                      id="app.UI.tabs.actions"
                    />
                  }
                  value={TabValues.actions}
                />
                <Tab
                  label={
                    <FormattedMessage
                      defaultMessage="Domains"
                      id="app.UI.tabs.domains"
                    />
                  }
                  value={TabValues.domains}
                />
                <Tab
                  label={
                    <FormattedMessage
                      defaultMessage="State"
                      id="app.UI.tabs.state"
                    />
                  }
                  value={TabValues.statetree}
                />
                {/* <Tab
                  label={
                    <FormattedMessage
                      defaultMessage="Settings"
                      id="app.UI.tabs.settings"
                    />
                  }
                  value={TabValues.settings}
                /> */}
              </Tabs>
            </Container>
          </AppBar>
        </Grid>
        <Grid item>
          <Container className={classes.Container}>
            {tab === TabValues.actions && <Changeset />}
            {tab === TabValues.domains && <Domainsmap />}
            {tab === TabValues.statetree && <StateTree />}
            {tab === TabValues.settings && <Settings />}
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}
