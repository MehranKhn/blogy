import { Hono } from "hono";
import { signup,signIn,me } from "../controllers/auth/auth.controller";

const authRouter=new Hono();

authRouter.post("/signup",signup);
authRouter.post("/signin",signIn);
authRouter.get("/me",me)

export default authRouter;