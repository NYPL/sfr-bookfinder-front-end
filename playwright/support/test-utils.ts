/* eslint-disable no-empty-pattern */
import { test as base, expect } from "@playwright/test";
import type { SetupServerApi } from "msw/node";
import { createServer, Server } from "http";
import { parse } from "url";
import { AddressInfo } from "net";
import next from "next";
import path from "path";
import { http } from "msw";
import handlers from "./handlers";

const test = base.extend<{
  port: string;
  requestInterceptor: SetupServerApi;
  http: typeof http;
}>({
  port: [
    async ({}, use) => {
      const app = next({ dev: false, dir: path.resolve(__dirname, "../..") });
      await app.prepare();

      const handle = app.getRequestHandler();

      const server: Server = await new Promise((resolve) => {
        const server = createServer((req, res) => {
          const parsedUrl = parse(req.url, true);
          handle(req, res, parsedUrl);
        });

        server.listen((error) => {
          if (error) throw error;
          resolve(server);
        });
      });
      const port = String((server.address() as AddressInfo).port);
      await use(port);
    },
    {
      auto: true,
    },
  ],
  requestInterceptor: [
    async ({}, use) => {
      await use(
        (() => {
          const { setupServer } = require("msw/node");
          const requestInterceptor = setupServer(...handlers);

          requestInterceptor.listen({
            onUnhandledRequest: "bypass",
          });

          return requestInterceptor;
        })()
      );
    },
    {
      auto: true,
    },
  ],
  http,
});

export { test, expect };
