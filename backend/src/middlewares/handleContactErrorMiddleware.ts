import { Request, Response, NextFunction } from "express";
import { IContact } from "../interfaces/contact";
import * as yup from "yup";
import { SchemaOf } from "yup";

export const handleContactError: SchemaOf<IContact> = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  clientId: yup.string(),
  user: yup.string(),
});

export const validateContactCreate =
  (schema: SchemaOf<IContact>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.newContact = validatedData;

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
