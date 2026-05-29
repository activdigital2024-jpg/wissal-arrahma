// Type re-exports (no runtime dependency)
export type { AuthCtx, AppRole } from "./useAuthContext.tsx";
// Runtime context comes from the .tsx file that actually creates the Context
export { Ctx } from "./useAuthContext.tsx";
