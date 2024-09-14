import { NextFunction, Request, Response } from "express";
import { Author, Book, PrismaClient } from "@prisma/client"
import { ErrorHandler } from "@errors";

let client = new PrismaClient

 export class AuthorController{
    static async GetAllAuthor(req: Request, res: Response, next: NextFunction){
       try {
        let author: Partial<Author>[] = await client.author.findMany()
        res.status(200).send({
          success: true,
          data: author
        })
       } catch (error: any) {
        next(new ErrorHandler(error.message, error.status))
       }
    }

    static async CreateAuthor(req: Request, res: Response, next: NextFunction){
        try {
            let { fullName } = req.body
            let newAuthor: Author = await client.author.create({data:{fullName}})
            res.status(200).send({
                success: true,
                message: "Created author",
                data: newAuthor
              })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async UpdateAuthor(req: Request, res: Response, next: NextFunction){
        try {
            let { id, fullName } = req.body
            let author: Author = await client.author.update({data: {
            fullName
        }, where: {
            id
        }})
        res.status(200).send({
            success: true,
            message: "Updated author",
            data: author
          })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async DeleteAuthor(req: Request, res: Response, next: NextFunction){
        try {
            let { id } = req.params
            let author: Author = await client.author.delete({ 
            where: {
                id: Number(id)
            }})
            res.status(200).send({
                success: true,
                message: "Deleted author",
                data: author
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }
}