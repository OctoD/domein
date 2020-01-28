import { create } from "domein";
import bind from "domein-react";
import changeset from "./changeset";
import domainsdefinition from "./domainsdefinition";
import statetree from "./statetree";
import settings from "./settings";
import logger from "./middleware/logger";

export const state = create(
  {
    changeset,
    domainsdefinition,
    statetree,
    settings
  },
  logger()
);

const { Provider, useActions, useSelector, useState } = bind(state);

export { Provider, useActions, useSelector, useState };
