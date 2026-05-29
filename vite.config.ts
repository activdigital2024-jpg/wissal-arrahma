// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Some workspaces expect a local AliasFieldPlugin module during config loading.
// Provide a safe alias to avoid runtime crashes when the expected file is missing.
// @ts-expect-error AliasFieldPlugin module may not exist in all environments
import AliasFieldPlugin from "./AliasFieldPlugin.cjs";

export default defineConfig({
  plugins: [AliasFieldPlugin()],
  base: "/wissal-arrahma/",
});
