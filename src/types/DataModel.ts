/* eslint-disable camelcase */

import { ApiEdition } from "./EditionQuery";

export type ApiSearchResult = {
  status?: number;
  timestamp?: string;
  responseType?: string;
  data?: {
    totalWorks?: number;
    facets?: { formats: FacetItem[]; languages: FacetItem[] };
    paging?: {
      currentPage: number;
      firstPage: number;
      lastPage: number;
      nextPage: number;
      previousPage: number;
      recordsPerPage: number;
    };
    works?: ApiWork[];
  };
};

export type FacetItem = { value?: string; count?: number };

export type Agent = {
  name?: string;
  sort_name?: string;
  viaf?: string;
  lcnaf?: string;
  roles?: string[];
  birth_date_display?: string;
  death_date_display?: string;
};

//This Instance is from the instances of the Edition endpoint
export type Instance = {
  authors?: Agent[];
  contributors?: Agent[];
  dates?: Date[];
  extent?: string;
  identifiers?: Identifier[];
  instance_id?: number;
  items?: ApiItem[];
  languages?: Language[];
  publication_place?: string;
  publishers?: Agent[];
  summary?: string;
  table_of_contents?: string;
  title?: string;
};

export type Cover = {
  url: string;
  media_type: string;
  flags: { temporary: boolean };
};

export type Rights = {
  source?: string;
  license?: string;
  rightsStatement?: string;
};

export type ApiItem = {
  content_type?: string;
  contributors?: Agent[];
  drm?: string;
  item_id?: string;
  links?: ItemLink[];
  location?: string;
  modified?: string;
  measurements?: string;
  rights?: Rights[];
  source?: string;
};

export type EditionCardItem = {
  readOnlineLink: ItemLink;
  downloadLink: ItemLink;
  rights: Rights;
};

export type ItemLink = {
  link_id: number;
  mediaType: string;
  url: string;
};

export type Language = {
  language?: string;
  iso_2?: string;
  iso_3?: string;
};

export type Identifier = {
  authority?: string;
  identifier?: string;
};
export type Date = {
  date: string;
  type: string;
};

export type WorkEdition = {
  date_modified?: string;
  date_created?: string;
  edition_id?: number;
  publication_place?: string;
  publication_date?: string;
  edition?: string;
  edition_statement?: string;
  languages?: Language[];
  links?: ItemLink[];
  volume?: string;
  table_of_contents?: string;
  extent?: string;
  summary?: string;
  work_id?: number;
  agents?: Agent[];
  publishers?: Agent[];
  items?: ApiItem[];
  work_uuid?: string;
};

export type Subject = {
  heading?: string;
  authority?: string;
  controlNo?: string;
};

export type Measurement = {
  quantity?: string;
  value?: number;
  weight?: number;
  taken_at?: string;
};

export type Author = {
  lcnaf?: string;
  name?: string;
  primary?: string;
  viaf?: string;
};

export type ApiWork = {
  alt_titles?: string[];
  authors?: Author[];
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
