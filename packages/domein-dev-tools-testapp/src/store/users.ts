import { domain } from "domein";

interface IUser {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}

interface IState {
  selected?: IUser;
  users: IUser[];
}

function actions() {
  return {
    empty: initialstate,
    load,
    select
  };
}

function initialstate(): IState {
  return {
    selected: undefined,
    users: []
  };
}

async function load(state: IState): Promise<IState> {
  const response = await fetch("https://reqres.in/api/users").then(r =>
    r.json()
  );

  return {
    ...state,
    users: response.data
  };
}

function select(state: IState, selected: IUser): IState {
  return {
    ...state,
    selected
  };
}

export default domain(initialstate, actions);
