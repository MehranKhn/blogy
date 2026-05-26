import { Hono } from "hono";
import {authRouter,blogRouter} from "./routes"
import { cors } from "hono/cors";

const app= new Hono()

app.use("*", cors({
  origin: ["http://localhost:5173", "https://yourfrontend.com"],
  allowMethods: ["GET", "POST", "PUT", "DELETE"],
  allowHeaders: ["Content-Type", "Authorization"],
  credentials: true, 
}))

app.route("/api/v1/auth",authRouter)
app.route("/api/v1/blog",blogRouter)


export default app; 