export const ETypeVehicle = {
  CAR: "CAR",
  MOTORCYCLE: "MOTORCYCLE",
  TRUCK: "TRUCK",
  BUS: "BUS",
  TRAILER: "TRAILER",
  OTHER: "OTHER",
} as const;

export type ETypeVehicle = (typeof ETypeVehicle)[keyof typeof ETypeVehicle];