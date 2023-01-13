export type Opds2Feed = {
  facets: OpdsFacet[];
  groups: Opds2Feed[];
  images: OpdsImage[];
  links: OpdsLink[];
  metadata: OpdsMetadata;
  navigation: OpdsNavigation[];
  publications: OpdsPublication[];
};

export type OpdsFacet = {
  links: OpdsLink[];
  metadata: OpdsMetadata;
};

export type OpdsLink = {
  alternate: string;
  bitrate: number;
  children: any[];
  duration: number;
  height: number;
  href: string;
  language: string;
  properties: any;
  rel: string;
  templated: boolean;
  title: string;
  type: string;
  width: number;
};

export type OpdsMetadata = {
  abridged: string;
  alternate: number;
  artist: string;
  author: string;
  belongsTo: string;
  bitrate: number;
  collection: string;
  colorist: string;
  contributor: string;
  description: string;
  duration: number;
  editor: string;
  height: number;
  href: string;
  identifier: string;
  illustrator: string;
  imprint: string;
  inker: string;
  language: string;
  letterer: string;
  links: OpdsLink[];
  modified: string;
  name: string;
  narrator: string;
  numberOfPages: number;
  numberOfItems: number;
  penciler: string;
  position: string;
  published: number;
  publisher: string;
  readingOrder: ReadingOrder[];
  rel: string;
  resources: Resource[];
  series: string;
  sortAs: string;
  subject: string;
  subtitle: string;
  title: string;
  translator: string;
  type: string;
  width: number;
};

export type ReadingOrder = {
  alternate: string;
  bitrate: number;
  children: any[];
  duration: number;
  height: number;
  href: string;
  language: string;
  properties: any;
  rel: string;
  templated: boolean;
  title: string;
  type: string;
  width: number;
};

export type Resource = {
  alternate: string;
  bitrate: number;
  children: any[];
  duration: number;
  height: number;
  href: string;
  language: string;
  properties: any;
  rel: string;
  templated: boolean;
  title: string;
  type: string;
  width: number;
};

export type OpdsNavigation = {
  href: string;
  rel: string;
  title: string;
  type: string;
};

export type OpdsPublication = {
  editions: any[];
  images: OpdsImage[];
  links: OpdsLink[];
  metadata: OpdsMetadata;
  type: string;
};

export type OpdsImage = {
  alternate: string;
  bitrate: number;
  children: any[];
  duration: number;
  height: number;
  href: string;
  language: string;
  properties: any;
  rel: string;
  templated: boolean;
  title: string;
  type: string;
  width: number;
};
