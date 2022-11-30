import { Request, Response } from "express";
import { connection } from "../data/connection";

export const getPurchasesByUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.user_id as string
    let errorCode = 422

    try {

        if (!userId) {
            errorCode = 422
            throw new Error("ID de usuário não informado.");
        }

        const getUser = await connection("labecommerce_users")
        .where('id', userId)

        if (getUser.length < 0) {
            errorCode = 422
            throw new Error("ID de usuário não encontrado.");
        }

        const result = await connection.select("labecommerce_users.name as userName", "labecommerce_products.name as productName", "quantity", "total_price as totalPrice")
        .from("labecommerce_purchases")
        .join("labecommerce_users", 'user_id', '=', 'labecommerce_users.id')
        .join('labecommerce_products', 'product_id', '=', 'labecommerce_products.id')
        .where('user_id', userId)
  
        res.status(200).send(result)

    } catch (error: any) {
        res.status(500).send(error.message)
    }
}