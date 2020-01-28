import { domain } from "domein";

interface ISetting {
  key: string;
  value: any;
}

interface IState {
  [index: string]: any;
}

function actions() {
  return {
    load,
    actions_max_records
  };
}

function initialstate(): IState {
  return {};
}

function load(state: IState, settings: IState): IState {
  return {
    ...state,
    ...settings
  };
}

function actions_max_records(state: IState, value: number): IState {
  return {
    ...state,
    actions_max_records: value
  };
}

export default domain(initialstate, actions);
