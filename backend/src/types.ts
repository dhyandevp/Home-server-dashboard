export type Role = 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: Role;
}

export interface PluginDefinition {
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  source: string;
}
