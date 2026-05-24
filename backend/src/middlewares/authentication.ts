import { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { getCookie } from "hono/cookie";

export const authenticationMiddleware=async (c:Context,next:Next)=>{
       const token=getCookie(c,"token");
       if(!token){
        return c.json({
            success:false,
            message:"Tampered token",
            data:null,
            err:null
        })
       }
       const decodedToken=await verify(token,c.env.JWT_SECRET,"HS256");
       if(!decodedToken){
           return c.json({
            success:false,
            message:"Invalid/expired token",
            data:null,
            err:null
        })
       }
    c.set("userId",decodedToken.userId)
    await next();
}