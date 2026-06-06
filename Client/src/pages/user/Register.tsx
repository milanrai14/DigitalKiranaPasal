import { useState, type ChangeEvent, type FormEvent,  } from "react";
import { useAppDispatch } from "../../store/hooks";
import { registerUser } from "../../store/authSlice";

type FormData = {
  username: string;
  password: string;
  email: string;
};


function Register() {
  const dispatch = useAppDispatch()
    const [data, setData] = useState<FormData>({
        username: "",
        password: "",
        email: ""
    })
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
      const {name, value} = e.target
      setData({
        ...data,
        [name] : value
      })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      dispatch(registerUser(data))
      console.log(data);
    }

  return (
    <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white shadow-md rounded-md p-6">

          <img
            className="mx-auto h-12 w-auto"
            src="https://www.svgrepo.com/show/499664/user-happy.svg"
            alt="User icon"
          />

          <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign up for an account
          </h2>

          <form className="space-y-6" method="POST" onSubmit={handleSubmit}>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                onChange={handleChange}
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
            >
              Register Account
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Register