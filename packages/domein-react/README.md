domein-react
============

domein react bindings

# 🎉 Features

- Easy to install
- Do everything with a Provider and few React hooks

# ⚙ Install

```bash
# npm
npm i domein-react

# yarn
yarn add domein-react
```

# 🔍 Usage

## Creating the bindings

```ts
// ./state-bindings.ts
import createbinding from 'domein-react';
import state from './state';

export default createbinding(state);
```

```tsx
// ./App.tsx
import React from 'react';
import Counter from './components/Counter.tsx';
import { Provider } from './state-bindings';

export default function App() {
  return (
    <Provider>
      <Counter />
    </Provider>
  )
}
```

```tsx
// ./components/Counter.tsx
import React from 'react';
import { useActions, useState } from '../state-bindings';

export default function Counter() {
  const actions = useActions();
  const state = useState();

  return (
    <div>
      Counter's value: {state.counter.value}
      <button onClick={actions.counter.increment}>
        Tap to increment
      </button>
    </div>
  );
}
```

## useActions, useState, useSelector

You can use three hooks when you create React bindings with the `createbinding` function.

#### useActions

This hook returns subscribed actions for each domain. Calling one action will cause your UI to update.

```tsx
import React from 'react';
import { useActions, useState } from '../state-bindings';

export default function Counter() {
  const actions = useActions();
  const state = useState();

  return (
    <div>
      Counter's value: {state.counter.value}
      <button onClick={actions.counter.increment}>
        Tap to increment
      </button>
      <input
        onChange={event => actions.counter.set(Number(event.target.value))}
        type="number"
        value={state.counter.value}
      />
    </div>
  );
}
```

#### useState
 
This hook returns current state. (Give a look to the example above).

#### useSelector

This hook is similar to redux's one.

```tsx
import React from 'react';
import { useActions, useSelector } from '../state-bindings';

export default function Counter() {
  const actions = useActions();
  const value = useSelector(state => state.counter.value);

  return (
    <div>
      Counter's value: {value}
      <button onClick={actions.counter.increment}>
        Tap to increment
      </button>
      <input
        onChange={event => actions.counter.set(Number(event.target.value))}
        type="number"
        value={value}
      />
    </div>
  );
}
```
 
## debugging

To debug states using domein, you will need [this chrome extension](https://github.com/octod/domein-debug-tools) (or firefox extension) and it's own middleware.

If you are using multiple middlewares, ensure you put this extension as the latest.

```bash
npm i domein-debug-middleware
```

```ts
import mydomain from './mydomain';
import domeindebugger from 'domein-debug-middleware';

export default create({ mydomain }, domeindebugger());
```

Predefined scripts:

- changelog: creates a changelog (using standard-changelog)
- docs: creates docs from your jsdocs
- lint: lints your code
- prepublishOnly: builds your sources for deployment (to npm)
- size-limit: checks your bundle size limit
- test: run tests 
- upgrade-interactive: updgrades your dependencies interactively (like with yarn)

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
