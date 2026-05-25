import { Route } from "react-router";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";

export const AuthRoutes = [
  <Route key="signin" path="/signin" element={<Signin/>}/>,
  <Route key="signup" path="/signup" element={<Signup/>}/>,
]