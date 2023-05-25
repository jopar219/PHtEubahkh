/**
 * Exports components that are used to render error messages.
 *
 * Example usage:
 * 
 * const Component = (props) => {
 *   const signalError = useSignalError();
 *
 *   return (
 *     <ErrorHandlerAlert />
 *     <button onClick={() => signalError("Error")}>
 *       Trigger Error
 *     </button>
 *   )
 * }
 * 
 * cont Parent = (props) => {
 *   return (
 *     <ErrorContext>
 *       <Component />
 *     </ErrorContext>
 *   )
 * }
 */

import React, { useState, useContext } from "react";
import styles from "./ErrorHandling.module.css";

const InternalErrorContext = React.createContext();

export const ErrorContext = (props) => {
  const [error, setError] = useState();
  const signalError = setError;

  return (
    <InternalErrorContext.Provider value={{ signalError, error }}>
      {props.children}
    </InternalErrorContext.Provider>
  );
};

export const useSignalError = () => {
  return useContext(InternalErrorContext).signalError;
};

export const ErrorHandlerAlert = () => {
  const error = useContext(InternalErrorContext).error;
  return (
    error && (
      <div className={styles.alert}>
        Oops! An unexpected error occured: "{error.message}"
      </div>
    )
  );
};
