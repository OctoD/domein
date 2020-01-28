domein
======

![Node CI](https://github.com/OctoD/domein/workflows/Node%20CI/badge.svg)

Just another juicy state manager lib for your js apps.

Heavily inspired by redux obviously.

# 🎉 Features

Why domein over redux or mobx or whatever

- Always async, no more thunks or whatever
- Domain based
- Dead simple API
- No more dispatch and other stuff, just plain functions and objects
- Middlewares
- This lib really loves TypeScript
- You can control actions flow using only async/await and Promise.all

# ⚙ Install

```bash
# npm
npm i domein

# yarn
yarn add domein
```

# 🔍 Usage

## Basic state management

```ts
// ./state/index.ts
import { create } from 'domein';
import mydomain from './mydomain';

export const state = create({
  mydomain,
});
```

```ts
// ./state/mydomain/index.ts
import { domain } from 'domein';

interface IState {
  value: number;
}

function initialstate(): IState {
  return {
    value: 0,
  };
}

function actions() {
  return {
    decrement,
    increment,
    set,
    setAsync,
  }
}

function decrement(state: IState) {
  return {
    value: state.value - 1,
  }
}

function increment(state: IState) {
  return {
    value: state.value + 1,
  }
}

function set(state: IState, value: number) {
  return { value };
}

async function setAsync(state: IState, value: number) {
  // becase reasons
  return new Promise(resolve =>
    setTimeout(
      () => resolve({ value }),
      100
    )
  );
}

export default domain(initialstate, actions);;
```

```ts
// ./app.ts
import { state } from './state';

const { get, actions } = state;

await actions.mydomain.set(10)
await actions.mydomain.decrement()
await actions.mydomain.decrement()
await actions.mydomain.increment()
get() // { mydomain: { value: 9 } }
```

## Composing multiple actions

Since an action is a function, you can compose them as you want.

```ts
import { domain } from 'domein';
import * as api from './api';

interface IState {
  content: string;
  title: string;
  wordcount: number;
}

function actions() {
  return {
    load,
    setWordCount,
  }
}

function initialstate() {
  return {
    content: '',
    title: '',
    wordcount: 0,
  };
}

const myblogpost = domain(initialstate, actions);

async function load(state: IState) {
  const newstate = await api.load();
  return setWordCount({... state, ...newstate});
}

function setWordCount(state: IState) {
  return {
    ... state,
    wordcount: state.content.match(/\S+/g),
  }
}
```



## Actions flow

You could sometimes have a particular scenario where you want some actions to be run in parallels or in waterfall.

To control actions flow, you have to simply create a new function which will await single actions

#### very important for parallel actions

Parallel actions could lead to wrong state merging. To prevent this behaviour, you will have to merge domain's state by excluding properties which will be updated in parallel

#### example

```ts
// state/index.ts
import { create, domain } from 'domein';

interface IState {
  userscount: number;
  rolescount: number;
  loading: boolean;
  users: IUser[];
  roles: IRole[];
}

function initialstate(): IState {
  return {
    loading: false,
    roles: [],
    rolescount: 0,
    users: [],
    userscount: 0,
  };
}

function actions() {
  return {
    loadroles,
    loadusers,
    setloading,
  }
}

async function loadusers(state: IState) {
  const users = await api.loadusers();
  const userscount = users.length;
  // done this in order to avoid overriding of roles and rolescount
  const { loading } = state;

  return {
    loading,
    users,
    userscount,
  };
}

async function loadroles(state: IState) {
  const roles = await api.loadroles();
  const rolescount = roles.length;
  // done this in order to avoid overriding of users and userscount
  const { loading } = state;

  return {
    loading,
    roles,
    rolescount,
  };
}

function setloading(state: IState, loading: boolean) {
  return {
    ... state,
    loading,
  };
}

const mydomain = domain(initialstate, actions);

export default create({ mydomain });
```

```ts
// ./otherfile.ts
import state from './state';

export async function loadseries() {
  const { mydomain } = state.actions;
  await mydomain.setloading(true);
  await mydomain.loadusers();
  await mydomain.loadroles();
  await mydomain.setloading(false);
}

export async function loadparallel() {
  const { mydomain } = state.actions;
  await mydomain.setloading(true);
  Promise.all([ mydomain.loadusers(), mydomain.loadroles() ]);
  await mydomain.setloading(false);
}
```

## Creating middlewares

```ts
import { build, MiddlewareFn } from 'domein';
import mydomain from './mydomain';

function logger(): MiddlewareFn {
  return message => {
    const {
      action,
      domain,
      state,
    } = message;
    
    console.log(
      `[${domain}][${action}]`,
      'previous', state.prev,
      'next', state.next,
    );
  
    return nextstate;
  }
}

const state = build({ mydomain }, logger);

state.actions.mydomain.set(10) // logs: [update][mydomain][set] previous { value: 0 } next { value: 10 }

```

# 📖 Docs

## create

The create function simply creates a new state.

It accepts one parameter which is an object of key/value pairs, where keys are domain names and values are [domains](#domain)

A created state, returns an object with one property and two functions:

* actions, which are the subscribed actions, organized by domain
* get, returns current state
* subscribe, subscribes a function to state changes. Every state change will trigger it, telling the subscribed function which domain did update and giving it the new state

```ts
const state = create({ mydomain });

state.subscribe(message => console.log(message.domain, message.state));

state.actions.mydomain.set(10) // logs: 'mydomain', { value: 10 }
```
## domain

To create a [domain](https://en.wikipedia.org/wiki/Domain_(software_engineering)) use it's related function.

This function accepts two functions, the first which returns the initial domain state and the second which returns an object containing actions

```ts
import { domain } from 'domein';

// domain's state interface
interface IDomainState { }

function initialstate(): IDomainState {
  return { }
}

function actions() {
  return { }
}

export default domain(initialstate, actions);
```

# Using domein in React.js

```tsx
// bindings.ts
import state from './state',
import create from 'domein-react';

const { Provider, useActions, useSelector, useState } = bind(state);

export { Provider, useActions, useSelector, useState };
```

```tsx
import React from 'react';
import { useActions, useSelector } from './bindings';

// Counter.tsx
export default function Counter() {
  const actions = useActions();
  const value = useSelector(state => state.counter.value);

  return (
    <div>
      <input
        onChange={event => actions.mydomain.set(Number(event.target.value))}
        type="number"
        value={value}
      />
      <button onClick={() => actions.mydomain.increment()}>
        increment
      </button>
      <button onClick={() => actions.mydomain.increment()}>
        decrement
      </button>
    </div>
  )
}
```

```tsx
// App.tsx
import Counter from './Counter';
import { Provider } from './bindings';

export default function App() {
  return (
    <Provider>
      <Counter />
    </Provider>
  )
}
```

et voilà

# ️❤️ Contributing

Every contribution is really welcome!

If you feel that something can be improved or should be fixed, feel free to open an issue with the feature or the bug found.

If you want to fork and open a pull request (adding features or fixes), feel free to do it. Remember only to use the `master` branch as a base.

If you plan adding a new feature, please prefix the branch with the `feat/branchname`.

If you plan fixing something, please prefix the branch with the `fix/branchname`.

If you plan refactoring something, please prefix the branch with the `refactor/branchname`.

If you adding something which does not involve the runtime behavious, please prefix the branch with the `chore/branchname`.

Read the [contributing guidelines](./CONTRIBUTING.md)

# 📃 Licence

Read the [licence](./LICENCE)
