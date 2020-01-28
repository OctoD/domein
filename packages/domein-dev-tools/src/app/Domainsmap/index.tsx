import Pane from "@components/Pane";
import { Button, TextField } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import { useActions, useSelector } from "@state";
import React from "react";
import { FormattedMessage } from "react-intl";
import { TryCatch } from "tiinvo";
import NoActionsSelected from "./components/NoActionsSelected";
import NoActionsSubscribed from "./components/NoActionsSubscribed";
import NoDomainCreated from "./components/NoDomainCreated";

function tryparse(payload: string): any {
  return TryCatch(JSON.parse, payload).mapOrElse(
    () => payload,
    ok => ok
  );
}

export default function Domainsmap() {
  const actions = useActions();
  const {
    currentaction,
    currentactionpayload,
    currentdomain,
    currentdomainname,
    domains
  } = useSelector(state => state.domainsdefinition);

  if (domains.length === 0) {
    return <NoDomainCreated />;
  }

  return (
    <Grid container>
      <Grid item xs={4} md={3} lg={2}>
        <Tabs
          onChange={(_, newtab) =>
            actions.domainsdefinition.setCurrentDomainName(newtab as any)
          }
          orientation="vertical"
          value={currentdomainname}
        >
          {domains.map((domain, key) => (
            <Tab fullWidth label={domain.name} key={key} value={domain.name} />
          ))}
        </Tabs>
      </Grid>
      <Grid item xs={4}>
        {currentdomain && (
          <Pane>
            <Typography variant="h6">
              <FormattedMessage
                defaultMessage="Actions in {name}"
                id="Domainsmap.currentdomain.title"
                values={{
                  name: currentdomain.name
                }}
              />
            </Typography>
            {currentdomain.actions.length === 0 && <NoActionsSubscribed />}
            {currentdomain.actions.length > 0 && (
              <List>
                {currentdomain.actions.map((action, key) => (
                  <ListItem
                    button
                    key={key}
                    onClick={() =>
                      actions.domainsdefinition.setCurrentAction(action)
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>{action.name.substr(0, 2)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={action.name}
                      secondary={action.path}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Pane>
        )}
      </Grid>
      <Grid item xs={4} md={5} lg={6}>
        <Pane>
          {!currentaction && <NoActionsSelected />}
          {currentaction && (
            <Typography variant="h6">{currentaction.path}</Typography>
          )}
          {currentaction && currentaction.haspayload && (
            <>
              <TextField
                onChange={event =>
                  actions.domainsdefinition.setCurrentActionPayload(
                    event.target.value as any
                  )
                }
                label={
                  <FormattedMessage
                    defaultMessage="Action payload"
                    id="Domainsmap.currentaction.payload"
                  />
                }
                value={currentactionpayload}
              />
            </>
          )}
          {currentaction && (
            <Button
              color="primary"
              onClick={() =>
                actions.domainsdefinition.dispatchAction({
                  ...currentaction,
                  payload: tryparse(currentactionpayload)
                })
              }
              variant="contained"
            >
              <FormattedMessage
                defaultMessage="Dispatch action"
                id="Domainsmap.currentaction.dispatch"
              />
            </Button>
          )}
        </Pane>
      </Grid>
    </Grid>
  );
}
