import { Agent, Language, Subject } from "./DataModel";
import { ApiEdition } from "./EditionQuery";

export type WorkQuery = {
  identifier: string;
  recordType?: "editions" | "instances";
  showAll?: "true" | "false";
  readerVersion?: "v1" | "v2";
};

export type WorkResult = {
  status?: number;
  timestamp?: string;
  responseType?: string;
  data?: ApiWork;
};

export type ApiWork = {
  alt_titles?: string[];
  authors?: Agent[];
  contributors?: string[];
  dates?: Date[];
  editions?: ApiEdition[];
  edition_count?: number;
  languages?: Language[];
  measurements?: string[];
  medium?: string;
  series?: string;
  series_position?: string;
  sub_title?: string;
  subjects?: Subject[];
  title?: string;
  uuid?: string;
};
