import React from "react";
import Pane from "@components/Pane";
import SettingsSectionTitle from "./SettingsSectionTitle";

export interface ISettingsPaneProps {
  children?: React.ReactNode;
  title?: React.ReactNode;
}

export default function SettingsPane(props: ISettingsPaneProps) {
  return (
    <Pane>
      <SettingsSectionTitle>{props.title}</SettingsSectionTitle>
      {props.children}
    </Pane>
  );
}
