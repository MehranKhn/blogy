import { Hono } from "hono";
import { createBlog,editBlog,getBlog } from "../controllers/blog/blog.controller";
const blogRouter= new Hono();

blogRouter.post("/",createBlog)
blogRouter.put("/",editBlog)
blogRouter.get("/:id",getBlog)
blogRouter.get("/bulk",)
export default blogRouter;