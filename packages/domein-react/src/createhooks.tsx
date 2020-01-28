import { DomainsMap, ExtractedActions, ExtractedState, IState } from "domein";
import { useContext, useState, useEffect } from "react";
import context from "./context";

export interface IHooks<D extends DomainsMap<any>> {
  useActions(): ExtractedActions<D>;
  useState(): ExtractedState<D>;
  useSelector<Fn extends (state: ExtractedState<D>) => any>(
    selectorfn: Fn
  ): ReturnType<Fn>;
}

export default function createhooks<D extends DomainsMap<any>>(
  state: IState<D>
): IHooks<D> {
  const hooks = {} as IHooks<D>;

  const useUpdated = () => {
    const [_, setupdated] = useState();

    useEffect(() => {
      state.subscribe(setupdated);
    }, []);
  };

  hooks.useActions = () => {
    useUpdated();
    return useContext(context).actions;
  };

  hooks.useState = () => {
    useUpdated();
    return useContext(context).get();
  };

  hooks.useSelector = selector => {
    useUpdated();
    const newstate = hooks.useState();
    const selectedstate = selector(newstate);
    return selectedstate;
  };

  return hooks;
}
