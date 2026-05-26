import Auth from "../components/auth/Auth"
import SignupRight from "../components/auth/signupRight"

export default function Signup(){
    return <div className="flex">
        <Auth type={"signup"} />
        <div className="hidden flex-1 md:flex">
          <SignupRight />
        </div>
    </div>
}   
