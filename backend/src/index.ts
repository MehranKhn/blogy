import { Hono } from "hono";
import {authRouter,blogRouter} from "./routes"

const app= new Hono()
 
app.route("/api/v1/auth",authRouter)
app.route("/api/v1",blogRouter)


export default app;