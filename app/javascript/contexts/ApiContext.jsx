/**
 * Wraps api so that errors and loading states are handled
 * transparently.
 *
 * Example usage:
 *
 * const Component = (props) => {
 *   const { getBooks, loading } = useApi("getBooks");
 *
 *   useEffect(() => {
 *     (async () => {
 *       await getBooks();
 *     })();
 *   });
 *
 *   return <div>Loading: {loading}</div>
 * }
 */

import React, { useContext, useState } from "react";
import { useSignalError } from "./ErrorHandling";
import * as api from "../api";

function wrapApi(method, setLoading, signalError) {

  return (async (...args) => {
      setLoading(true);
      try {
        return await api[method](...args);
      } catch (e) {
        if (e.name == "ApiError") {
          signalError(e);
        } else {
          throw e;
        }
      } finally {
        setLoading(false);
      }
    }
  );
}

const InternalApiContext = React.createContext();

export const useApi = (method) => {
  const [loading, setLoading] = useState(false);
  const signalError = useSignalError();


  return {[method]: wrapApi(method, setLoading, signalError), loading};
};
