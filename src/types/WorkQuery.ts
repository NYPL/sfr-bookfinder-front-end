import { Identifier, Instance, Measurement, Subject } from "./DataModel";

export type WorkQuery = {
  identifier: string;
  recordType?: "editions" | "instances";
  showAll?: "true" | "false";
};

export type WorkResult = {
  status?: number;
  timestamp?: string;
  responseType?: string;
  data?: {
    uuid?: string;
    title?: string;
    date_modified?: string;
    subjects?: Subject[];
    identifiers?: Identifier[];
    measurements?: Measurement[];
    instances?: Instance[];
    edition_range?: string;
  };
};
