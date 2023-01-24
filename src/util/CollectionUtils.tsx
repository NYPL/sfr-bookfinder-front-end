import { formatUrl } from "./Util";
import { PLACEHOLDER_COVER_LINK } from "../constants/editioncard";
import { MediaTypes } from "../constants/mediaTypes";
import { Opds2Feed, OpdsLink } from "../types/OpdsModel";

export default class CollectionUtils {
  /** Get Cover Image
   * @param collection - The collection
   * @returns The URL of the cover that should be displayed.
   */
  static getCover(collection: Opds2Feed): string {
    if (!collection.publications || collection.publications.length === 0)
      return PLACEHOLDER_COVER_LINK;
    const coverLink = collection.publications[0].images.find((link) => {
      return MediaTypes.display.includes(link.type);
    });
    return coverLink ? formatUrl(coverLink.href) : PLACEHOLDER_COVER_LINK;
  }

  // TODO: replace with collection_id property that will be added on backend response
  static getId(links: OpdsLink[]): string {
    if (!links || links.length === 0) return "";
    const link = links[0].href;
    const id = link.substring(link.lastIndexOf("/") + 1, link.indexOf("?"));
    return id[0] ?? "";
  }
}
