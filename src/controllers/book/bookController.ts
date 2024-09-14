import { NextFunction, Request, Response } from "express"
import { Book, PrismaClient } from "@prisma/client"
import { ErrorHandler } from "@errors"

const client = new PrismaClient

export class BookController {
    static async GetBookAll(req: Request, res: Response, next: NextFunction){
        try {
        let book: Partial<Book>[] = await client.book.findMany()
        res.status(200).send({
            success: true,
            data: book
        })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async CreateBook(req: Request, res: Response, next: NextFunction){
        try {
            let {title, published, author_id } = req.body
            let book: Book = await client.book.create({data: {
                title,
                published,
                author_id
            }})
            res.status(200).send({
                success: true,
                message: "Created Book",
                data: book
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async UpdateBook(req: Request, res: Response, next: NextFunction){
        try {
            let {id, title, published, author_id }: Partial<Book> = req.body
            let book: Book = await client.book.update({data: {
                title,
                published,
                author_id
            }, where: {
                id
            }})
            res.status(200).send({
                success: true,
                message: "Updated Book",
                data: book
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async DeleteBook(req: Request, res: Response, next: NextFunction){
        try {
            let { id } = req.params
            let book: Book = await client.book.delete({where: {
                id: Number(id)
            },
        })
            res.status(200).send({
                success: true,
                message: "Deleted Book",
                data: book
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }
}

