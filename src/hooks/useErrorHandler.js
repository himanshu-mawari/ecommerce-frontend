import { getErrorConfig } from "../helpers/errorConfig";

const useErrorHandler = (error, context) => {
  return getErrorConfig(error, context);
};

export default useErrorHandler;