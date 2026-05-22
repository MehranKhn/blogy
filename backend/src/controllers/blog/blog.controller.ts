import { Context } from "hono"

export const createBlog= (c:Context)=>{
   return c.text("createBlog")
}
export const editBlog= (c:Context)=>{
   return c.text("editBlog")
}
export const getBlog= (c:Context)=>{
   return c.text("getBlog")
}