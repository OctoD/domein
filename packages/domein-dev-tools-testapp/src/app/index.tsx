import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Provider } from "@state";
import React from "react";
import { IntlProvider } from "react-intl";
import theme from "../theme";
import Counter from "./Counter";
import Users from "./Users";

const languages: any = {
  en: require("../translations/locales/en.json"),
  it: require("../translations/locales/it.json")
};

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <IntlProvider
        defaultLocale="en"
        locale={navigator.language}
        messages={languages[document.querySelector("html")!.lang]}
      >
        <Provider>
          <Counter />
          <Users />
        </Provider>
      </IntlProvider>
    </MuiThemeProvider>
  );
}
