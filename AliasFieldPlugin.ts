import type { Plugin } from "vite";

/**
 * Stub plugin required by the current Vite config/runtime.
 *
 * The real project expects `./AliasFieldPlugin` to exist; however the
 * implementation is missing in this workspace.
 *
 * This no-op implementation unblocks `npm run dev` and `vite build`.
 */
const AliasFieldPlugin = (): Plugin => {
  return {
    name: "AliasFieldPlugin-stub",
    // no-op
  };
};

export default AliasFieldPlugin;
export { AliasFieldPlugin };
