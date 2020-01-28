import { domain, IMiddlewareMessage } from "domein";
interface IdentifiedChangeSet extends IMiddlewareMessage<any> {
  _id: string;
  _pushtime: Date;
}

interface IState {
  changes: IdentifiedChangeSet[];
  selected?: IdentifiedChangeSet;
}

function actions() {
  return {
    deselect,
    empty,
    remove,
    pop,
    push,
    select
  };
}

function identifychangeset(
  changeset: IMiddlewareMessage<any>
): IdentifiedChangeSet {
  return {
    ...changeset,
    _id: Math.random().toString(36),
    _pushtime: new Date()
  };
}

function initialstate(): IState {
  return {
    changes: [],
    selected: undefined
  };
}

function empty(): IState {
  return initialstate();
}

function deselect(state: IState): IState {
  return {
    ...state,
    selected: undefined
  };
}

function remove(state: IState, action: IdentifiedChangeSet): IState {
  const changes = state.changes.slice();
  const index = changes.findIndex(change => action === change);
  const isselected = state.selected === action;

  if (index >= 0) {
    changes.splice(index, 1);
  }

  return {
    ...state,
    changes,
    selected: isselected ? changes[0] : state.selected
  };
}

function push(state: IState, change: IMiddlewareMessage<any>): IState {
  const changeset = identifychangeset(change);

  return {
    ...state,
    changes: [changeset, ...state.changes],
    selected: state.changes.length === 0 ? changeset : state.selected
  };
}

function pop(state: IState): IState {
  const changes = state.changes.slice();
  changes.pop();

  return {
    ...state,
    changes
  };
}

function select(state: IState, selected: IdentifiedChangeSet): IState {
  return {
    ...state,
    selected
  };
}

export default domain(initialstate, actions);
