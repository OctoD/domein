import { Middleware } from "domein/dist/middleware";

export default function logger(): Middleware {
  return () => message =>
    console.debug(
      "%c action dispatched ",
      "background-color: black; color: #fefefe;",
      message.domain,
      message.action,
      message.payload,
      message.state
    );
}
