import axios from "axios";
import { env } from "./env";
import { MoistureLevel, TimeframeOption } from "../models";

const client = axios.create({
  baseURL: env("REACT_APP_PERSIST_BASE_URL"),
  headers: {
    "X-Parse-Application-Id": env("REACT_APP_PERSIST_APP_ID"),
    "X-Parse-Javascript-Key": env("REACT_APP_PERSIST_API_KEY")
  }
});

const mock = false;

const mockData = (): Promise<MoistureLevel[]> =>
  new Promise(resolve => {
    setTimeout(
      () =>
        resolve(
          Array(10)
            .fill(0)
            .map((_each: number, index: number) => {
              const createdAt = new Date().setHours(
                new Date().getHours() - index
              );
              return {
                objectId: "Item " + index,
                createdAt: new Date(createdAt).toISOString(),
                Sensor: "Sensor " + index,
                Value: 9 * index + 1
              } as MoistureLevel;
            })
        ),
      1000
    );
  });

const queryTimeframe = (timeframe: TimeframeOption) => {
  const startDate = new Date();

  switch (timeframe) {
    case TimeframeOption.Last24Hours:
      return new Date(startDate.setHours(-24));
    case TimeframeOption.Last7Days:
      return new Date(startDate.setHours(-7 * 24));
    default:
      return undefined;
  }
};

type Query = {
  limit: number;
  order: string;
  where?: string;
};

const compileQuery = (query: Query) =>
  (Object.keys(query) as (keyof Query)[])
    .reduce((acc, key) => acc.concat(`${key}=${query[key]}`), [] as string[])
    .join("&");

const greaterThanOrEqualToDate = (fieldName: string, value: Date) => ({
  [fieldName]: { $gte: { __type: "Date", iso: value.toISOString() } }
});

export const getData = (modelName: string, timeframe: TimeframeOption) => {
  const query: Query = {
    limit: 20,
    order: "-createdAt"
  };

  const timeframeQuery = queryTimeframe(timeframe);
  if (timeframeQuery) {
    query.where = JSON.stringify(
      greaterThanOrEqualToDate("createdAt", timeframeQuery)
    );
  }

  if (timeframe === TimeframeOption.All) {
    query.limit = 100;
  }

  console.log("query is", compileQuery(query));
  return mock
    ? mockData()
    : client
        .get(`/classes/${modelName}?${compileQuery(query)}`)
        .then(response => response.data.results);
};
