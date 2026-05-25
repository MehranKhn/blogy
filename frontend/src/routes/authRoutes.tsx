import { Route } from "react-router";
import Signup from "../pages/signup";
import Signin from "../pages/signin";

export const AuthRoutes = [
  <Route key="signin" path="/signin" element={<Signin/>}/>,
  <Route key="signup" path="/signup" element={<Signup/>}/>,
]