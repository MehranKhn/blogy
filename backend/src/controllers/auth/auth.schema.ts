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

  bio:z.string().max(100,"Bio too long"),
    
});

export type SignupType=z.infer<typeof signupSchema>