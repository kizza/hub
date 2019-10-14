import axios from "axios";
import { env } from "./env";
import { MoistureLevel } from "../models";

const client = axios.create({
  baseURL: env("REACT_APP_PERSIST_BASE_URL"),
  headers: {
    "X-Parse-Application-Id": env("REACT_APP_PERSIST_APP_ID"),
    "X-Parse-Javascript-Key": env("REACT_APP_PERSIST_API_KEY")
  }
});

const mock = true;

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

export const getData = (modelName: string) =>
  mock
    ? mockData()
    : client
        .get(`/classes/${modelName}?limit=10&order=-createdAt`)
        .then(response => response.data.results)
        .catch(e => {
          console.log(`Error querying ${modelName}`, e);
        });
