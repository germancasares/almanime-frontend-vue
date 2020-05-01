export interface Login {
  identifier: string;
  password: string;
}

export interface Register {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
