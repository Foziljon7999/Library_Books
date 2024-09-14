import { AuthorController } from "@controllers/author"
import { BookController } from "@controllers/book"
import { Router } from "express"

let router: Router = Router()

// Author
router.get("/author/all", AuthorController.GetAllAuthor)
router.post("/author/create", AuthorController.CreateAuthor)
router.patch("/author/update", AuthorController.UpdateAuthor)
router.delete("/author/delete/:id", AuthorController.DeleteAuthor)

// Books
router.get("/book/all", BookController.GetBookAll)
router.post("/book/create", BookController.CreateBook)
router.patch("/book/update", BookController.UpdateBook)
router.delete("/book/delete/:id", BookController.DeleteBook)

export default router