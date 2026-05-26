import Auth from "../components/auth/Auth";
import SignupRight from "../components/auth/signupRight";

export default function Signin(){
    return <div className="flex">
            <Auth type={"signin"} />
            <div className="hidden flex-1 md:flex">
              <SignupRight />
            </div>
        </div>
}