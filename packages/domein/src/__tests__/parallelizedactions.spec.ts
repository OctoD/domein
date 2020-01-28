import { create, domain } from "..";
import { MiddlewareFn, MiddlewaresQueue } from "../middleware";

interface IApi {
  loadusers(): Promise<number[]>;
  loadroles(): Promise<number[]>;
}

interface IState {
  loading: boolean;
  roles: any[];
  rolescount: number;
  users: any[];
  userscount: number;
}

function createstate(api: IApi, ...middlewares: MiddlewaresQueue) {
  function initialstate(): IState {
    return {
      loading: false,
      roles: [],
      rolescount: 0,
      users: [],
      userscount: 0
    };
  }

  function actions() {
    return {
      loadusers,
      loadroles,
      setloading
    };
  }

  async function loadusers(state: IState) {
    const users = await api.loadusers();
    const userscount = users.length;
    const { loading } = state;

    return {
      loading,
      users,
      userscount
    };
  }

  async function loadroles(state: IState) {
    const roles = await api.loadroles();
    const rolescount = roles.length;
    const { loading } = state;

    return {
      loading,
      roles,
      rolescount
    };
  }

  function setloading(state: IState, loading: boolean) {
    return {
      ...state,
      loading
    };
  }

  const mydomain = domain(initialstate, actions);

  return create({ mydomain }, ...middlewares);
}

describe("parallelization", () => {
  it("runs serialized actions", async () => {
    const api: IApi = {
      loadroles: async () => [1, 2, 3],
      loadusers: async () => [4, 5, 6]
    };
    const calls: Array<[string, IState]> = [];

    function checkmiddleware(): MiddlewareFn<IState> {
      return message => {
        calls.push([message.action, message.state.next]);
      };
    }

    const state = createstate(api, checkmiddleware);
    const loadseries = async () => {
      const { mydomain } = state.actions;

      await mydomain.setloading(true);
      await mydomain.loadusers();
      await mydomain.loadroles();
      await mydomain.setloading(false);
    };

    await loadseries();

    expect(calls[0][0]).toBe("setloading");
    expect(calls[0][1].loading).toBeTruthy();

    expect(calls[3][1].rolescount).toBe(3);
    expect(calls[3][1].userscount).toBe(3);

    expect(calls[3][0]).toBe("setloading");
    expect(calls[3][1].loading).toBeFalsy();
  });

  it("runs parallelized actions", async () => {
    const api: IApi = {
      loadroles: async () => [1, 2, 3],
      loadusers: async () => [4, 5, 6]
    };
    const calls: Array<[string, IState]> = [];

    function checkmiddleware(): MiddlewareFn<IState> {
      return message => {
        calls.push([message.action, message.state.next]);
      };
    }

    const state = createstate(api, checkmiddleware);
    const loadparallel = async () => {
      const { mydomain } = state.actions;

      await mydomain.setloading(true);
      await Promise.all([mydomain.loadroles(), mydomain.loadusers()]);
      await mydomain.setloading(false);
      await mydomain.setloading(true);
      await Promise.all([mydomain.loadroles(), mydomain.loadusers()]);
    };

    await loadparallel();

    expect(calls[0][0]).toBe("setloading");
    expect(calls[0][1].loading).toBeTruthy();

    expect(calls[3][1].rolescount).toBe(3);
    expect(calls[3][1].userscount).toBe(3);

    expect(calls[3][0]).toBe("setloading");
    expect(calls[3][1].loading).toBeFalsy();

    expect(calls[6][1].loading).toBeTruthy();
    expect(calls[3][1].rolescount).toBe(3);
    expect(calls[3][1].userscount).toBe(3);
  });
});
