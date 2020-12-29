require.extensions[".svg"] = () => {};

require("@babel/register")();

require.extensions[".svg"] = () => {};

const jsdom = require("jsdom");

const { JSDOM } = jsdom;

const virtualConsole = new jsdom.VirtualConsole();
const exposedProperties = ["window", "navigator", "document"];

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'document'.
const { document } = new JSDOM("", {
  url: "http://localhost",
  virtualConsole,
}).window;
virtualConsole.sendTo(console, { omitJSDOMErrors: true });
// @ts-expect-error ts-migrate(2339) FIXME: Property 'document' does not exist on type 'Global... Remove this comment to see the full error message
global.document = document;
// @ts-expect-error ts-migrate(2339) FIXME: Property 'window' does not exist on type 'Global'.
global.window = document.defaultView;
// @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
Object.keys(document.defaultView).forEach((property) => {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (typeof global[property] === "undefined") {
    exposedProperties.push(property);
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    global[property] = document.defaultView[property];
  }
});

// @ts-expect-error ts-migrate(2339) FIXME: Property 'navigator' does not exist on type 'Globa... Remove this comment to see the full error message
global.navigator = {
  userAgent: "node.js",
};

// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'documentRef'.
documentRef = document;
