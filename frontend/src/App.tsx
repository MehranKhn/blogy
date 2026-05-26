import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routes";
import { Toaster } from "sonner";

export default function App(){
  return (
    <BrowserRouter>
      <Toaster closeButton richColors position="top-right"/>
      <AppRoutes/>
    </BrowserRouter>
  )
}