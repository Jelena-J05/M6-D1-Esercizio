import { Router } from "express"
import Author from "./models/authors.js"
import Blog from "./models/blogPosts.js"
import cloudinaryUploader from "./config/index.js"
import { JWTAuthMiddleware } from "./auth/middlewares.js"

export const authorRouter = Router()

authorRouter
    .get("/", JWTAuthMiddleware, async (req, res, next) => {
        try {
            let authors = await Author.find()
            res.send(authors)
        } catch (error) {
            next(error)
        }
    })

    .get("/:id", JWTAuthMiddleware, async (req, res, next) => {
        try {
            let author = await Author.findById(req.params.id)
            res.send(author)
        } catch (error) {
            next(error)
        }
    })

    .get("/:id/blogs", JWTAuthMiddleware, async (req, res, next) => {
        try {
            let author = await Blog.find({
                author: req.params.id,
            }).populate({
                path: "author",
                select: ["name", "lastName", "avatar"],
            })
            res.send(author)
        } catch (error) {
            next(error)
        }
    })

    .post("/", async (req, res, next) => {
        try {
            let author = await Author.create(req.body)
            res.send(author)
        } catch (error) {
            next(error)
        }
    })
    .put("/:id", JWTAuthMiddleware, async (req, res, next) => {
        try {
            let author = await Author.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                }
            )
            res.send(author)
        } catch (error) {
            next(error)
        }
    })

    .patch("/:id/avatar", cloudinaryUploader, async (req, res, next) => {
        try {
            console.log(req.file)
            let updated = await Author.findByIdAndUpdate(
                req.params.id,
                { avatar: req.file.path },
                { new: true }
            )
            res.send(updated)
        } catch (error) {
            next(error)
        }
    })

    .delete("/:id", async (req, res, next) => {
        try {
            await Author.deleteOne({
                _id: req.params.id,
            })
            res.send(204)
        } catch (error) {
            next(error)
        }
    })
