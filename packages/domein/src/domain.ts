import { Mediator, GetSet } from "tiinvo";
import { PrivateActionMap } from "./action";

export type ActionsFn<S, A> = () => PrivateActionMap<A, S>;

export type DomainsMap<D> = { [key in keyof D]: IDomain<any, any> };

export type DomainStateGetter<S> = () => S;

export type InitialStateFn<S> = () => S;

export type Subscriber<S> = (
  subscriberfn: (oldstate: S, newstate: S) => any
) => any;

export interface IDomain<S, A> {
  actions: PrivateActionMap<S, A>;
  get: DomainStateGetter<S>;
  mediator: Mediator;
  setstatechannel: string;
  updatestatechannel: string;
}

export function domain<
  S extends InitialStateFn<any>,
  A extends ActionsFn<any, any>
>(
  initialstate: S,
  actionsmap: A
): IDomain<S extends InitialStateFn<infer U> ? U : never, ReturnType<A>> {
  const actions = actionsmap();
  const state = GetSet(initialstate());
  const mediator = Mediator();
  const setstatechannel = createchannel("setstate");
  const updatestatechannel = createchannel("update");
  const get = state.get;

  mediator.subscribe(setstatechannel, ([newstate]: [S]) => {
    const mergedstate = { ...state.get(), ...newstate };
    state.set(mergedstate);
    mediator.publishAsync(updatestatechannel, mergedstate);
  });

  return {
    actions,
    get,
    mediator,
    setstatechannel,
    updatestatechannel
  };
}

function createchannel(prefix: string): string {
  return (
    prefix +
    Math.random()
      .toString(36)
      .substr(2)
  );
}
