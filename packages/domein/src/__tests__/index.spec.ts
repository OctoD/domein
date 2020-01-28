import { domain, create } from "..";

describe(`readme examples`, () => {
  //#region placeholder
  it(`simple state management`, async () => {
    interface IState {
      any: any;
      date: Date;
      name: string;
      value: number;
    }

    function initialstate(): IState {
      return {
        any: undefined,
        date: new Date(),
        name: "",
        value: 0
      };
    }

    function actions() {
      return {
        decrement,
        foo,
        increment,
        merge,
        set,
        setany,
        setAsync,
        setdate,
        setname
      };
    }

    const mydomain = domain(initialstate, actions);

    function decrement(state: IState) {
      return {
        ...state,
        value: state.value - 1
      };
    }

    function foo(state: IState, value: boolean) {
      return state;
    }

    function increment(state: IState) {
      return {
        ...state,
        value: state.value + 1
      };
    }

    function set(state: IState, value: number) {
      return {
        ...state,
        value
      };
    }

    function merge(state: IState, other: Partial<IState>): IState {
      return { ...state, ...other };
    }

    function setany(state: IState, any: any): IState {
      return { ...state, any };
    }

    function setdate(state: IState, date: Date): IState {
      return { ...state, date };
    }

    function setname(state: IState, name: string): IState {
      return { ...state, name };
    }

    async function setAsync(state: IState, value: number) {
      // becase reasons
      return new Promise(resolve =>
        setTimeout(
          () =>
            resolve({
              ...state,
              value
            }),
          100
        )
      );
    }

    const subscribedfn = jest.fn();
    const example = create({ mydomain });

    example.subscribe(subscribedfn);

    await example.actions.mydomain.set(10);
    await example.actions.mydomain.decrement();
    await example.actions.mydomain.decrement();
    await example.actions.mydomain.increment();

    expect(example.get().mydomain.value).toBe(9);

    await example.actions.mydomain.setAsync(100);

    expect(example.get().mydomain.value).toBe(100);
    expect(subscribedfn).toBeCalledTimes(5);

    example.actions.mydomain.foo(false);
    example.actions.mydomain.merge({ value: 1 });
    example.actions.mydomain.setname("");
    example.actions.mydomain.setdate(new Date());
  });
  //#endregion
});
