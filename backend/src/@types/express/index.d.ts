import * as express from "express";
import { IClientRequest } from "../../interfaces/client";
import { IContactRequest } from "../../interfaces/contact";
import { IUserLogin, IUserRequest } from "../../interfaces/user";

declare global {
  namespace Express {
    interface Request {
      newLogin: IUserLogin;
      newClient: IClientRequest;
      newContact: IContact;
      newUser: IUserRequest;
      user: {
        id: string;
      };
      clientId: {
        id: string;
      };
    }
  }
}
