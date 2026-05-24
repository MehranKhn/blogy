import { Hono } from "hono";
import { createBlog,editBlog,getBlog,getBlogsBulk } from "../controllers/blog/blog.controller";
import { authenticationMiddleware } from "../middlewares/authentication";
const blogRouter= new Hono();

blogRouter.use("/*",authenticationMiddleware);

blogRouter.post("/create",createBlog)
blogRouter.put("/",editBlog)
blogRouter.get("/bulk",getBlogsBulk)
blogRouter.get("/:id",getBlog)

export default blogRouter;