import { Routes } from "react-router"
import { AuthRoutes } from "./authRoutes"
import { BlogRoutes } from "./blogRoutes"

export const AppRoutes=()=>(
     <>
      <Routes>
         {AuthRoutes}
         {BlogRoutes}
      </Routes>
    </>
)
