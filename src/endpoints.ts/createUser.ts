import { Request, Response } from "express";
import { connection } from "../data/connection";
import { user } from "../types";

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const {name, email, password} = req.body
    let errorCode = 400

    try {

        if (!name) {
            errorCode = 422
            throw new Error("Insira o nome do usuário.");
        }

        if (!email) {
            errorCode = 422
            throw new Error("Insira o e-mail do usuário.");
        }

        const searchEmail = await connection("labecommerce_users").where({email})
        
        if (searchEmail.length > 0) {
            errorCode = 409
            throw new Error("E-mail já cadastrado.");
        }

        if (!password) {
            errorCode = 422
            throw new Error("Insira a senha do usuário.");
        }

        const newUser: user = {
            id: Date.now().toString(),
            name,
            email,
            password
        }

        await connection("labecommerce_users")
        .insert(newUser)

        res.status(201).send("Novo usuário inserido.")
        
    } catch (error:any) {
        res.status(errorCode).send(error.message)        
    }
}