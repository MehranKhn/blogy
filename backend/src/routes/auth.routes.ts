import { Hono } from "hono";
import { signup,signIn,me } from "../controllers/auth/auth.controller";
import { authenticationMiddleware } from "../middlewares/authentication";

const authRouter=new Hono();

authRouter.post("/signup",signup);
authRouter.post("/signin",signIn);
authRouter.get("/me",authenticationMiddleware,me)

export default authRouter;