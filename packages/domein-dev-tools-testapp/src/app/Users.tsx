import React from "react";
import { useSelector, useActions } from "@state";
import {
  List,
  ListItem,
  Button,
  ListItemAvatar,
  ListItemText,
  Avatar
} from "@material-ui/core";

export default function Users() {
  const users = useSelector(state => state.users.users);
  const actions = useActions();

  return (
    <>
      {users.length === 0 && (
        <Button onClick={() => actions.users.load()}>Load users list</Button>
      )}
      {users.length > 0 && (
        <Button onClick={() => actions.users.empty()}>Empty users list</Button>
      )}
      <List>
        {users.map((user, index) => (
          <ListItem
            button
            onClick={() => actions.users.select(user)}
            key={index}
          >
            <ListItemAvatar>
              <Avatar src={user.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <span>
                  {user.first_name} {user.last_name}
                </span>
              }
              secondary={user.email}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
