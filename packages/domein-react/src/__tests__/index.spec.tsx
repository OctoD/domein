import React from "react";
import { create, domain } from "domein";
import createbinding from "../createbinding";
import * as rtl from "@testing-library/react";

const wait = (milliseconds: number = 10) =>
  new Promise(resolve => setTimeout(resolve, milliseconds));

const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

function createstate() {
  interface IState {
    value: number;
  }

  function initial(): IState {
    return {
      value: 10
    };
  }

  function actions() {
    return {
      increment,
      set
    };
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

  const mydomain = domain(initial, actions);

  return create({ mydomain });
}

describe(`create binding`, () => {
  it(`tests basic usage`, async () => {
    const state = createstate();
    const stuff = createbinding(state);
    const { Provider, useActions, useState } = stuff;

    function MyTest() {
      const actions = useActions();
      const state = useState();
      return (
        <div onClick={actions.mydomain.increment}>{state.mydomain.value}</div>
      );
    }

    function MyComponent() {
      return (
        <Provider>
          <MyTest />
        </Provider>
      );
    }

    rtl.render(<MyComponent />);

    expect(rtl.screen.queryByText("10")).not.toBeNull();

    rtl.fireEvent.click(rtl.screen.queryByText("10")!);

    await wait(100);

    expect(rtl.screen.queryByText("10")).toBeNull();
    expect(rtl.screen.queryByText("11")).not.toBeNull();
  });

  it(`tests state selector`, async () => {
    const state = createstate();
    const stuff = createbinding(state);
    const { Provider, useActions, useSelector } = stuff;

    function MyTest() {
      const actions = useActions();
      const { value } = useSelector(state => ({ value: state.mydomain.value }));
      return <div onClick={actions.mydomain.increment}>{value}</div>;
    }

    function MyComponent() {
      return (
        <Provider>
          <MyTest />
        </Provider>
      );
    }

    rtl.render(<MyComponent />);

    expect(rtl.screen.queryByText("10")).not.toBeNull();

    rtl.fireEvent.click(rtl.screen.queryByText("10")!);

    await wait(100);

    expect(rtl.screen.queryByText("10")).toBeNull();
    expect(rtl.screen.queryByText("11")).not.toBeNull();
  });
});
