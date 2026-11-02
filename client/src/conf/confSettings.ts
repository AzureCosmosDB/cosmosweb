export type ConfSettings = {
  showStream: boolean;
  showAgenda: boolean;
  streamEmbedUrl: string | null;
};

// Default values are stored in JSON so non-dev edits are easy.
// The actual values come from `siteConfig.customFields.conf` (set in `docusaurus.config.ts`).
//
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import confDefaultsJson from "./confSettings.json";

const confDefaults: ConfSettings = {
  showStream: typeof confDefaultsJson.showStream === "boolean" ? confDefaultsJson.showStream : true,
  showAgenda: typeof confDefaultsJson.showAgenda === "boolean" ? confDefaultsJson.showAgenda : true,
  streamEmbedUrl:
    typeof confDefaultsJson.streamEmbedUrl === "string" && confDefaultsJson.streamEmbedUrl.trim()
      ? confDefaultsJson.streamEmbedUrl.trim()
      : null,
};

export function getConfSettings(siteConfig: any): ConfSettings {
  const conf = siteConfig?.customFields?.conf ?? {};

  return {
    showStream: typeof conf.showStream === "boolean" ? conf.showStream : confDefaults.showStream,
    showAgenda: typeof conf.showAgenda === "boolean" ? conf.showAgenda : confDefaults.showAgenda,
    streamEmbedUrl:
      typeof conf.streamEmbedUrl === "string"
        ? conf.streamEmbedUrl.trim() || null
        : typeof conf.streamEmbedUrl === "object" && conf.streamEmbedUrl === null
          ? null
          : confDefaults.streamEmbedUrl,
  };
}
