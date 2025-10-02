// source.config.ts
import { defineDocs, defineConfig } from "fumadocs-mdx/config";
var docs = defineDocs({
  dir: "content/docs"
});
var source_config_default = defineConfig({
  mdxOptions: {
    // Path to import your `mdx-components.tsx` above.
    providerImportSource: "@/components/mdx-components"
  }
});
export {
  source_config_default as default,
  docs
};
