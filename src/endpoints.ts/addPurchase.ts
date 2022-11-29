import { Request, Response } from "express";
import { connection } from "../data/connection";

export const addPurchase = async (req: Request, res: Response): Promise<void> => {
    const {user_id, product_id, quantity} = req.body
    let errorCode = 400

    try {
        if (!user_id) {
            errorCode = 422
            throw new Error("ID de usuário não informado.");
        }

        const getUser = await connection("labecommerce_users")
        .where('id', user_id)

        if (getUser.length < 0) {
            errorCode = 422
            throw new Error("ID de usuário não encontrado.");
        }

        if (!product_id) {
            errorCode = 422
            throw new Error("ID de produto não informado.");
        }

        const getProduct = await connection("labecommerce_products")
        .where('id', product_id)

        if (getProduct.length < 0) {
            errorCode = 422
            throw new Error("ID de produto não encontrado.");
        }

        if (isNaN(quantity) || quantity <= 0) {
            errorCode = 422
            throw new Error("Quantidade precisa ser um número maior que 0.");
        }

        const getPrice = await connection("labecommerce_products")
        .select("price")
        .where('id', product_id)
        
        const price = JSON.parse(JSON.stringify(getPrice))

        const totalPrice = price[0].price * quantity

        const newPurchase = {
            id: Date.now().toString(),
            user_id,
            product_id,
            quantity,
            total_price: totalPrice
        }

        await connection("labecommerce_purchases")
        .insert(newPurchase)

        res.status(201).send("Compra inserida.")

    } catch (error:any) {
        res.status(errorCode).send(error.message)
    }
} 