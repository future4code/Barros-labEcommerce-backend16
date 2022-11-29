import app from "./app";
import { createUser } from "./endpoints.ts/createUser";

app.post("/users", createUser)