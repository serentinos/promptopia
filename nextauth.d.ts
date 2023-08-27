import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface IUser extends DefaultUser {
    id?: string
  }

  interface User extends IUser {}

  interface Session extends DefaultSession {
    user?: User
  };
}