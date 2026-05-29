import { createContext, type ReactNode } from "react";

export type AppRole = "admin" | "secretary" | "teacher";

type AuthUser = {
  id: string;
  email: string | null;
  full_name: string | null;
};

type Session = {
  user: AuthUser | null;
  expires_at: string | null;
};

export type AuthCtx = {
  user: AuthUser | null;
  session: Session | null;
  role: AppRole | null;
  roles: AppRole[];
  isAdmin: boolean;
  isSecretary: boolean;
  isTeacher: boolean;
  canAccessAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
};

export const Ctx = createContext<AuthCtx>({
  user: null,
  session: null,
  role: null,
  roles: [],
  isAdmin: false,
  isSecretary: false,
  isTeacher: false,
  canAccessAdmin: false,
  loading: true,
  signOut: async () => {},
});
