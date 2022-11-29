import app from "./app";
import { createProduct } from "./endpoints.ts/createProduct";
import { createUser } from "./endpoints.ts/createUser";
import { getAllUsers } from "./endpoints.ts/getAllUsers";

app.post("/users", createUser)
app.get("/users", getAllUsers)
app.post("/products", createProduct)