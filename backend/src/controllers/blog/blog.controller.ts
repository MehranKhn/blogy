import { Context } from "hono"
import { getPrisma } from "../../config/prismaClient"

export const createBlog= async (c:Context)=>{
   const body=await c.req.json();
   try{
      const prisma=getPrisma(c);
      const userId=c.get("userId");
      await prisma.post.create({
         data:{
            title:body.title,
            content:body.content,
            authorId:userId
         }
      })
      return c.json({
         success:true,
         message:"Successfully uploaded the blog",
         data:null,
         error:null
      },201);
   }
   catch(err){
        return c.json({
         success:false,
         message:"Something went wrong",
         data:null,
         error:err
      },500);
   }
}

export const editBlog= async (c:Context)=>{
   const body=await c.req.json();

    if (!body.id) {
      return c.json(
        {
          success: false,
          message: "Blog id is required",
          data: null,
          error: null,
        },
        400
      );
    }

    if(!body.title && !body.content){
       return c.json(
        {
          success: false,
          message: "fields to be updated required",
          data: null,
          error: null,
        },
        400
      );
    }

   try{
      const prisma=getPrisma(c);
      await prisma.post.update({
         where:{
           id:body.id
         },
         data:{
            ...(body.title && {title:body.title}),
            ...(body.content && {content:body.content}),
         }
      })
      return c.json({
         success:true,
         message:"Successfully uploaded the blog",
         data:null,
         error:null
      },200);
   }
   catch(err){
        return c.json({
         success:false,
         message:"Something went wrong",
         data:null,
         error:err
      },500);
   }
}

export const getBlog= async(c:Context)=>{
   const id=c.req.param("id");

   if (!id) {
      return c.json(
         {
            success: false,
            message: "Id is required",
         },
         400
      );
   }

   try{
      const prisma=getPrisma(c);
      const blog=await prisma.post.findUnique({
         where:{
            id
         }
      })
      if(!blog){
         return c.json({
            success:false,
            message:"No blog found",
            data:null,
            error:null
         },404)
      }
      return c.json({
            success:true,
            message:"successfully fetched the blog",
            data:blog,
            error:null
      },200)
   }
   catch(err){
      return c.json({
            success:false,
            message:"Something went wrong",
            data:null,
            error:null
      },500)
   }
}

export const getBlogsBulk=async(c:Context)=>{
    try{
      const prisma=getPrisma(c);
       const blogs=await prisma.post.findMany();
       return c.json({
         success:true,
         message:"Successfully fetched blogs",
         data:blogs,
         error:null
       })
    }
    catch(err){
       return c.json({
         success:false,
         message:"Something went wrong",
         data:null,
         error:null
       })
    }
}