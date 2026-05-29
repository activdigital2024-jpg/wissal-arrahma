// LocalDB client: remplace Supabase par un backend mock (localStorage)
// IMPORTANT: cette implémentation conserve l’API minimale utilisée dans le projet.

type TableName =
  | "app_settings"
  | "attendance"
  | "evaluations"
  | "payments"
  | "profiles"
  | "students"
  | "teacher_absences"
  | "user_roles";

type TableRow = Record<string, unknown>;

type AuthUser = { id: string; email: string | null; full_name: string | null };

type Session = { user: AuthUser | null; expires_at: string | null };

type QueryResult = {
  data: unknown;
  error: { message: string } | null;
  count?: number | null;
};

type RelationSpec = {
  alias: string;
  table: TableName;
  columns: string[];
  fk: string;
};

type SelectOptions = { count?: "exact"; head?: boolean };

type UpsertOptions = { onConflict: string };

type AuthChangeEvent = "SIGNED_IN" | "SIGNED_OUT";

type AuthStateChangeCallback = (event: AuthChangeEvent, session: Session | null) => void;

type AdminUsersPayload = {
  action: "create" | "set_role" | "delete";
  email?: string;
  password?: string;
  full_name?: string;
  role?: string;
  user_id?: string;
};

const STORAGE_PREFIX = "wissal_sql_store";
const SESSION_STORAGE_KEY = "wissal_sql_session";

const SEEDS: Record<TableName, TableRow[]> = {
  app_settings: [
    {
      id: 1,
      monthly_fee: 200.0,
      org_name: "جامعية وصال الرحمة",
      org_address: "حي برشلونة 1، طنجة",
      org_phone: "",
      updated_at: "2026-05-09T19:19:47.839316+00:00",
    },
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
      updated_at: "2026-05-15T10:19:37.043431+00:00",
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
        lang_vocabulary: "emerging",
      },
      general_notes:
        "L'enfant montre des progrès généraux. Il/elle affiche une bonne motricité globale et une coopération satisfaisante avec les pairs. Quelques améliorations sont nécessaires dans les domaines du langage et des relations interpersonnelles.",
      recommendations:
        "Continuer à encourager la participation aux activités de groupe. Travailler sur le développement du vocabulaire et de l'expression orale. Renforcer la confiance en soi durant les interactions avec les autres enfants.",
      created_by: "5f11d16e-13bd-4a14-a9e7-370c706034c3",
      created_at: "2026-05-25T16:50:58.138Z",
      updated_at: "2026-05-25T16:50:58.159Z",
    },
  ],
  payments: [
    {
      id: "0e1bf728-afc1-405f-bd07-76eb0c9e8463",
      receipt_no: 1,
      student_id: "f44f37d8-601a-488b-a58e-df25aede2bf3",
      year: 2026,
      month: 5,
      amount: 200.0,
      payment_method: "cash",
      payment_date: "2026-05-10",
      notes: null,
      created_by: null,
      created_at: "2026-05-10T13:12:01.206221+00:00",
    },
  ],
  profiles: [
    {
      id: "5f11d16e-13bd-4a14-a9e7-370c706034c3",
      full_name: "admin",
      email: "admin@gmail.com",
      created_at: "2026-05-10T13:07:09.350871+00:00",
    },
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
      parent_email: null,
    },
  ],
  teacher_absences: [],
  user_roles: [
    {
      id: "e7567d3d-f329-4b36-8bce-0f8e603b855b",
      user_id: "5f11d16e-13bd-4a14-a9e7-370c706034c3",
      role: "admin",
      created_at: "2026-05-10T13:07:54.002252+00:00",
    },
  ],
};

const RELATION_META: Record<string, { table: TableName; fk: string }> = {
  students: { table: "students", fk: "student_id" },
  children: { table: "students", fk: "child_id" },
  profiles: { table: "profiles", fk: "user_id" },
};

const authSubscribers = new Set<AuthStateChangeCallback>();
let initializationDone = false;

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function cloneRow<T extends TableRow>(row: T): T {
  return JSON.parse(JSON.stringify(row));
}

function getStorageKey(table: TableName) {
  return `${STORAGE_PREFIX}:${table}`;
}

function getSessionKey() {
  return SESSION_STORAGE_KEY;
}

function loadTable(table: TableName): TableRow[] {
  if (!isBrowser()) return SEEDS[table].map(cloneRow);

  const stored = window.localStorage.getItem(getStorageKey(table));
  if (stored) {
    try {
      return JSON.parse(stored) as TableRow[];
    } catch {
      // fallback to seed
    }
  }
  const initial = SEEDS[table].map(cloneRow);
  window.localStorage.setItem(getStorageKey(table), JSON.stringify(initial));
  return initial;
}

function saveTable(table: TableName, rows: TableRow[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(getStorageKey(table), JSON.stringify(rows.map(cloneRow)));
}

function getSession(): Session | null {
  if (!isBrowser()) return null;
  const stored = window.localStorage.getItem(getSessionKey());
  if (!stored) return null;
  try {
    return JSON.parse(stored) as Session;
  } catch {
    return null;
  }
}

function notifyAuthStateChange(session: Session | null) {
  const event: AuthChangeEvent = session ? "SIGNED_IN" : "SIGNED_OUT";
  authSubscribers.forEach((callback) => callback(event, session));
}

function persistSession(session: Session | null) {
  if (!isBrowser()) return;
  if (session === null) window.localStorage.removeItem(getSessionKey());
  else window.localStorage.setItem(getSessionKey(), JSON.stringify(session));
  notifyAuthStateChange(session);
}

function buildQuery(rows: TableRow[], conditions: QueryCondition[]) {
  return rows.filter((row) => conditions.every((condition) => condition.matches(row)));
}

function ensureArray<T>(value: T[] | T | undefined | null): T[] {
  if (Array.isArray(value)) return value;
  if (value == null) return [];
  return [value];
}

function normalizeSortValue(value: unknown) {
  if (value == null) return "";
  if (typeof value === "number") return value;
  if (typeof value === "string") return value;
  return String(value);
}

function getIdValue(row: TableRow) {
  return row.id as string | undefined;
}

function generateId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `id-${Math.random().toString(16).slice(2)}${Date.now()}`;
}

class QueryCondition {
  constructor(
    private type: "eq" | "in",
    private column: string,
    private value: unknown,
  ) {}

  matches(row: TableRow) {
    const actual = row[this.column];
    if (this.type === "eq") return actual === this.value;
    if (this.type === "in") {
      if (!Array.isArray(this.value)) return false;
      return (this.value as unknown[]).includes(actual);
    }
    return false;
  }
}

class QueryBuilder {
  private conditions: QueryCondition[] = [];
  private orderClause: { column: string; ascending: boolean } | null = null;
  private payload: TableRow[] | TableRow | null = null;
  private selectSpec: { all: boolean; columns: string[]; relations: RelationSpec[] } = {
    all: false,
    columns: [],
    relations: [],
  };
  private opts: SelectOptions | null = null;
  private action: "select" | "insert" | "update" | "delete" | "upsert" = "select";
  private upsertOptions: UpsertOptions | null = null;

  constructor(private table: TableName) {}

  select(columns: string = "*", opts?: SelectOptions) {
    this.action = "select";
    this.opts = opts || null;
    const trimmed = columns.trim();
    if (trimmed === "*" || trimmed === "*") {
      this.selectSpec.all = true;
      return this;
    }

    const parts = trimmed
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);

    for (const part of parts) {
      const relationMatch = part.match(/^(\w+)\(([^)]+)\)$/);
      if (relationMatch) {
        const alias = relationMatch[1];
        const inner = relationMatch[2];
        const config = RELATION_META[alias] ?? { table: alias as TableName, fk: `${alias}_id` };
        const relation: RelationSpec = {
          alias,
          table: config.table,
          fk: config.fk,
          columns: inner.split(",").map((field) => field.trim()),
        };
        this.selectSpec.relations.push(relation);
      } else {
        this.selectSpec.columns.push(part);
      }
    }
    return this;
  }

  insert(payload: TableRow | TableRow[]) {
    this.action = "insert";
    this.payload = payload;
    return this;
  }

  update(payload: TableRow) {
    this.action = "update";
    this.payload = payload;
    return this;
  }

  delete() {
    this.action = "delete";
    return this;
  }

  upsert(payload: TableRow | TableRow[], options: UpsertOptions) {
    this.action = "upsert";
    this.payload = payload;
    this.upsertOptions = options;
    return this;
  }

  eq(column: string, value: unknown) {
    this.conditions.push(new QueryCondition("eq", column, value));
    return this;
  }

  in(column: string, values: unknown[]) {
    this.conditions.push(new QueryCondition("in", column, values));
    return this;
  }

  order(column: string, options?: { ascending?: boolean }) {
    this.orderClause = { column, ascending: options?.ascending ?? true };
    return this;
  }

  maybeSingle() {
    return this.execute(true);
  }

  single() {
    return this.execute(true, true);
  }

  then<TResult1 = QueryResult, TResult2 = never>(
    onfulfilled?: ((value: QueryResult) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | undefined | null,
  ) {
    return this.execute().then(onfulfilled, onrejected);
  }

  private applySelection(row: TableRow): TableRow {
    if (this.selectSpec.all || this.selectSpec.columns.length === 0) {
      const out: TableRow = { ...row };
      for (const relation of this.selectSpec.relations)
        out[relation.alias] = this.buildRelation(row, relation);
      return out;
    }

    const picked: TableRow = {};
    for (const column of this.selectSpec.columns) picked[column] = row[column];
    for (const relation of this.selectSpec.relations)
      picked[relation.alias] = this.buildRelation(row, relation);
    return picked;
  }

  private buildRelation(row: TableRow, relation: RelationSpec): unknown {
    const foreignKeyValue = row[relation.fk] ?? row[relation.fk.replace("_id", "_id")];
    const relatedRows = loadTable(relation.table);
    const related = relatedRows.find((item) => getIdValue(item) === foreignKeyValue);
    if (!related) return null;

    const selected: TableRow = {};
    for (const column of relation.columns) {
      if (column === "age" && relation.table === "students") {
        selected.age = computeAge(related.birth_date as string | null);
      } else if (Object.prototype.hasOwnProperty.call(related, column)) {
        selected[column] = (related as TableRow)[column];
      } else {
        selected[column] = null;
      }
    }
    return selected;
  }

  private sortedRows(items: TableRow[]) {
    if (!this.orderClause) return items;
    const { column, ascending } = this.orderClause;
    return [...items].sort((a, b) => {
      const left = normalizeSortValue(a[column]);
      const right = normalizeSortValue(b[column]);
      if (left === right) return 0;
      return ascending
        ? String(left).localeCompare(String(right), undefined, { numeric: true })
        : String(right).localeCompare(String(left), undefined, { numeric: true });
    });
  }

  private async execute(singleRow = false, strictSingle = false): Promise<QueryResult> {
    const tableRows = loadTable(this.table);
    let matched = buildQuery(tableRows, this.conditions);

    if (this.action === "insert") {
      const items = ensureArray(this.payload as TableRow | TableRow[]).map((item) => {
        const row: TableRow = {
          ...item,
          id: (item as TableRow).id ?? generateId(),
          created_at: (item as TableRow).created_at ?? new Date().toISOString(),
          updated_at: (item as TableRow).updated_at ?? new Date().toISOString(),
        };
        return row;
      });
      saveTable(this.table, [...tableRows, ...items]);
      matched = items;
    }

    if (this.action === "update") {
      const values = this.payload as TableRow;
      const updated: TableRow[] = [];
      const persisted = tableRows.map((row) => {
        if (matched.includes(row)) {
          const next = { ...row, ...values, updated_at: new Date().toISOString() };
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
      const rows = ensureArray(this.payload as TableRow | TableRow[]);
      const options = this.upsertOptions;
      const conflictKeys = options?.onConflict.split(",").map((key) => key.trim()) ?? [];
      const persistedRows = [...tableRows];
      const results: TableRow[] = [];

      for (const incoming of rows) {
        const foundIndex = conflictKeys.length
          ? persistedRows.findIndex((row) =>
              conflictKeys.every((key) => row[key] === incoming[key]),
            )
          : -1;
        if (foundIndex !== -1) {
          persistedRows[foundIndex] = {
            ...persistedRows[foundIndex],
            ...incoming,
            updated_at: new Date().toISOString(),
          };
          results.push(persistedRows[foundIndex]);
        } else {
          const inserted = {
            ...incoming,
            id: (incoming as TableRow).id ?? generateId(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
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
          error: { message: count === 0 ? "No rows returned" : "Multiple rows returned" },
        };
      }
      return { data: count === 0 ? null : selectedRows[0], error: null, count };
    }

    return { data: selectedRows, error: null, count };
  }
}

function computeAge(birthDate: string | null): number | null {
  if (!birthDate) return null;
  const birthday = new Date(birthDate);
  if (Number.isNaN(birthday.getTime())) return null;
  return new Date().getFullYear() - birthday.getFullYear();
}

function ensureInitialized() {
  if (initializationDone) return;
  if (isBrowser()) {
    (Object.keys(SEEDS) as TableName[]).forEach((table) => loadTable(table));
  }
  initializationDone = true;
}

function getUserByEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  const profiles = loadTable("profiles");
  return profiles.find((profile) => {
    const profileEmail = profile.email as string | undefined;
    return profileEmail?.trim().toLowerCase() === normalized;
  }) as TableRow | undefined;
}

function createSession(user: AuthUser) {
  const session: Session = { user, expires_at: null };
  persistSession(session);
  return session;
}

function normalizeProfile(profile: TableRow): AuthUser {
  return {
    id: String(profile.id),
    email: profile.email as string | null,
    full_name: profile.full_name as string | null,
  };
}

const supabaseLike = {
  from: (table: TableName) => new QueryBuilder(table),
  auth: {
    signInWithPassword: async ({ email }: { email: string; password: string }) => {
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
      options,
    }: {
      email: string;
      password: string;
      options?: { emailRedirectTo?: string; data?: { full_name?: string } };
    }) => {
      ensureInitialized();
      if (!email) return { data: null, error: { message: "Email requis" } };
      if (getUserByEmail(email))
        return { data: null, error: { message: "L'adresse e-mail existe déjà" } };

      const id = generateId();
      const profile: TableRow = {
        id,
        email,
        full_name: options?.data?.full_name ?? null,
        created_at: new Date().toISOString(),
      };
      const profiles = loadTable("profiles");
      profiles.push(profile);
      saveTable("profiles", profiles);

      const roles = loadTable("user_roles");
      roles.push({
        id: generateId(),
        user_id: id,
        role: "secretary",
        created_at: new Date().toISOString(),
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
    onAuthStateChange: (callback: AuthStateChangeCallback) => {
      ensureInitialized();
      authSubscribers.add(callback);
      return { subscription: { unsubscribe: () => authSubscribers.delete(callback) } };
    },
  },
  functions: {
    invoke: async (name: string, options: { body: AdminUsersPayload }) => {
      ensureInitialized();
      if (name !== "admin-users") return { data: null, error: { message: "Fonction non trouvée" } };

      const { body } = options;

      if (body.action === "create") {
        if (!body.email) return { data: { error: "Email requis" }, error: null };
        if (getUserByEmail(body.email))
          return { data: { error: "L'utilisateur existe déjà" }, error: null };

        const id = generateId();
        const profile: TableRow = {
          id,
          email: body.email,
          full_name: body.full_name ?? null,
          created_at: new Date().toISOString(),
        };
        const profiles = loadTable("profiles");
        profiles.push(profile);
        saveTable("profiles", profiles);

        const roles = loadTable("user_roles");
        roles.push({
          id: generateId(),
          user_id: id,
          role: body.role ?? "secretary",
          created_at: new Date().toISOString(),
        });
        saveTable("user_roles", roles);

        return { data: { id }, error: null };
      }

      if (body.action === "set_role") {
        if (!body.user_id || !body.role)
          return { data: { error: "Données manquantes" }, error: null };

        const roles = loadTable("user_roles");
        const index = roles.findIndex((role) => (role as TableRow).user_id === body.user_id);

        if (index !== -1) {
          roles[index] = {
            ...roles[index],
            role: body.role,
            updated_at: new Date().toISOString(),
          };
        } else {
          roles.push({
            id: generateId(),
            user_id: body.user_id,
            role: body.role,
            created_at: new Date().toISOString(),
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
          profiles.filter((profile) => String(profile.id) !== body.user_id),
        );

        const roles = loadTable("user_roles");
        saveTable(
          "user_roles",
          roles.filter((role) => (role as TableRow).user_id !== body.user_id),
        );

        return { data: { success: true }, error: null };
      }

      return { data: { error: "Action inconnue" }, error: null };
    },
  },
};

export const supabase = supabaseLike;
