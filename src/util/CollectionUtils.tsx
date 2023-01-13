import { formatUrl } from "./Util";
import { PLACEHOLDER_COVER_LINK } from "../constants/editioncard";
import { MediaTypes } from "../constants/mediaTypes";
import { Opds2Feed, OpdsLink } from "../types/OpdsModel";

export default class CollectionUtils {
  /** Get Cover Image
   * @param covers - The list of covers
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

  static getId(links: OpdsLink[]): string {
    if (!links || links.length === 0) return "";
    const id = links[0].href.match(/.*\/(.*)\?/g);
    return id[0] ?? "";
  }
}
