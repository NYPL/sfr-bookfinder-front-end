import { Opds2Feed } from "./OpdsModel";

export type CollectionQuery = {
  identifier: string;
  page?: number;
  perPage?: number;
  sort?: string;
};

export type CollectionResult = Opds2Feed;
