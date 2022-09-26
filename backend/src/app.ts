import "reflect-metadata";
import "express-async-errors";
import express from "express";
import "dotenv/config";
import userRouter from "./routes/user.routes";
import loginRouter from "./routes/login.routes";
import clientRouter from "./routes/client.routes";
import contactRouter from "./routes/contact.routes";
import handleAppErrorMiddleware from "./middlewares/handleAppErrorMiddleWare";

var cors = require("cors");
const app = express();
app.use(cors());

app.use(express.json());

app.use("/clients", clientRouter);
app.use("/users", userRouter);
app.use("/contacts", contactRouter);
app.use("/login", loginRouter);

app.use(handleAppErrorMiddleware);

export default app;
