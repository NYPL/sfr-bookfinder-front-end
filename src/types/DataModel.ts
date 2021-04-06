/* eslint-disable camelcase */

import { ApiEdition } from "./EditionQuery";

export type ApiSearchResult = {
  status?: number;
  timestamp?: string;
  responseType?: string;
  data?: {
    totalWorks?: number;
    facets?: Facet[];
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

export type Facet = {
  formats: FacetItem[];
  languages: FacetItem[];
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
  date_modified?: string;
  date_created?: string;
  id?: number;
  title?: string;
  sort_title?: string;
  sub_title?: string;
  edition?: string;
  edition_statement?: string;
  volume?: string;
  table_of_contents?: string;
  copyright_date?: string;
  extent?: string;
  summary?: string;
  work_id?: number;
  edition_id: number;
  measurements?: Measurement[];
  agents?: Agent[];
  items?: ApiItem[];
  languages?: Language[];
  covers?: Cover[];
  rights?: Rights[];
  identifiers?: Identifier[];
  publication_place?: string;
  pub_date?: string;
  pub_date_display?: string;
};

export type Cover = {
  url: string;
  media_type: string;
  flags: { temporary: boolean };
};

export type Rights = {
  source?: string;
  license?: string;
  rights_statement?: string;
  rights_reason?: string;
  determination_date_display?: string;
  copyright_date?: {
    gte: string;
    lte: string;
  };
  copyright_date_display?: string;
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
  id_type?: string;
  identifier?: string;
};
export type Date = {
  date: string;
  type: string;
};

export type WorkEdition = {
  date_modified?: string;
  date_created?: string;
  edition_id: number;
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
  covers?: Cover[];
  work_uuid?: string;
};

export type Subject = {
  subject?: string;
  authority?: string;
  uri?: string;
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
