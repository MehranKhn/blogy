import { Context } from "hono";
import { signupSchema } from "./auth.schema";
import z from "zod";
import { getPrisma } from "../../config/prismaClient";
import { Prisma } from "../../generated/prisma/client";

export const signup = async (c: Context) => {
  const body = await c.req.json();

  const parsed = signupSchema.safeParse(body);

  if (!parsed.success) {
    return c.json(
      {
        success: false,
        error: z.treeifyError(parsed.error),
      },
      400
    );
  }

  try {
    const prisma = getPrisma(c);

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
        bio: body.bio,
      },
    });

    return c.json(
      {
        success: true,
        message: "User created successfully",
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

export const signIn=(c:Context)=>{
   return c.json({
    message:"heloo"
   },200)
}

export const me=(c:Context)=>{
    return c.json({
    message:"heloo"
   },200)
}