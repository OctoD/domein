import { domain } from "domein";

interface IState {
  message: string;
}

function actions() {
  return {
    helloworld
  };
}

function initialstate(): IState {
  return {
    message: ""
  };
}

function helloworld(state: IState): IState {
  return {
    ...state,
    message: "hello world"
  };
}

export default domain(initialstate, actions);
