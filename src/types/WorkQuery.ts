import {
  ApiWork,
} from "./DataModel";

export type WorkQuery = {
  identifier: string;
  recordType?: "editions" | "instances";
  showAll?: "true" | "false";
};

export type WorkResult = {
  status?: number;
  timestamp?: string;
  responseType?: string;
  data?: ApiWork;
};
