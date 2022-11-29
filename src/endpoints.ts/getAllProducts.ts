import { Request, Response } from "express";
import { connection } from "../data/connection";

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {

        const result = await connection("labecommerce_products")
        res.status(200).send(result)

    } catch (error: any) {
        res.status(500).send(error.message)
    }
}