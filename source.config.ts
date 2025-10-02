import { defineDocs, defineConfig } from "fumadocs-mdx/config";

export const docs = defineDocs({
  dir: "content/docs",
});

export default defineConfig({
  mdxOptions: {
    // Path to import your `mdx-components.tsx` above.
    providerImportSource: "@/components/mdx-components",
  },
});
