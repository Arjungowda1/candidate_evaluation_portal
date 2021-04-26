import { Role } from "./role";

export class User {
  userId: number;
  email: string="";
  password: string="";
  firstName: string="";
  lastName: string="";
  token: string="";
  roles: Role;
}