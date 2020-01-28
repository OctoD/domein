import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

//#endregion

export default createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        textTransform: "capitalize"
      }
    },
    MuiTab: {
      root: {
        textTransform: "capitalize"
      }
    }
  },
  props: {
    MuiButton: {
      size: "small"
    },
    MuiGrid: {
      spacing: 2
    },
    MuiTextField: {
      fullWidth: true,
      margin: "normal"
    }
  },
  palette: {
    background: {
      default: "#ebeff2",
      paper: "#f3f6f9"
    },
    primary: {
      main: "#5e7680"
    },
    secondary: {
      main: "#9fb4bf"
    },
    info: {
      main: "#415a76"
    },
    success: {
      main: "#3a4e47"
    },
    error: {
      main: "#68414e"
    },
    warning: {
      main: "#9e512e"
    },
    common: {
      black: "rgba(0, 0, 0, .92)",
      white: "rgba(255, 255, 255, .91)"
    }
  },
  shape: {
    borderRadius: 8
  },
  typography: {}
});
