export interface User {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  password?: string;
  passwordHash?: string;
  roles: string[];
}
