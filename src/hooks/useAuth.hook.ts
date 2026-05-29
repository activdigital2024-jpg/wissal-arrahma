import { useContext } from "react";
import { Ctx } from "./useAuthContext.tsx";
import type { AuthCtx } from "./useAuthContext.tsx";
export function useAuth(): AuthCtx {
  return useContext(Ctx);
}

// Moved from useAuth.tsx for Fast Refresh compliance
// Usage: import { useAuth } from './useAuth.hook';
