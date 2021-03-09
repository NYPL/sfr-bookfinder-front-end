import {
  SepiaTheme,
  SerifFont,
  SansFont,
  PublisherFont,
  DyslexiaFont,
  LocalStorageStore,
  IFrameNavigator,
  DayTheme,
  NightTheme,
  BookSettings,
  LocalAnnotator,
  ServiceWorkerCacher,
  ColumnsPaginatedBookView,
  ScrollingBookView,
} from "library-simplified-webpub-viewer";
import appConfig from "~/config/appConfig";
import { formatUrl } from "./Util";

export default async function reader(bookUrl: string) {
  const element = document.getElementById("viewer");
  const finalUrl = new URL(formatUrl(bookUrl));

  initBookSettings(element, finalUrl);
}

async function initBookSettings(
  element: HTMLElement | null,
  webpubManifestUrl: URL
) {
  const store = new LocalStorageStore({
    prefix: webpubManifestUrl.href,
  });
  const cacher = new ServiceWorkerCacher({
    store: store,
    manifestUrl: webpubManifestUrl,
    serviceWorkerUrl: new URL("sw.js", window.location.href),
    staticFileUrls: [
      new URL(window.location.href),
      new URL("index.html", window.location.href),
      new URL("main.css", window.location.href),
      new URL("require.js", window.location.href),
      new URL("fetch.js", window.location.href),
      new URL("webpub-viewer.js", window.location.href),
    ],
  });

  const fontSizes = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32];
  const annotator = new LocalAnnotator({ store: store });
  const settingsStore = new LocalStorageStore({
    prefix: "webpub-viewer",
  });
  const upLink = {
    url: new URL(document.referrer || window.location.origin),
    label: `Return to ${appConfig.appName}`,
    ariaLabel: `Return to ${appConfig.appName}`,
  };
  const publisher = new PublisherFont();
  const serif = new SerifFont();
  const sans = new SansFont();
  const dlFont = new DyslexiaFont();
  const day = new DayTheme();
  const sepia = new SepiaTheme();
  const night = new NightTheme();
  const paginator = new ColumnsPaginatedBookView();
  const scroller = new ScrollingBookView();

  const entryUrl: URL = webpubManifestUrl;

  const bookSettings = await BookSettings.create({
    store: settingsStore,
    bookFonts: [publisher, serif, sans, dlFont],
    fontSizesInPixels: fontSizes,
    bookThemes: [day, sepia, night],
    bookViews: [paginator, scroller],
  });
  await IFrameNavigator.create({
    element: element,
    entryUrl: entryUrl,
    store: store,
    cacher: cacher,
    settings: bookSettings,
    annotator: annotator,
    publisher: publisher,
    serif: serif,
    sans: sans,
    dlFont: dlFont,
    day: day,
    sepia: sepia,
    night: night,
    paginator: paginator,
    scroller: scroller,
    upLink: upLink,
    allowFullscreen: true,
  });
}
