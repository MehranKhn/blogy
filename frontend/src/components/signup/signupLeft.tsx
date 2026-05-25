export default function Signupleft(){
    return <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-sm md:max-w-md space-y-2">

            <h1 className="text-4xl md:text-5xl font-bold text-center mb-3">Create an Account</h1>
            <div className="text-md text-gray-600 text-center">Already have an account?<span className="underline hover:text-blue-500 cursor-pointer">Login</span></div>

            <form className="space-y-2 px-4">
                <div className="px-1 py-1">
                    <label htmlFor="username" className="font-medium">Username</label><br />
                    <input type="text" placeholder="Enter your username" id="username" className="px-2 py-2 outline-none border border-gray-200 w-full mt-2 rounded-md" />
                </div>
                <div className="px-1 py-1">
                    <label htmlFor="email" className="font-medium">Email</label><br />
                    <input type="text" placeholder="Enter your email" id="email" className="px-2 py-2 outline-none border border-gray-200 w-full mt-2 rounded-md"/>
                </div>
                <div className="px-1 py-1">
                    <label htmlFor="password" className="font-medium">Password</label><br />
                    <input type="text" placeholder="Enter your password" id="password" className="px-2 py-2 outline-none border border-gray-200 w-full mt-2 rounded-md"/>
                </div>
                <button className="p-2 w-full bg-black text-white font-medium rounded-md mt-2">Sign up</button>
            </form>
        </div>
    </div>
}