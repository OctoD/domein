/// <reference types="react-scripts" />

declare module "react-intl/locale-data/*" {
  type Lang = Record<string, string>;

  export default Lang;
}
