import React, { ErrorInfo } from "react";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";

export interface IErrorBoundaryState {
  error?: Error;
  errorInfo?: ErrorInfo;
}

function initialstate(): IErrorBoundaryState {
  return {};
}

export default class ErrorBoundary extends React.Component<
  any,
  IErrorBoundaryState
> {
  public state = initialstate();

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.error) {
      return (
        <Alert severity="error">
          <Typography>{this.state.error.name}</Typography>
          <Typography>{this.state.error.message}</Typography>
          <pre>{this.state.error.stack}</pre>
          <pre>{this.state.errorInfo!.componentStack}</pre>
        </Alert>
      );
    }

    return this.props.children;
  }
}
