import { itemDetailURL } from "./constants";

export type Pages = {
    route: string;
};

export const pages: { [name: string]: Pages } = {
    home: {
        route: "/"
    },
    "item detail": {
        route: itemDetailURL
    },
    "search result": {
        route: "/search?query=subject%3ASub-saharan+Africa"
    },
    "work details": {
        route: "/work/01a28167-8c8d-4141-a32f-718539d5c8a4?featured=949699"
    }
};