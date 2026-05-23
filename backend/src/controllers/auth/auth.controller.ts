import { Context } from "hono";
import { signinSchema, signupSchema } from "./auth.schema";
import z from "zod";
import { getPrisma } from "../../config/prismaClient";
import { Prisma } from "../../generated/prisma/client";
import { sign } from "hono/jwt";
import { setCookie } from "hono/cookie";
import bcrypt from "bcryptjs";


export const signup = async (c: Context) => {
  const body = await c.req.json();

  const parsed = signupSchema.safeParse(body);

  if (!parsed.success) {
    return c.json(
      {
        success: false,
        message:"Invalid inputs",
        data:null,
        error: z.treeifyError(parsed.error),
      },
      400
    );
  }

  try {
    const prisma = getPrisma(c);
    const hashedPassword=await bcrypt.hash(parsed.data.password,10);

    const user = await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        password: hashedPassword
      },
      select:{
        name:true,
        email:true,
        id:true
      }
    });

    const token=await sign({
        userId:user.id,
        name:user.name,
        exp:Math.floor(Date.now()/1000)+ 60*60
    },c.env.JWT_SECRET,"HS256");
    
    setCookie(c,"token",token,{
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 60 * 60,
    });
     
    return c.json(
      {
        success: true,
        message: "User created successfully",
        data:user,
        err:null
      },
      201
    );

  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return c.json(
        {
          success: false,
          message: "User already exists",
          data:null,
          error:null
        },
        400
      );
    }

    console.error(err);

    return c.json(
      {
        success: false,
        message: "Internal server error",
      },
      500
    );
  }
};

export const signIn=async (c:Context)=>{
   const body=await c.req.json();
   const parsed=signinSchema.safeParse(body);

   if(!parsed.success){
       return c.json(
        {
            success: false,
            message:"Invalid inputs",
            data:null,
            error: z.treeifyError(parsed.error),
        },
        400
        );
   }

   try{
     const prisma=getPrisma(c);

     const user=await prisma.user.findUnique({
        where:{
            email:parsed.data.email
        }
     })

     if(!user){
        return c.json({
            success:false,
            message:"User doesn't exist, please signup",
            data:null,
            error:null
        },400)
     }
     const isPassword=await bcrypt.compare(parsed.data.password,user.password);

     if(!isPassword){
         return c.json({
            success:false,
            message:"Invalid Credentials",
            data:null,
            error:null
        },400)
     }

     const token=await sign({
        userId:user.id,
        name:user.name,
        exp:Math.floor(Date.now()/1000)+ 60*60
    },c.env.JWT_SECRET,"HS256");
    
    setCookie(c,"token",token,{
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 60 * 60,
    });
     
     return c.json({
        success:true,
        message:"successfully signed In",
        data:{
            name:user.name,
            email:user.email,
            id:user.id,
            bio:user?.bio
        },
        error:null
     })
   }
   catch(err){
    console.log(err);
    return c.json({
        success:false,
        message:"Internal Server Error",
        data:null,
        error:err
     })
   }

}

export const me= async(c:Context)=>{
    const prisma=getPrisma(c);
    const userId=c.get("userId");

    const user=await prisma.user.findFirst({
        where:{
            id:userId
        },
        select:{
            name:true,
            email:true,
            bio:true,
            id:true
        }
    });

    if(!user){
      return c.json({
        success:false,
        message:"User doesn't exist",
        data:null,
        error:null
      })
    }

    return c.json({
      success:true,
      message:"user authenticated",
      data:user,
      error:null
   },200)
}