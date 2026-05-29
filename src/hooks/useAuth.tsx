import { useEffect, useState, useCallback } from "react";
import type { ReactNode } from "react";

import { supabase } from "@/integrations/localdb/client";

import { Ctx } from "./useAuthContext.tsx";
import type { AppRole } from "./useAuthContext.tsx";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthUser = {
  id: string;
  email: string | null;
  full_name: string | null;
};

type Session = {
  user: AuthUser | null;
  expires_at: string | null;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  type UserRoleRow = { role: AppRole };

  const fetchRole = useCallback(
    (uid: string) => {
      supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid)
        .then(
          ({ data }: { data: unknown }) => {
            const userRoles = ((data ?? []) as UserRoleRow[]).map((r) => r.role);
            setRoles(userRoles);
            if (userRoles.includes("admin")) setRole("admin");
            else if (userRoles.includes("secretary")) setRole("secretary");
            else if (userRoles.includes("teacher")) setRole("teacher");
            else setRole(null);
          },
          () => {
            setRoles([]);
            setRole(null);
          },
        );
    },
    [setRoles, setRole],
  );

  useEffect(() => {
    const { subscription } = supabase.auth.onAuthStateChange(
      (_event: "SIGNED_IN" | "SIGNED_OUT", s: Session | null) => {
        setSession(s);
        setUser(s?.user ?? null);
        if (s?.user?.id) {
          setTimeout(() => fetchRole(s.user!.id), 0);
        } else {
          setRole(null);
        }
      },
    );

    supabase.auth.getSession().then(
      ({ data: { session: s } }: { data: { session: Session | null } }) => {
        setSession(s);
        setUser(s?.user ?? null);
        if (s?.user?.id) fetchRole(s.user.id);
        setLoading(false);
      },
      () => setLoading(false),
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchRole]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const isAdmin = role === "admin";
  const isSecretary = role === "secretary";
  const isTeacher = role === "teacher";

  return (
    <Ctx.Provider
      value={{
        user,
        roles,
        session,
        role,
        isAdmin,
        isSecretary,
        isTeacher,
        canAccessAdmin: isAdmin || isSecretary || isTeacher,
        loading,
        signOut,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
