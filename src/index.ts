import app from "./app";
import { addPurchase } from "./endpoints.ts/addPurchase";
import { createProduct } from "./endpoints.ts/createProduct";
import { createUser } from "./endpoints.ts/createUser";
import { getAllProducts } from "./endpoints.ts/getAllProducts";
import { getAllUsers } from "./endpoints.ts/getAllUsers";

app.post("/users", createUser)
app.get("/users", getAllUsers)
app.post("/products", createProduct)
app.get("/products", getAllProducts)
app.post("/purchases", addPurchase)