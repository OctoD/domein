import { domain, IMiddlewareMessage } from "domein";

interface IStateProperty {}

interface IState {
  [domain: string]:
    | IStateProperty
    | IStateProperty[]
    | undefined
    | null
    | string
    | number;
}

function actions() {
  return {
    merge,
    reset: initialstate,
    set
  };
}

function initialstate(): any {
  return {};
}

function merge(state: IState, message: IMiddlewareMessage<IState>): IState {
  return {
    ...state,
    [message.domain]: message.state.next
  };
}

function set(oldstate: IState, newstate: IState): IState {
  return {
    ...oldstate,
    ...newstate
  };
}

export default domain(initialstate, actions);
