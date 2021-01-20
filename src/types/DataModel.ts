/* eslint-disable camelcase */

export type ApiSearchResult = {
  status?: number;
  timestamp?: string;
  responseType?: string;
  data?: {
    totalWorks?: number;
    facets?: Facet[];
    paging?: {
      prev_page_sort?: string[];
      next_page_sort?: string[];
    };
    works?: ApiWork[];
  };
};

export type Facet = {
  [key: string]: FacetItem[];
};

export type FacetItem = { value?: string; count?: number };

export type Agent = {
  name?: string;
  sort_name?: string;
  viaf?: string;
  lcnaf?: string;
  role?: string;
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
  edition_id?: number;
  measurements?: Measurement[];
  agents?: Agent[];
  items?: Item[];
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
};

export type Rights = {
  source: string;
  license: string;
  rights_statement: string;
  rights_reason: string;
  determination_date_display: string;
  copyright_date: {
    gte: string;
    lte: string;
  };
  copyright_date_display: string;
};

export type Item = {
  source?: string;
  content_type?: string;
  modified?: string;
  drm?: string;
  links?: ItemLink[];
};

export type ItemLink = {
  url?: string;
  media_type?: string;
  content?: string;
  thumbnail?: string;
  local?: boolean;
  download?: boolean;
  images?: boolean;
  ebook?: boolean;
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

export type WorkEdition = {
  date_modified?: string;
  date_created?: string;
  id?: number;
  publication_place?: string;
  publication_date?: string;
  edition?: string;
  edition_statement?: string;
  volume?: string;
  table_of_contents?: string;
  extent?: string;
  summary?: string;
  work_id?: number;
  agents?: Agent[];
  items?: Item[];
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

export type ApiWork = {
  date_modified?: string;
  date_created?: string;
  id?: number;
  uuid?: string;
  title?: string;
  sort_title?: string;
  sub_title?: string;
  medium?: string;
  series?: string;
  series_position?: number;
  edition_count?: number;
  edition_range?: string;
  sort?: string[];
  agents?: Agent[];
  alt_titles?: string[];
  instances?: Instance[];
  languages?: Language[];
  editions?: WorkEdition[];
  identifiers?: Identifier[];
  subjects?: Subject[];
  measurements?: Measurement[];
};
