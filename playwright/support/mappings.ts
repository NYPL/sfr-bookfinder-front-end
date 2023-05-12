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
    }
};