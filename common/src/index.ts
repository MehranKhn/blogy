import z from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(30, "Too long name"),

  email: z.email("Invalid email"),

  password: z
    .string()
    .min(6, "Password too short")
    .max(30, "Password too long"),
    
});

export const signinSchema=z.object({
  email:z.email("Invalid Email"),
  password:z
    .string()
    .min(6, "Password too short")
    .max(30, "Password too long"),
})   

export const createBlogSchema=z.object({
    title:z.string().min(3,"Title too short").max(300,"Title too long"),
    content:z.string().max(2000,"Content length too long")
});

export const editBlogSchema=z.object({
    title:z.string().optional(),
    content:z.string().optional()
}).refine((data)=>!!data.title || !!data.content,{
    message:"At least one field is required"
})

export type SigninType=z.infer<typeof signinSchema>;
export type SignupType=z.infer<typeof signupSchema>;
export type CreateBlogType=z.infer<typeof createBlogSchema>;
export type EditBlogType=z.infer<typeof editBlogSchema>;