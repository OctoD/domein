import { Paper, Typography, Button, TextField } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { useActions, useSelector } from "@state";
import React from "react";

export default function Counter() {
  const actions = useActions();
  const value = useSelector(state => state.counter.value);
  const style = { padding: 28 };

  return (
    <Container maxWidth="sm">
      <Paper>
        <div style={style}>
          <Typography variant="h5">value is {value}</Typography>
          <Button
            color="primary"
            onClick={event => actions.counter.increment()}
            variant="contained"
          >
            increment
          </Button>
        </div>
        <div style={style}>
          <TextField
            onChange={event => actions.counter.set(Number(event.target.value))}
            type="number"
            value={value}
          />
        </div>
      </Paper>
    </Container>
  );
}
