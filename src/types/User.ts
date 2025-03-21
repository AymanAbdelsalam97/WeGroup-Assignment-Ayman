const role = {
  Admin: "Admin",
  User: "User",
} as const;

export type TRole = (typeof role)[keyof typeof role];

export type TUser = {
  id: number;
  name: string;
  email: string;
  role: TRole;
};
