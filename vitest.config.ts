import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["test/**/*.test.{ts,tsx}"],
    exclude: ["node_modules", "e2e/**", ".next/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["lib/**/*.ts", "app/**/*.{ts,tsx}"],
      exclude: [
        "node_modules/**",
        "test/**",
        "e2e/**",
        "**/*.config.*",
        "lib/poster.ts",
        "cli/post.ts",
        ".next/**",
        "app/layout.tsx",
        "**/*.d.ts",
      ],
    },
  },
});
