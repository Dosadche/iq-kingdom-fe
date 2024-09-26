export interface RegisterCredentials {
  name?: string;
  email?: string;
  password?: string;
}

export interface LoginCredentials extends Omit<RegisterCredentials, 'name'> {}
