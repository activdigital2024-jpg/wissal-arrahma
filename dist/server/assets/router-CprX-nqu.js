import { jsx, jsxs } from "react/jsx-runtime";
import { createRootRoute, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter, useRouter } from "@tanstack/react-router";
import { createContext, useState, useCallback, useEffect } from "react";
import { Toaster as Toaster$1 } from "sonner";
const appCss = "/assets/styles-BaOPL1dv.css";
const DEMO_CHILDREN = [
  {
    id: "demo-1",
    full_name: "أحمد محمد",
    educator_name: "فاطمة علي",
    status: "active",
    enrollment_date: "2024-01-15"
  },
  {
    id: "demo-2",
    full_name: "ليلى عبد الرحمن",
    educator_name: "مريم حسن",
    status: "active",
    enrollment_date: "2024-02-10"
  },
  {
    id: "demo-3",
    full_name: "علي محمود",
    educator_name: "نور سارة",
    status: "active",
    enrollment_date: "2024-03-01"
  }
];
function initializeDemoData() {
  const mockKidsStr = localStorage.getItem("mock_children");
  if (!mockKidsStr) {
    localStorage.setItem("mock_children", JSON.stringify(DEMO_CHILDREN));
  }
}
const STORAGE_PREFIX = "wissal_sql_store";
const SESSION_STORAGE_KEY = "wissal_sql_session";
const SEEDS = {
  app_settings: [
    {
      id: 1,
      monthly_fee: 200,
      org_name: "جامعية وصال الرحمة",
      org_address: "حي برشلونة 1، طنجة",
      org_phone: "",
      updated_at: "2026-05-09T19:19:47.839316+00:00"
    }
  ],
  attendance: [],
  evaluations: [
    {
      id: "12b39a20-bd60-4102-9d30-1fc5f2965938",
      student_id: "f44f37d8-601a-488b-a58e-df25aede2bf3",
      level: 1,
      month: 5,
      year: 2026,
      eval_date: "2026-05-15",
      child_age: null,
      educator_name: null,
      ratings: {},
      general_notes: null,
      recommendations: null,
      created_by: "5f11d16e-13bd-4a14-a9e7-370c706034c3",
      created_at: "2026-05-15T10:19:37.043431+00:00",
      updated_at: "2026-05-15T10:19:37.043431+00:00"
    },
    {
      id: "eval-complete-525fc789",
      student_id: "f44f37d8-601a-488b-a58e-df25aede2bf3",
      month: 5,
      year: 2026,
      eval_date: "2026-05-25",
      educator_name: "Fatima Al-Zahra",
      ratings: {
        pd_gross_motor: "advanced",
        pd_fine_motor: "proficient",
        pd_health: "proficient",
        es_emotions: "developing",
        es_cooperation: "proficient",
        es_relationships: "developing",
        cog_memory: "proficient",
        cog_problem_solving: "emerging",
        cog_learning: "proficient",
        lang_comprehension: "proficient",
        lang_expression: "developing",
        lang_vocabulary: "emerging"
      },
      general_notes: "L'enfant montre des progrès généraux. Il/elle affiche une bonne motricité globale et une coopération satisfaisante avec les pairs. Quelques améliorations sont nécessaires dans les domaines du langage et des relations interpersonnelles.",
      recommendations: "Continuer à encourager la participation aux activités de groupe. Travailler sur le développement du vocabulaire et de l'expression orale. Renforcer la confiance en soi durant les interactions avec les autres enfants.",
      created_by: "5f11d16e-13bd-4a14-a9e7-370c706034c3",
      created_at: "2026-05-25T16:50:58.138Z",
      updated_at: "2026-05-25T16:50:58.159Z"
    }
  ],
  payments: [
    {
      id: "0e1bf728-afc1-405f-bd07-76eb0c9e8463",
      receipt_no: 1,
      student_id: "f44f37d8-601a-488b-a58e-df25aede2bf3",
      year: 2026,
      month: 5,
      amount: 200,
      payment_method: "cash",
      payment_date: "2026-05-10",
      notes: null,
      created_by: null,
      created_at: "2026-05-10T13:12:01.206221+00:00"
    }
  ],
  profiles: [
    {
      id: "5f11d16e-13bd-4a14-a9e7-370c706034c3",
      full_name: "admin",
      email: "admin@gmail.com",
      created_at: "2026-05-10T13:07:09.350871+00:00"
    }
  ],
  students: [
    {
      id: "f44f37d8-601a-488b-a58e-df25aede2bf3",
      full_name: "fsd",
      birth_date: null,
      gender: "ذكر",
      guardian_name: "fsfds",
      guardian_phone: "55888568388",
      address: "gddd",
      email: "",
      health_notes: "",
      enrollment_date: "2026-05-10",
      status: "active",
      monthly_fee: null,
      created_at: "2026-05-10T13:11:52.097824+00:00",
      updated_at: "2026-05-14T10:52:12.670242+00:00",
      teacher_id: null,
      parent_email: null
    }
  ],
  teacher_absences: [],
  user_roles: [
    {
      id: "e7567d3d-f329-4b36-8bce-0f8e603b855b",
      user_id: "5f11d16e-13bd-4a14-a9e7-370c706034c3",
      role: "admin",
      created_at: "2026-05-10T13:07:54.002252+00:00"
    }
  ]
};
const RELATION_META = {
  students: { table: "students", fk: "student_id" },
  children: { table: "students", fk: "child_id" },
  profiles: { table: "profiles", fk: "user_id" }
};
const authSubscribers = /* @__PURE__ */ new Set();
let initializationDone = false;
function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}
function cloneRow(row) {
  return JSON.parse(JSON.stringify(row));
}
function getStorageKey(table) {
  return `${STORAGE_PREFIX}:${table}`;
}
function getSessionKey() {
  return SESSION_STORAGE_KEY;
}
function loadTable(table) {
  if (!isBrowser()) return SEEDS[table].map(cloneRow);
  const stored = window.localStorage.getItem(getStorageKey(table));
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
    }
  }
  const initial = SEEDS[table].map(cloneRow);
  window.localStorage.setItem(getStorageKey(table), JSON.stringify(initial));
  return initial;
}
function saveTable(table, rows) {
  if (!isBrowser()) return;
  window.localStorage.setItem(getStorageKey(table), JSON.stringify(rows.map(cloneRow)));
}
function getSession() {
  if (!isBrowser()) return null;
  const stored = window.localStorage.getItem(getSessionKey());
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}
function notifyAuthStateChange(session) {
  const event = session ? "SIGNED_IN" : "SIGNED_OUT";
  authSubscribers.forEach((callback) => callback(event, session));
}
function persistSession(session) {
  if (!isBrowser()) return;
  if (session === null) window.localStorage.removeItem(getSessionKey());
  else window.localStorage.setItem(getSessionKey(), JSON.stringify(session));
  notifyAuthStateChange(session);
}
function buildQuery(rows, conditions) {
  return rows.filter((row) => conditions.every((condition) => condition.matches(row)));
}
function ensureArray(value) {
  if (Array.isArray(value)) return value;
  if (value == null) return [];
  return [value];
}
function normalizeSortValue(value) {
  if (value == null) return "";
  if (typeof value === "number") return value;
  if (typeof value === "string") return value;
  return String(value);
}
function getIdValue(row) {
  return row.id;
}
function generateId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `id-${Math.random().toString(16).slice(2)}${Date.now()}`;
}
class QueryCondition {
  constructor(type, column, value) {
    this.type = type;
    this.column = column;
    this.value = value;
  }
  type;
  column;
  value;
  matches(row) {
    const actual = row[this.column];
    if (this.type === "eq") return actual === this.value;
    if (this.type === "in") {
      if (!Array.isArray(this.value)) return false;
      return this.value.includes(actual);
    }
    return false;
  }
}
class QueryBuilder {
  constructor(table) {
    this.table = table;
  }
  table;
  conditions = [];
  orderClause = null;
  payload = null;
  selectSpec = {
    all: false,
    columns: [],
    relations: []
  };
  opts = null;
  action = "select";
  upsertOptions = null;
  select(columns = "*", opts) {
    this.action = "select";
    this.opts = opts || null;
    const trimmed = columns.trim();
    if (trimmed === "*" || trimmed === "*") {
      this.selectSpec.all = true;
      return this;
    }
    const parts = trimmed.split(",").map((part) => part.trim()).filter(Boolean);
    for (const part of parts) {
      const relationMatch = part.match(/^(\w+)\(([^)]+)\)$/);
      if (relationMatch) {
        const alias = relationMatch[1];
        const inner = relationMatch[2];
        const config = RELATION_META[alias] ?? { table: alias, fk: `${alias}_id` };
        const relation = {
          alias,
          table: config.table,
          fk: config.fk,
          columns: inner.split(",").map((field) => field.trim())
        };
        this.selectSpec.relations.push(relation);
      } else {
        this.selectSpec.columns.push(part);
      }
    }
    return this;
  }
  insert(payload) {
    this.action = "insert";
    this.payload = payload;
    return this;
  }
  update(payload) {
    this.action = "update";
    this.payload = payload;
    return this;
  }
  delete() {
    this.action = "delete";
    return this;
  }
  upsert(payload, options) {
    this.action = "upsert";
    this.payload = payload;
    this.upsertOptions = options;
    return this;
  }
  eq(column, value) {
    this.conditions.push(new QueryCondition("eq", column, value));
    return this;
  }
  in(column, values) {
    this.conditions.push(new QueryCondition("in", column, values));
    return this;
  }
  order(column, options) {
    this.orderClause = { column, ascending: options?.ascending ?? true };
    return this;
  }
  maybeSingle() {
    return this.execute(true);
  }
  single() {
    return this.execute(true, true);
  }
  then(onfulfilled, onrejected) {
    return this.execute().then(onfulfilled, onrejected);
  }
  applySelection(row) {
    if (this.selectSpec.all || this.selectSpec.columns.length === 0) {
      const out = { ...row };
      for (const relation of this.selectSpec.relations)
        out[relation.alias] = this.buildRelation(row, relation);
      return out;
    }
    const picked = {};
    for (const column of this.selectSpec.columns) picked[column] = row[column];
    for (const relation of this.selectSpec.relations)
      picked[relation.alias] = this.buildRelation(row, relation);
    return picked;
  }
  buildRelation(row, relation) {
    const foreignKeyValue = row[relation.fk] ?? row[relation.fk.replace("_id", "_id")];
    const relatedRows = loadTable(relation.table);
    const related = relatedRows.find((item) => getIdValue(item) === foreignKeyValue);
    if (!related) return null;
    const selected = {};
    for (const column of relation.columns) {
      if (column === "age" && relation.table === "students") {
        selected.age = computeAge(related.birth_date);
      } else if (Object.prototype.hasOwnProperty.call(related, column)) {
        selected[column] = related[column];
      } else {
        selected[column] = null;
      }
    }
    return selected;
  }
  sortedRows(items) {
    if (!this.orderClause) return items;
    const { column, ascending } = this.orderClause;
    return [...items].sort((a, b) => {
      const left = normalizeSortValue(a[column]);
      const right = normalizeSortValue(b[column]);
      if (left === right) return 0;
      return ascending ? String(left).localeCompare(String(right), void 0, { numeric: true }) : String(right).localeCompare(String(left), void 0, { numeric: true });
    });
  }
  async execute(singleRow = false, strictSingle = false) {
    const tableRows = loadTable(this.table);
    let matched = buildQuery(tableRows, this.conditions);
    if (this.action === "insert") {
      const items = ensureArray(this.payload).map((item) => {
        const row = {
          ...item,
          id: item.id ?? generateId(),
          created_at: item.created_at ?? (/* @__PURE__ */ new Date()).toISOString(),
          updated_at: item.updated_at ?? (/* @__PURE__ */ new Date()).toISOString()
        };
        return row;
      });
      saveTable(this.table, [...tableRows, ...items]);
      matched = items;
    }
    if (this.action === "update") {
      const values = this.payload;
      const updated = [];
      const persisted = tableRows.map((row) => {
        if (matched.includes(row)) {
          const next = { ...row, ...values, updated_at: (/* @__PURE__ */ new Date()).toISOString() };
          updated.push(next);
          return next;
        }
        return row;
      });
      saveTable(this.table, persisted);
      matched = updated;
    }
    if (this.action === "delete") {
      const remaining = tableRows.filter((row) => !matched.includes(row));
      saveTable(this.table, remaining);
      return { data: [], error: null, count: matched.length };
    }
    if (this.action === "upsert") {
      const rows = ensureArray(this.payload);
      const options = this.upsertOptions;
      const conflictKeys = options?.onConflict.split(",").map((key) => key.trim()) ?? [];
      const persistedRows = [...tableRows];
      const results = [];
      for (const incoming of rows) {
        const foundIndex = conflictKeys.length ? persistedRows.findIndex(
          (row) => conflictKeys.every((key) => row[key] === incoming[key])
        ) : -1;
        if (foundIndex !== -1) {
          persistedRows[foundIndex] = {
            ...persistedRows[foundIndex],
            ...incoming,
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          };
          results.push(persistedRows[foundIndex]);
        } else {
          const inserted = {
            ...incoming,
            id: incoming.id ?? generateId(),
            created_at: (/* @__PURE__ */ new Date()).toISOString(),
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          };
          persistedRows.push(inserted);
          results.push(inserted);
        }
      }
      saveTable(this.table, persistedRows);
      matched = results;
    }
    if (this.action === "select") matched = this.sortedRows(matched);
    const selectedRows = matched.map((row) => this.applySelection(row));
    const count = selectedRows.length;
    if (this.opts?.head) return { data: null, error: null, count };
    if (singleRow) {
      if (strictSingle && count !== 1) {
        return {
          data: null,
          error: { message: count === 0 ? "No rows returned" : "Multiple rows returned" }
        };
      }
      return { data: count === 0 ? null : selectedRows[0], error: null, count };
    }
    return { data: selectedRows, error: null, count };
  }
}
function computeAge(birthDate) {
  if (!birthDate) return null;
  const birthday = new Date(birthDate);
  if (Number.isNaN(birthday.getTime())) return null;
  return (/* @__PURE__ */ new Date()).getFullYear() - birthday.getFullYear();
}
function ensureInitialized() {
  if (initializationDone) return;
  if (isBrowser()) {
    Object.keys(SEEDS).forEach((table) => loadTable(table));
  }
  initializationDone = true;
}
function getUserByEmail(email) {
  const normalized = email.trim().toLowerCase();
  const profiles = loadTable("profiles");
  return profiles.find((profile) => {
    const profileEmail = profile.email;
    return profileEmail?.trim().toLowerCase() === normalized;
  });
}
function createSession(user) {
  const session = { user, expires_at: null };
  persistSession(session);
  return session;
}
function normalizeProfile(profile) {
  return {
    id: String(profile.id),
    email: profile.email,
    full_name: profile.full_name
  };
}
const supabaseLike = {
  from: (table) => new QueryBuilder(table),
  auth: {
    signInWithPassword: async ({ email }) => {
      ensureInitialized();
      const profile = getUserByEmail(email);
      if (!profile) return { data: null, error: { message: "Email introuvable" } };
      const user = normalizeProfile(profile);
      const session = createSession(user);
      notifyAuthStateChange(session);
      return { data: { user }, error: null };
    },
    signUp: async ({
      email,
      password,
      options
    }) => {
      ensureInitialized();
      if (!email) return { data: null, error: { message: "Email requis" } };
      if (getUserByEmail(email))
        return { data: null, error: { message: "L'adresse e-mail existe déjà" } };
      const id = generateId();
      const profile = {
        id,
        email,
        full_name: options?.data?.full_name ?? null,
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      const profiles = loadTable("profiles");
      profiles.push(profile);
      saveTable("profiles", profiles);
      const roles = loadTable("user_roles");
      roles.push({
        id: generateId(),
        user_id: id,
        role: "secretary",
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      });
      saveTable("user_roles", roles);
      const user = normalizeProfile(profile);
      const session = createSession(user);
      notifyAuthStateChange(session);
      return { data: { user }, error: null };
    },
    getSession: async () => {
      ensureInitialized();
      const session = getSession();
      return { data: { session }, error: null };
    },
    signOut: async () => {
      persistSession(null);
      return { data: null, error: null };
    },
    onAuthStateChange: (callback) => {
      ensureInitialized();
      authSubscribers.add(callback);
      return { subscription: { unsubscribe: () => authSubscribers.delete(callback) } };
    }
  },
  functions: {
    invoke: async (name, options) => {
      ensureInitialized();
      if (name !== "admin-users") return { data: null, error: { message: "Fonction non trouvée" } };
      const { body } = options;
      if (body.action === "create") {
        if (!body.email) return { data: { error: "Email requis" }, error: null };
        if (getUserByEmail(body.email))
          return { data: { error: "L'utilisateur existe déjà" }, error: null };
        const id = generateId();
        const profile = {
          id,
          email: body.email,
          full_name: body.full_name ?? null,
          created_at: (/* @__PURE__ */ new Date()).toISOString()
        };
        const profiles = loadTable("profiles");
        profiles.push(profile);
        saveTable("profiles", profiles);
        const roles = loadTable("user_roles");
        roles.push({
          id: generateId(),
          user_id: id,
          role: body.role ?? "secretary",
          created_at: (/* @__PURE__ */ new Date()).toISOString()
        });
        saveTable("user_roles", roles);
        return { data: { id }, error: null };
      }
      if (body.action === "set_role") {
        if (!body.user_id || !body.role)
          return { data: { error: "Données manquantes" }, error: null };
        const roles = loadTable("user_roles");
        const index = roles.findIndex((role) => role.user_id === body.user_id);
        if (index !== -1) {
          roles[index] = {
            ...roles[index],
            role: body.role,
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          };
        } else {
          roles.push({
            id: generateId(),
            user_id: body.user_id,
            role: body.role,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          });
        }
        saveTable("user_roles", roles);
        return { data: { success: true }, error: null };
      }
      if (body.action === "delete") {
        if (!body.user_id) return { data: { error: "Données manquantes" }, error: null };
        const profiles = loadTable("profiles");
        saveTable(
          "profiles",
          profiles.filter((profile) => String(profile.id) !== body.user_id)
        );
        const roles = loadTable("user_roles");
        saveTable(
          "user_roles",
          roles.filter((role) => role.user_id !== body.user_id)
        );
        return { data: { success: true }, error: null };
      }
      return { data: { error: "Action inconnue" }, error: null };
    }
  }
};
const supabase = supabaseLike;
const Ctx = createContext({
  user: null,
  session: null,
  role: null,
  roles: [],
  isAdmin: false,
  isSecretary: false,
  isTeacher: false,
  canAccessAdmin: false,
  loading: true,
  signOut: async () => {
  }
});
function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchRole = useCallback(
    (uid) => {
      supabase.from("user_roles").select("role").eq("user_id", uid).then(
        ({ data }) => {
          const userRoles = (data ?? []).map((r) => r.role);
          setRoles(userRoles);
          if (userRoles.includes("admin")) setRole("admin");
          else if (userRoles.includes("secretary")) setRole("secretary");
          else if (userRoles.includes("teacher")) setRole("teacher");
          else setRole(null);
        },
        () => {
          setRoles([]);
          setRole(null);
        }
      );
    },
    [setRoles, setRole]
  );
  useEffect(() => {
    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, s) => {
        setSession(s);
        setUser(s?.user ?? null);
        if (s?.user?.id) {
          setTimeout(() => fetchRole(s.user.id), 0);
        } else {
          setRole(null);
        }
      }
    );
    supabase.auth.getSession().then(
      ({ data: { session: s } }) => {
        setSession(s);
        setUser(s?.user ?? null);
        if (s?.user?.id) fetchRole(s.user.id);
        setLoading(false);
      },
      () => setLoading(false)
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
  return /* @__PURE__ */ jsx(
    Ctx.Provider,
    {
      value: {
        user,
        roles,
        session,
        role,
        isAdmin,
        isSecretary,
        isTeacher,
        canAccessAdmin: isAdmin || isSecretary || isTeacher,
        loading,
        signOut
      },
      children
    }
  );
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "الصفحة غير موجودة" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "العودة إلى الرئيسية"
      }
    ) })
  ] }) });
}
const Route$i = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "جمعية وصال الرحمة" },
      {
        name: "description",
        content: "جمعية وصال الرحمة لدمج وتأهيل الأطفال في وضعية إعاقة ذهنية — طنجة"
      },
      { name: "author", content: "Association Wissal Arrahma" },
      { property: "og:title", content: "جمعية وصال الرحمة" },
      {
        property: "og:description",
        content: "جمعية وصال الرحمة لدمج وتأهيل الأطفال في وضعية إعاقة ذهنية — طنجة"
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "جمعية وصال الرحمة" },
      {
        name: "twitter:description",
        content: "جمعية وصال الرحمة لدمج وتأهيل الأطفال في وضعية إعاقة ذهنية — طنجة"
      },
      {
        property: "og:image",
        content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/36be52b0-84ba-42ba-8bda-9144bbb21ec5/id-preview-ad237cf2--1cef1ed3-9f7c-495b-bc08-b6375cc1c05a.lovable.app-1778665332717.png"
      },
      {
        name: "twitter:image",
        content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/36be52b0-84ba-42ba-8bda-9144bbb21ec5/id-preview-ad237cf2--1cef1ed3-9f7c-495b-bc08-b6375cc1c05a.lovable.app-1778665332717.png"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "ar", dir: "rtl", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  useEffect(() => {
    initializeDemoData();
  }, []);
  return /* @__PURE__ */ jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(Toaster, { richColors: true, position: "top-center" })
  ] });
}
const $$splitComponentImporter$h = () => import("./programmes-CrXTwWnn.js");
const Route$h = createFileRoute("/programmes")({
  head: () => ({
    meta: [{
      title: "برامجنا — وصال الرحمة"
    }, {
      name: "description",
      content: "التعليم، التأهيل، دعم الأسر والمرافعة: اكتشف مجالات تدخل جمعية وصال الرحمة."
    }, {
      property: "og:title",
      content: "البرامج ومجالات التدخل"
    }, {
      property: "og:description",
      content: "خمسة محاور للعمل من أجل دمج الأطفال في وضعية إعاقة ذهنية."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./partenaires-C0fqTPYJ.js");
const Route$g = createFileRoute("/partenaires")({
  head: () => ({
    meta: [{
      title: "شركاؤنا — وصال الرحمة"
    }, {
      name: "description",
      content: "المؤسسات والمؤسسات المانحة والجمعيات التي تدعم عمل وصال الرحمة بطنجة."
    }, {
      property: "og:title",
      content: "شركاء جمعية وصال الرحمة"
    }, {
      property: "og:description",
      content: "معًا من أجل الأطفال في وضعية إعاقة ذهنية."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./contact-Cc2JhtH0.js");
const Route$f = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "اتصل بنا — وصال الرحمة"
    }, {
      name: "description",
      content: "تواصل مع جمعية وصال الرحمة بطنجة: العنوان، الهواتف، البريد الإلكتروني وشبكات التواصل."
    }, {
      property: "og:title",
      content: "اتصل بنا — وصال الرحمة"
    }, {
      property: "og:description",
      content: "برانص 1، زنقة Z رقم 03، طنجة. هاتف، بريد إلكتروني وشبكات اجتماعية."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./admin-BrYY_sMy.js");
const Route$e = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "لوحة الإدارة | جمعية وصال الرحمة"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./a-propos-DDrMo91A.js");
const Route$d = createFileRoute("/a-propos")({
  head: () => ({
    meta: [{
      title: "من نحن — جمعية وصال الرحمة"
    }, {
      name: "description",
      content: "اكتشف رؤية ورسالة وأهداف جمعية وصال الرحمة، التي تأسست سنة 2011 بطنجة."
    }, {
      property: "og:title",
      content: "من نحن — وصال الرحمة"
    }, {
      property: "og:description",
      content: "رؤيتنا ورسالتنا وأهدافنا لدمج الأطفال في وضعية إعاقة ذهنية."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./index-C5oB-c5y.js");
const Route$c = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "وصال الرحمة — دمج الأطفال في وضعية إعاقة ذهنية"
    }, {
      name: "description",
      content: "جمعية وصال الرحمة بطنجة: التعليم، التأهيل ودمج الأطفال في وضعية إعاقة ذهنية منذ 2011."
    }, {
      property: "og:title",
      content: "وصال الرحمة — للدمج والتأهيل"
    }, {
      property: "og:description",
      content: "بناء مجتمع دامج للأطفال في وضعية إعاقة ذهنية."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./admin.index-DmBwnK0Q.js");
const Route$b = createFileRoute("/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./admin.users-DVfY0uEm.js");
const Route$a = createFileRoute("/admin/users")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./admin.teacher-absences-Z5pk8fne.js");
const Route$9 = createFileRoute("/admin/teacher-absences")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./admin.students-DzaWkRyV.js");
const Route$8 = createFileRoute("/admin/students")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./admin.settings-8TIZC4Cv.js");
const Route$7 = createFileRoute("/admin/settings")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./admin.payments-37TEreMQ.js");
const Route$6 = createFileRoute("/admin/payments")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./admin.login-BJR2mbx7.js");
const Route$5 = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{
      title: "تسجيل الدخول | لوحة الإدارة"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./admin.evaluations-C6T4JzZR.js");
const Route$4 = createFileRoute("/admin/evaluations")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.attendance-BeBblbgO.js");
const Route$3 = createFileRoute("/admin/attendance")({
  head: () => ({
    meta: [{
      title: "الحضور والغياب | لوحة الإدارة"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.evaluations.new-Doc5F0uy.js");
const Route$2 = createFileRoute("/admin/evaluations/new")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.evaluations._id-DpvKKKrz.js");
const Route$1 = createFileRoute("/admin/evaluations/$id")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.evaluations._id.edit-B8OicdcY.js");
const Route = createFileRoute("/admin/evaluations/$id/edit")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ProgrammesRoute = Route$h.update({
  id: "/programmes",
  path: "/programmes",
  getParentRoute: () => Route$i
});
const PartenairesRoute = Route$g.update({
  id: "/partenaires",
  path: "/partenaires",
  getParentRoute: () => Route$i
});
const ContactRoute = Route$f.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$i
});
const AdminRoute = Route$e.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$i
});
const AProposRoute = Route$d.update({
  id: "/a-propos",
  path: "/a-propos",
  getParentRoute: () => Route$i
});
const IndexRoute = Route$c.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$i
});
const AdminIndexRoute = Route$b.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRoute
});
const AdminUsersRoute = Route$a.update({
  id: "/users",
  path: "/users",
  getParentRoute: () => AdminRoute
});
const AdminTeacherAbsencesRoute = Route$9.update({
  id: "/teacher-absences",
  path: "/teacher-absences",
  getParentRoute: () => AdminRoute
});
const AdminStudentsRoute = Route$8.update({
  id: "/students",
  path: "/students",
  getParentRoute: () => AdminRoute
});
const AdminSettingsRoute = Route$7.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AdminRoute
});
const AdminPaymentsRoute = Route$6.update({
  id: "/payments",
  path: "/payments",
  getParentRoute: () => AdminRoute
});
const AdminLoginRoute = Route$5.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => AdminRoute
});
const AdminEvaluationsRoute = Route$4.update({
  id: "/evaluations",
  path: "/evaluations",
  getParentRoute: () => AdminRoute
});
const AdminAttendanceRoute = Route$3.update({
  id: "/attendance",
  path: "/attendance",
  getParentRoute: () => AdminRoute
});
const AdminEvaluationsNewRoute = Route$2.update({
  id: "/new",
  path: "/new",
  getParentRoute: () => AdminEvaluationsRoute
});
const AdminEvaluationsIdRoute = Route$1.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => AdminEvaluationsRoute
});
const AdminEvaluationsIdEditRoute = Route.update({
  id: "/edit",
  path: "/edit",
  getParentRoute: () => AdminEvaluationsIdRoute
});
const AdminEvaluationsIdRouteChildren = {
  AdminEvaluationsIdEditRoute
};
const AdminEvaluationsIdRouteWithChildren = AdminEvaluationsIdRoute._addFileChildren(AdminEvaluationsIdRouteChildren);
const AdminEvaluationsRouteChildren = {
  AdminEvaluationsIdRoute: AdminEvaluationsIdRouteWithChildren,
  AdminEvaluationsNewRoute
};
const AdminEvaluationsRouteWithChildren = AdminEvaluationsRoute._addFileChildren(AdminEvaluationsRouteChildren);
const AdminRouteChildren = {
  AdminAttendanceRoute,
  AdminEvaluationsRoute: AdminEvaluationsRouteWithChildren,
  AdminLoginRoute,
  AdminPaymentsRoute,
  AdminSettingsRoute,
  AdminStudentsRoute,
  AdminTeacherAbsencesRoute,
  AdminUsersRoute,
  AdminIndexRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AProposRoute,
  AdminRoute: AdminRouteWithChildren,
  ContactRoute,
  PartenairesRoute,
  ProgrammesRoute
};
const routeTree = Route$i._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "حدث خطأ ما" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "حدث خطأ غير متوقع. يرجى المحاولة من جديد." }),
    false,
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "إعادة المحاولة"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "العودة إلى الرئيسية"
        }
      )
    ] })
  ] }) });
}
function getRouter() {
  const router2 = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ctx as C,
  router as r,
  supabase as s
};
