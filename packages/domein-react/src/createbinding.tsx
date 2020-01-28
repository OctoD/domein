import { DomainsMap, IState } from "domein";
import createhooks, { IHooks } from "./createhooks";
import createprovider, { IProviderProps } from "./provider";

export interface ICreateBinding<D extends DomainsMap<any>> extends IHooks<D> {
  Provider: React.FC<IProviderProps>;
}

export default function createbinding<D extends DomainsMap<any>>(
  state: IState<D>
): ICreateBinding<D> {
  const Provider = createprovider(state);
  const hooks = createhooks(state);

  return {
    Provider,
    ...hooks
  };
}
