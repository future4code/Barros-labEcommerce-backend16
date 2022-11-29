import { Request, Response } from "express";
import { connection } from "../data/connection";

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {

        const result = await connection("labecommerce_users")
        res.status(200).send(result)

    } catch (error: any) {
        res.status(500).send(error.message)
    }
}