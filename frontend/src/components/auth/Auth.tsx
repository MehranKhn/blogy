import { useState } from "react"
import type { SignupType } from "@mjk_2002/common"
import { Link } from "react-router"

export default function Auth({type}:{type:"signup"|"signin"}){

    const [inputs,setInputs]=useState<SignupType>({
        name:"",
        email:"",
        password:""
    })

    const [errors,setErrors]=useState<Record<string,string>>({
        name:"",
        email:"",
        password:""
    })

    function handleInputChange(key:string,value:string){
       setInputs((prev)=>({
         ...prev,
          [key]:value
       }))

       setErrors(prev => ({ ...prev, [key]: "" }))
    }

  function validate(): boolean {
    const newErrors: Partial<SignupType> = {}

    if (type === "signup" && !inputs.name.trim()) {
      newErrors.name = "name is required"
    }
    if (!inputs.email.trim()) {
      newErrors.email = "Email is required"
    }
    if (!inputs.password.trim()) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0  // true = valid
  }
    
    function submitInput(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    console.log("submit", inputs)
    // call your API here
  }

    return <div className="flex flex-1 justify-center items-center min-h-screen">
        <div className="w-full max-w-sm md:max-w-md space-y-2">

            <h1 className="text-4xl md:text-5xl font-bold text-center mb-3">{type==="signin"?"Log in to your account":"Create an Account"}</h1>
            <div className="flex justify-center gap-1">
                <span className="text-md text-center">{type==="signin"?"Don't have an account":"Already have an account?"}</span>
                <Link
                to={type === "signin" ? "/signup" : "/signin"}
                className="underline hover:text-blue-500 text-gray-800"
                >
                {type === "signin" ? "Sign up" : "Login"}
                </Link>
            </div>

            <form className="space-y-2 px-4" onSubmit={submitInput}>
               {type==="signup" && <div className="px-1 py-1">
                    <label htmlFor="name" className="font-medium">Name</label><br />
                    <input type="text" placeholder="Enter your name" id="name" className="px-2 py-2 outline-none border border-gray-200 w-full mt-2 rounded-md" onChange={(e)=>handleInputChange("name",e.target.value)}/>
                    {errors.name && <p className="text-red-600">{errors.name}</p>}
                </div>}
                <div className="px-1 py-1">
                    <label htmlFor="email" className="font-medium">Email</label><br />
                    <input type="text" placeholder="Enter your email" id="email" className="px-2 py-2 outline-none border border-gray-200 w-full mt-2 rounded-md" onChange={(e)=>handleInputChange("email",e.target.value)}/>
                    {errors.email && <p className="text-red-600">{errors.email}</p>}
                </div>
                <div className="px-1 py-1">
                    <label htmlFor="password" className="font-medium">Password</label><br />
                    <input type="text" placeholder="Enter your password" id="password" className="px-2 py-2 outline-none border border-gray-200 w-full mt-2 rounded-md" onChange={(e)=>handleInputChange("password",e.target.value)}/>
                    {errors.password && <p className="text-red-600">{errors.password}</p>}
                </div>
                <button className="p-2 w-full bg-black text-white font-medium rounded-md mt-2">{type==="signin"?"Sign in":"Sign up"}</button>
            </form>
        </div>
    </div>
}