import React from "react";
import Routes from "./routes";
import { ErrorContext } from "./contexts/ErrorHandling";

export default (props) => (
  <ErrorContext>
    {Routes}
  </ErrorContext>
);
