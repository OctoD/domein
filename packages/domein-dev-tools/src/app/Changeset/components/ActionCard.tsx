import React from "react";
import { FormattedDate, FormattedTime, FormattedMessage } from "react-intl";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import ActionTitle from "./ActionTitle";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { useActions, useSelector } from "@state";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ActionAvatar from "./ActionAvatar";
import Divider from "@material-ui/core/Divider";

export interface IActionCardProps {
  action?: string;
  domain?: string;
  date?: Date;
  children?: React.ReactNode;
}

export default function ActionCard(props: IActionCardProps) {
  const actions = useActions();
  const currentselected = useSelector(state => state.changeset.selected);

  return (
    <Card>
      <CardHeader
        avatar={<ActionAvatar action={props.action} domain={props.domain} />}
        subheader={
          <>
            <FormattedMessage
              defaultMessage="Action recorded at: {date} {time}:{seconds} ({milliseconds}ms)"
              id="Changeset.components.ActionCard.recordtime"
              values={{
                date: <FormattedDate value={props.date} />,
                time: <FormattedTime value={props.date} />,
                seconds: props.date?.getSeconds(),
                milliseconds: props.date?.getMilliseconds()
              }}
            />
          </>
        }
        title={<ActionTitle action={props.action} domain={props.domain} />}
      />
      <CardContent>{props.children}</CardContent>
      {currentselected && (
        <>
          <Divider />
          <CardActions>
            <Button
              color="secondary"
              onClick={() => actions.changeset.remove(currentselected)}
              startIcon={<DeleteOutlineIcon />}
            >
              <FormattedMessage
                defaultMessage="Remove this changeset"
                id="Changeset.components.ActionCard.removechangeset"
              />
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
}
