import { ApiWork } from "./WorkQuery";

export type LinkResult = {
  data: ApiLink;
  responseType: string;
  status: number;
  timestamp: string;
};

export type ApiLink = {
  content?: string;
  flags: {
    catalog: boolean;
    download: boolean;
    reader: boolean;
  };
  link_id: number;
  media_type: string;
  url: string;
  work: ApiWork;
};
