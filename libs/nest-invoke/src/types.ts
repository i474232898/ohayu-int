export type AllowedMethods = 'update' | 'delete' | 'create';
export type ExecMessage = {
  providerToken: string; // e.g. "UserRepository"
  method: AllowedMethods; // method name to call
  args: any[]; // forwarded to the method
  id?: string; // optional message id
  metadata?: any; // optional metadata
};
