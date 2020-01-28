import {
  Action,
  ActionMap,
  createPublicAction,
  PrivateAction,
  PrivateActionMap
} from "./action";
import { DomainsMap, IDomain } from "./domain";
import { MiddlewaresQueue, MiddlewaresFnQueue, install } from "./middleware";

export type ExtractedActions<M extends DomainsMap<any>> = {
  [keym in keyof M]: M[keym] extends IDomain<any, infer A>
    ? A extends PrivateActionMap<any, any>
      ? {
          [keya in keyof A]: A[keya] extends PrivateAction<any, infer P>
            ? Action<P>
            : undefined;
        }
      : undefined
    : undefined;
};

export type ExtractedState<M extends DomainsMap<any>> = {
  [key in keyof M]: M[key] extends IDomain<infer S, any> ? S : undefined;
};

export type StateGetter<S> = () => S;

export type StateSubscriber<S> = (
  fn: (message: IStateSubscriptionMessage<S>) => any
) => void;

export interface IStateSubscriptionMessage<S> {
  domain: string;
  state: S;
}

export interface IState<D extends DomainsMap<any>> {
  actions: ExtractedActions<D>;
  get: StateGetter<ExtractedState<D>>;
  subscribe: StateSubscriber<ExtractedState<D>>;
}

export function create<D extends DomainsMap<any>>(
  domainsmap: D,
  ...middlewares: MiddlewaresQueue
): IState<D> {
  const middlewarefns = install(domainsmap, middlewares);
  const actions = extractActions(domainsmap, middlewarefns);
  const get = createGetState(domainsmap);
  const subscribe = createSubscriber(domainsmap, get);

  return {
    actions,
    get,
    subscribe
  };
}

function createSubscriber<D extends DomainsMap<any>>(
  domainsmap: D,
  stateGetter: StateGetter<ExtractedState<D>>
): StateSubscriber<ExtractedState<D>> {
  return fn => {
    const keys = Object.keys(domainsmap);

    while (keys.length > 0) {
      const key = keys.pop()! as keyof D;
      const domain = domainsmap[key];

      domain.mediator.subscribe(domain.updatestatechannel, () =>
        fn(createSubscriptionMessage(key, stateGetter()))
      );
    }
  };
}

function createSubscriptionMessage(
  domain: any,
  state: any
): IStateSubscriptionMessage<any> {
  return {
    domain,
    state
  };
}

function convertActions<S, A>(
  domain: IDomain<S, A>,
  domainname: string,
  middlewares: MiddlewaresFnQueue
): ActionMap<A> {
  const { actions, get, mediator, setstatechannel } = domain;
  const keys = Object.keys(actions);
  const newactionmap = {} as ActionMap<A>;

  while (keys.length > 0) {
    const key = keys.pop()! as keyof A;

    newactionmap[key] = createPublicAction({
      actionname: key as any,
      domainname,
      privateaction: actions[key] as any,
      getstate: get,
      mediator,
      channel: setstatechannel,
      middlewares
    });
  }

  return newactionmap;
}

function createGetState<D extends DomainsMap<any>>(
  domainsmap: D
): StateGetter<ExtractedState<D>> {
  return () => {
    const keys = Object.keys(domainsmap);
    const state = {} as any;

    while (keys.length > 0) {
      const key = keys.pop()! as any;
      state[key] = domainsmap[key].get();
    }

    return state;
  };
}

function extractActions<D extends DomainsMap<any>>(
  domainsmap: D,
  middlewares: MiddlewaresFnQueue
): ExtractedActions<D> {
  const actions = {} as ExtractedActions<D>;
  const keys = Object.keys(domainsmap);

  while (keys.length > 0) {
    const domainkey = keys.pop()! as keyof ExtractedActions<D>;
    const domain = domainsmap[domainkey] as IDomain<any, any>;
    const actionsmap = convertActions(domain, domainkey as string, middlewares);

    actions[domainkey] = actionsmap as any;
  }

  return actions;
}
