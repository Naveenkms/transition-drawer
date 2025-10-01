import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    setupFiles: ["./vitest-setup.ts"],
    environment: "jsdom",
    globals: true,
    include: ["**/*.test.?(c|m)[jt]s?(x)"],
  },
});
