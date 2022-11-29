import app from "./app";
import { createUser } from "./endpoints.ts/createUser";
import { getAllUsers } from "./endpoints.ts/getAllUsers";

app.post("/users", createUser)
app.get("/users", getAllUsers)