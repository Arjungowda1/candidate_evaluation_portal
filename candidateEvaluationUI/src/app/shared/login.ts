import {Role} from './role';
export class Login {
  userId: number;
  email: string="";
  password: string="";
  firstName: string="";
  lastName: string="";
  role: Role;
  token: string="";
}