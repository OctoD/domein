import { devtools } from "../devtools";

const devtoolskey = "__domein_DEVTOOLS_EXTENSION__";
const __domein_DEVTOOLS_PUSH_DOMAINSMAP__ =
  "__domein_DEVTOOLS_PUSH_DOMAINSMAP__";

afterAll(() => {
  delete (globalThis as any)[devtoolskey];
  delete (globalThis as any)[__domein_DEVTOOLS_PUSH_DOMAINSMAP__];
});

describe("devtools", () => {
  it("mocks devtools because reasons", () => {
    devtools();
  });

  it("mocks devtools because reasons but with optional stuff in it", () => {
    (globalThis as any)[devtoolskey] = jest.fn();
    (globalThis as any)[__domein_DEVTOOLS_PUSH_DOMAINSMAP__] = jest.fn();
    devtools()({})({
      action: "",
      domain: "",
      payload: "",
      state: {
        next: "",
        prev: ""
      }
    });

    expect((globalThis as any)[devtoolskey]).toHaveBeenCalled();
    expect(
      (globalThis as any)[__domein_DEVTOOLS_PUSH_DOMAINSMAP__]
    ).toHaveBeenCalledWith({
      actions: [],
      domains: [],
      initialstate: {}
    });
    expect(
      (globalThis as any)[__domein_DEVTOOLS_PUSH_DOMAINSMAP__]
    ).toHaveBeenCalled();
  });

  it("mocks devtools and disable them", () => {
    (globalThis as any)[devtoolskey] = jest.fn();
    (globalThis as any)[__domein_DEVTOOLS_PUSH_DOMAINSMAP__] = jest.fn();
    devtools({ disabled: true })({})({
      action: "",
      domain: "",
      payload: "",
      state: {
        next: "",
        prev: ""
      }
    });

    expect((globalThis as any)[devtoolskey]).not.toHaveBeenCalled();
    expect(
      (globalThis as any)[__domein_DEVTOOLS_PUSH_DOMAINSMAP__]
    ).not.toHaveBeenCalled();
  });
});
