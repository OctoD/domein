import React from "react";

export type SimpleHoc = <T>(
  Component: React.ComponentType<T>
) => React.ComponentType<T>;
