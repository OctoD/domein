import { domain } from "domein";

interface State {
  value: number;
}

function actions() {
  return {
    decrement,
    increment,
    reset: initialstate,
    set
  };
}

function initialstate(): State {
  return {
    value: 0
  };
}

function decrement(state: State): State {
  return {
    ...state,
    value: state.value - 1
  };
}

function increment(state: State): State {
  return {
    ...state,
    value: state.value + 1
  };
}

function set(state: State, value: number): State {
  return {
    ...state,
    value
  };
}

export default domain(initialstate, actions);
