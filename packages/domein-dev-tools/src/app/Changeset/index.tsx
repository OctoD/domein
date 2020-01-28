import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import DeleteIcon from "@material-ui/icons/Delete";
import { useActions, useSelector } from "@state";
import React, { useState } from "react";
import { FormattedDate, FormattedMessage } from "react-intl";
import ActionCard from "./components/ActionCard";
import ActionPayload from "./components/ActionPayload";
import ActionTitle from "./components/ActionTitle";
import NoActionsRecorded from "./components/NoActionsRecorded";
import StateDiff from "./components/StateDiff";
import ActionAvatar from "./components/ActionAvatar";

enum ActionsTab {
  detail,
  diff
}

export default function Changeset() {
  const actions = useActions();
  const state = useSelector(state => state.changeset);
  const [currenttab, setCurrenttab] = useState(ActionsTab.detail);
  const istab = (tab: ActionsTab) => currenttab === tab && !!state.selected;

  if (state.changes.length === 0) {
    return <NoActionsRecorded />;
  }

  return (
    <Grid container>
      <Grid item xs={4} lg={3}>
        <Toolbar>
          <Button
            startIcon={<DeleteIcon />}
            onClick={() => actions.changeset.empty()}
          >
            <FormattedMessage
              defaultMessage="Remove actions"
              id="Changeset.actions.remove"
            />
          </Button>
        </Toolbar>

        <List dense>
          {state.changes.map((changeset, key) => (
            <ListItem
              button
              onClick={() => actions.changeset.select(changeset)}
              key={key}
            >
              <ListItemAvatar>
                <ActionAvatar
                  action={changeset.action}
                  domain={changeset.domain}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <FormattedMessage
                    defaultMessage="Domain: {domain}"
                    id="Changeset.domain.name"
                    values={{
                      domain: changeset.domain
                    }}
                  />
                }
                secondary={
                  <FormattedMessage
                    defaultMessage="Action: {action}"
                    id="Changeset.action.name"
                    values={{
                      action: changeset.action
                    }}
                  />
                }
              />
            </ListItem>
          ))}
        </List>
      </Grid>

      <Grid item xs={8} lg={9}>
        <Tabs onChange={(_, tab) => setCurrenttab(tab)} value={currenttab}>
          <Tab
            label={
              <FormattedMessage
                defaultMessage="Action's details"
                id="Changeset.tabs.action.details.title"
              />
            }
            value={ActionsTab.detail}
          />
          <Tab
            label={
              <FormattedMessage
                defaultMessage="Changeset diff"
                id="Changeset.tabs.action.diff.title"
              />
            }
            value={ActionsTab.diff}
          />
        </Tabs>
        <ActionCard
          action={state.selected?.action}
          date={state.selected?._pushtime}
          domain={state.selected?.domain}
        >
          {istab(ActionsTab.detail) && (
            <ActionPayload payload={state.selected?.payload} />
          )}
          {istab(ActionsTab.diff) && (
            <StateDiff
              previousstate={state.selected?.state.prev}
              nextstate={state.selected?.state.next}
            />
          )}
        </ActionCard>
      </Grid>
    </Grid>
  );
}
