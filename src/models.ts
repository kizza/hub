export enum TimeframeOption {
  Last24Hours = "Last 24 hours",
  Last7Days = "Last 7 days",
  All = "All"
}

export type MoistureLevel = {
  objectId: string;
  createdAt: string;
  Sensor: string;
  Value: number;
};
