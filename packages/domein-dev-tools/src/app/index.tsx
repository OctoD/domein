import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Provider } from "@state";
import React from "react";
import { IntlProvider } from "react-intl";
import theme from "../theme";
import UI from "./UI";
import ErrorBoundary from "./ErrorBoundary";

const languages: any = {
  en: require("../translations/locales/en.json"),
  it: require("../translations/locales/it.json")
};

const currentlocale =
  chrome.i18n.getUILanguage() || document.querySelector("html")!.lang;

export default function App() {
  return (
    <ErrorBoundary>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <IntlProvider
          defaultLocale="en"
          locale={navigator.language}
          messages={languages[currentlocale]}
        >
          <Provider>
            <UI />
          </Provider>
        </IntlProvider>
      </MuiThemeProvider>
    </ErrorBoundary>
  );
}
