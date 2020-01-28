import { domain } from "domein";

const noop = () => ({});

export default domain(noop, noop);
