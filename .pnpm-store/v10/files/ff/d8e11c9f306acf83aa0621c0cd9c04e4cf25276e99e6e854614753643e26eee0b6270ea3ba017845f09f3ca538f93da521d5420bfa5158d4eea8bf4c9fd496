import CJS_COMPAT_NODE_URL_gj4lgfde7ep from 'node:url';
import CJS_COMPAT_NODE_PATH_gj4lgfde7ep from 'node:path';
import CJS_COMPAT_NODE_MODULE_gj4lgfde7ep from "node:module";

var __filename = CJS_COMPAT_NODE_URL_gj4lgfde7ep.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_gj4lgfde7ep.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_gj4lgfde7ep.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------

// src/preset.ts
import { telemetry } from "storybook/internal/telemetry";

// package.json
var version = "10.3.3";

// src/constants.ts
var ADDON_ID = "storybook/onboarding", ADDON_ONBOARDING_CHANNEL = `${ADDON_ID}/channel`;

// src/preset.ts
var experimental_serverChannel = async (channel, options) => {
  let { disableTelemetry } = await options.presets.apply("core", {});
  return disableTelemetry || channel.on(ADDON_ONBOARDING_CHANNEL, ({ type, ...event }) => {
    type === "telemetry" ? telemetry("addon-onboarding", { ...event, addonVersion: version }) : type === "survey" && telemetry("onboarding-survey", { ...event, addonVersion: version });
  }), channel;
};
export {
  experimental_serverChannel
};
