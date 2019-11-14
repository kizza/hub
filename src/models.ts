export enum TimeframeOption {
  Last24Hours = "Last 24 hours",
  Last7Days = "Last 7 days",
  All = "All"
}

export enum DataStatus {
  Loading,
  Loaded,
  Errored
}

export type MoistureLevel = {
  objectId: string;
  createdAt: string;
  Sensor: string;
  Value: number;
};
