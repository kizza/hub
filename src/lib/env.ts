if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

type EnvironmentVariable =
  | "REACT_APP_PERSIST_BASE_URL"
  | "REACT_APP_PERSIST_APP_ID"
  | "REACT_APP_PERSIST_API_KEY"
  | "REACT_APP_PERSIST_USERNAME"
  | "REACT_APP_PERSIST_PASSWORD";

export const env = <T>(key: EnvironmentVariable) => {
  if (process.env[key]) {
    return (process.env[key] as unknown) as T;
  }

  throw Error(`No environment variable found for ${key}`);
};
