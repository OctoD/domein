import { DomainsMap, IState } from "domein";
import React, { ReactNode } from "react";
import context from "./context";

export interface IProviderProps {
  children: ReactNode;
}

export default function createprovider<D extends DomainsMap<any>>(
  state: IState<D>
) {
  return (props: IProviderProps) => {
    return <context.Provider children={props.children} value={state} />;
  };
}
