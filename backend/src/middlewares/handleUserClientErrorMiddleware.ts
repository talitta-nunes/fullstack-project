import { Request, Response, NextFunction } from "express";
import { IClientRequest } from "../interfaces/client";
import * as yup from "yup";
import { SchemaOf } from "yup";

export const handleClientError: SchemaOf<IClientRequest> = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  user: yup.string(),
});

export const validateClientCreate =
  (schema: SchemaOf<IClientRequest>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.newClient = validatedData;

        next();
      } catch (err: any) {
        return res.status(400).json({
          status: "error",
          error: err.errors?.join(", "),
        });
      }
    } catch (err) {
      next(err);
    }
  };
