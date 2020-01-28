import React from "react";
import Typography from "@material-ui/core/Typography";

export interface ISettingsSectionTitleProps {
  children?: React.ReactNode;
}

export default function SettingsSectionTitle(
  props: ISettingsSectionTitleProps
) {
  return <Typography variant="subtitle2">{props.children}</Typography>;
}
