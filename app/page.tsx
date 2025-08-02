// "use client";

// export default function Home() {
//   return (
//     <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 bg-white dark:bg-black">
//       <main className="flex flex-col gap-8 items-center w-full max-w-md p-6 rounded-lg shadow-lg bg-gray-50 dark:bg-gray-900">
//         <h1 className="text-xl font-semibold text-center text-gray-800 dark:text-white">Register</h1>
//         <form className="flex flex-col gap-4 w-full">
//           <div className="flex flex-col">
//             <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
//               Full Name
//             </label>
//             <input
//               id="name"
//               name="name"
//               type="text"
//               required
//               className="mt-1 p-2 border rounded bg-white dark:bg-black dark:border-gray-700"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
//               Email
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               required
//               className="mt-1 p-2 border rounded bg-white dark:bg-black dark:border-gray-700"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
//               Password
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               required
//               className="mt-1 p-2 border rounded bg-white dark:bg-black dark:border-gray-700"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
//               Confirm Password
//             </label>
//             <input
//               id="confirmPassword"
//               name="confirmPassword"
//               type="password"
//               required
//               className="mt-1 p-2 border rounded bg-white dark:bg-black dark:border-gray-700"
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
//           >
//             Register
//           </button>
//         </form>
//       </main>
//     </div>
//   );
// }

"use client";
import { Amplify } from "aws-amplify";
import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";

import outputs from "@/amplify_outputs.json";

   Amplify.configure(outputs);
const client = generateClient<Schema>();

type FormFields = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Home() {
  const [form, setForm] = useState<FormFields>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await client.models.User.create({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      });
      alert("User registered!");
      setForm({ fullName: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      console.error("Error registering user:", err);
      alert("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 bg-white dark:bg-black">
      <main className="flex flex-col gap-8 items-center w-full max-w-md p-6 rounded-lg shadow-lg bg-gray-50 dark:bg-gray-900">
        <h1 className="text-xl font-semibold text-center text-gray-800 dark:text-white">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {["fullName", "email", "password", "confirmPassword"].map((field) => (
            <div key={field} className="flex flex-col">
              <label
                htmlFor={field}
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {field === "confirmPassword"
                  ? "Confirm Password"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                name={field}
                value={form[field as keyof FormFields] || ""}
                type={
                  field.includes("password")
                    ? "password"
                    : field === "email"
                    ? "email"
                    : "text"
                }
                onChange={handleChange}
                required
                className="mt-1 p-2 border rounded bg-white dark:bg-black dark:border-gray-700"
              />
            </div>
          ))}
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
