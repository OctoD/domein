import { create, devtools } from "domein";
import bind from "domein-react";
import counter from "./counter";
import emptydomain from "./emptydomain";
import helloworld from "./helloworld";
import users from "./users";

const domains = { counter, emptydomain, helloworld, users };
const state = create(domains, devtools());

const { Provider, useActions, useSelector, useState } = bind(state);

export { Provider, useActions, useSelector, useState };
