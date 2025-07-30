"use client";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 bg-white dark:bg-black">
      <main className="flex flex-col gap-8 items-center w-full max-w-md p-6 rounded-lg shadow-lg bg-gray-50 dark:bg-gray-900">
        <h1 className="text-xl font-semibold text-center text-gray-800 dark:text-white">Register</h1>
        <form className="flex flex-col gap-4 w-full">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 p-2 border rounded bg-white dark:bg-black dark:border-gray-700"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 p-2 border rounded bg-white dark:bg-black dark:border-gray-700"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 p-2 border rounded bg-white dark:bg-black dark:border-gray-700"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="mt-1 p-2 border rounded bg-white dark:bg-black dark:border-gray-700"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Register
          </button>
        </form>
      </main>
    </div>
  );
}
