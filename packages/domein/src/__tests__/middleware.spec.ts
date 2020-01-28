import { domain } from "../domain";
import { Middleware } from "../middleware";
import { create } from "../state";

interface State {
  counter: number;
}

function actions() {
  return {
    increment
  };
}

function initialstate(): State {
  return {
    counter: 0
  };
}

function increment(state: State): State {
  return {
    ...state,
    counter: state.counter + 1
  };
}

function createstate(...middlewares: Middleware[]) {
  const mydomain = domain(initialstate, actions);
  return create({ mydomain }, ...middlewares);
}

describe("middlewares", () => {
  it("they can mutate state", async () => {
    const incrementmiddleware: Middleware<State> = () => {
      return message => increment(message.state.next);
    };

    const state = createstate(incrementmiddleware);

    await state.actions.mydomain.increment();

    expect(state.get().mydomain.counter).toBe(2);
  });

  it("a middleware which returns nothing will not alter state", async () => {
    const state = createstate(() => () => void 0);

    await state.actions.mydomain.increment();

    expect(state.get().mydomain.counter).toBe(1);
  });
});
