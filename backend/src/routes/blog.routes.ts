import { Hono } from "hono";
import { createBlog,editBlog,getBlog } from "../controllers/blog/blog.controller";
const blogRouter= new Hono();

blogRouter.post("/blog",createBlog)
blogRouter.put("/blog/:id",editBlog)
blogRouter.get("/blog/:id",getBlog)

export default blogRouter;