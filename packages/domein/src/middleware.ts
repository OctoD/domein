import { DomainsMap } from "./domain";

export type MiddlewaresQueue = Middleware[];

export type MiddlewaresFnQueue = MiddlewareFn[];

export type Middleware<S = any> = (
  domainmap: DomainsMap<any>
) => MiddlewareFn<S>;

export type MiddlewareFn<S = any> = (
  message: IMiddlewareMessage<S, any>
) => Promise<S> | S | undefined | null | void;

export type MiddlewareOutput<S> = Promise<IMiddlewareMessage<S, any>>;

export interface IMiddlewareMessage<S, P = undefined> {
  action: string;
  domain: string;
  payload: P;
  state: IMiddlewareMessageState<S>;
}

export interface IMiddlewareMessageState<S> {
  next: S;
  prev: S;
}

export function buildmessage<S, P>(
  action: string,
  domain: string,
  prevstate: S,
  nextstate: S,
  payload: P
): IMiddlewareMessage<S, P> {
  return {
    action,
    domain,
    payload,
    state: {
      prev: prevstate,
      next: nextstate
    }
  };
}

export function install<D>(
  domainsmap: DomainsMap<D>,
  queue: MiddlewaresQueue
): MiddlewaresFnQueue {
  return queue.map(middleware => middleware(domainsmap));
}

export async function run<S>(
  queue: MiddlewaresFnQueue,
  message: IMiddlewareMessage<S, any>
): MiddlewareOutput<S> {
  return queue.length === 0 ? message : reduce(queue, 0, message);
}

async function reduce<S>(
  queue: MiddlewaresFnQueue,
  index: number,
  message: IMiddlewareMessage<S, any>
): MiddlewareOutput<S> {
  if (index >= queue.length) {
    return message;
  }

  const middleware = queue[index];
  const middlewareresult = await middleware(message);
  const newmessage = buildmessage(
    message.action,
    message.domain,
    middlewareresult ? message.state.next : message.state.prev,
    middlewareresult ? middlewareresult : message.state.next,
    message.payload
  );

  return reduce(queue, index + 1, newmessage);
}
