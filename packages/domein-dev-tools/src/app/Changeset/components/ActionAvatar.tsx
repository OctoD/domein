import React from "react";
import Avatar from "@material-ui/core/Avatar";

export interface IActionAvatarProps {
  action?: string;
  domain?: string;
}

function getAvatarBackgroundcolor(
  inputString: string,
  saturation: number,
  lightness: number
) {
  let hash = 0;

  for (let i = 0; i < inputString.length; i++) {
    hash = inputString.charCodeAt(i) + ((hash << 5) - hash);
  }

  const h = hash % 360;

  return "hsl(" + h + ", " + saturation + "%, " + lightness + "%)";
}

function initialOf(input?: string): string {
  return input?.charAt(0) ?? "";
}

export default function ActionAvatar(props: IActionAvatarProps) {
  const children = initialOf(props.action).concat(initialOf(props.domain));

  return (
    <Avatar
      style={{
        backgroundColor: getAvatarBackgroundcolor(children, 50, 75)
      }}
    >
      {children}
    </Avatar>
  );
}
