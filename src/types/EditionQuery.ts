import {
    Agent,
  Identifier,
  Instance,
  Language,
  Measurement,
  Subject,
} from "./DataModel";

export type EditionQuery = {
  editionIdentifier: string;
  showAll?: "true" | "false";
};

export type EditionResult = {
  status?: number;
  timestamp?: string;
  responseType?: string;
  data?: {
    id?: number;
    publication_place: string;
    publication_date: string;
    edition: string;
    edition_statement: string;
    volume: string;
    table_of_contents: string;
    extent: string;
    summary: string;
    work_id: number;
    languages: Language[];
    agents: Agent[];
    work_uuid: string;
    instances: Instance[];
    title: string;
    sub_title: string;
  };
};
