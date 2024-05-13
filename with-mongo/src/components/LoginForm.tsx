import Link from "next/link";

function LoginForm() {
  return (
    <div className="grid place-items-center  h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Login</h1>
        <form className="flex flex-col gap-3">
          <input placeholder="Email" type="text" />
          <input placeholder="Password" type="password" />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>
          <div className="bg-red-500 text-white text-sm px-3 py-1 rounded-md mt-2 w-fit">
            Error Message
          </div>
          <Link className="text-sm mt-3 text-right" href="/register">
            Don't have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
