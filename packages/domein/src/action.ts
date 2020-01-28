import { Mediator, Result } from "tiinvo";
import { run, buildmessage, MiddlewaresFnQueue } from "./middleware";

export type Action<P = any> = P extends undefined
  ? ActionWithoutPayload
  : P extends null
  ? ActionWithPayload<null>
  : P extends number
  ? ActionWithPayload<number>
  : P extends boolean
  ? ActionWithPayload<boolean>
  : P extends string
  ? ActionWithPayload<string>
  : P extends object
  ? ActionWithPayload<P>
  : P extends unknown
  ? ActionWithoutPayload
  : ActionWithPayload<P>;

export type PrivateAction<S, P = undefined> = P extends undefined
  ? PrivateActionWithoutPayload<S>
  : P extends null
  ? PrivateActionWithPayload<S, null>
  : P extends number
  ? PrivateActionWithPayload<S, number>
  : P extends boolean
  ? PrivateActionWithPayload<S, boolean>
  : PrivateActionWithPayload<S, P>;

export type ActionMap<A> = { [key in keyof A]: Action<any> };

export type ActionReturnType = Promise<Result<boolean, Error>>;

export type ActionWithoutPayload = () => ActionReturnType;

export type ActionWithPayload<P> = (payload: P) => ActionReturnType;

export type PrivateActionMap<S, A> = {
  [key in keyof A]: PrivateAction<S, any>;
};

export type PrivateActionReturnValue<S> = Promise<S> | S;

export type PrivateActionWithoutPayload<S> = (
  state: S
) => PrivateActionReturnValue<S>;

export type PrivateActionWithPayload<S, P> = (
  state: S,
  payload: P
) => PrivateActionReturnValue<S>;

export type ActionStateGetter<S> = () => S;

export interface CreatePublicActionArg<S, P> {
  actionname: string;
  channel: string;
  domainname: string;
  getstate: ActionStateGetter<S>;
  mediator: Mediator;
  middlewares: MiddlewaresFnQueue;
  privateaction: PrivateActionWithPayload<S, P>;
}

export function createPublicAction<S, P = undefined>({
  actionname,
  channel,
  domainname,
  getstate,
  mediator,
  middlewares,
  privateaction
}: CreatePublicActionArg<S, P>): Action<P> {
  const action = async (payload: P) => {
    const prevstate = getstate();
    const newstate = await privateaction(prevstate, payload);
    const message = buildmessage(
      actionname,
      domainname,
      prevstate,
      newstate,
      payload
    );
    const processed = await run(middlewares, message);
    return mediator.publishAsync(channel, processed.state.next);
  };

  return action as Action<P>;
}
