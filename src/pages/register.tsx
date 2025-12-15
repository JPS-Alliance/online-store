 import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";

export default function RegisterPage() {
  const { register } = useAppContext();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Simulate registration
    register({ name, email });
    router.push("/"); // redirect to home after registration
  };

  return (
    <section className="bg-[#EFF3EB] flex items-center justify-center min-h-screen py-20 px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10">
        {/* Heading */}
        <h1 className="text-3xl font-medium text-black mb-2 text-center">
          Create Account
        </h1>
        <p className="text-black/60 text-center mb-8">
          Sign up to start your journey
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-black mb-2">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                w-full
                rounded-lg
                border
                border-black/20
                px-4 py-3
                text-black
                outline-none
                focus:border-black
                transition
              "
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm text-black mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full
                rounded-lg
                border
                border-black/20
                px-4 py-3
                text-black
                outline-none
                focus:border-black
                transition
              "
              placeholder="you@email.com"
            />
          </div>

          <div>
            <label className="block text-sm text-black mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                rounded-lg
                border
                border-black/20
                px-4 py-3
                text-black
                outline-none
                focus:border-black
                transition
              "
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm text-black mb-2">Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="
                w-full
                rounded-lg
                border
                border-black/20
                px-4 py-3
                text-black
                outline-none
                focus:border-black
                transition
              "
              placeholder="••••••••"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full
              bg-black
              text-[#ECFEA7]
              py-3
              rounded-lg
              font-medium
              hover:border-[#cfe89a]
              border
              border-transparent
              transition
            "
          >
            Register
          </button>
        </form>

        {/* Already have account */}
        <p className="text-center text-sm text-black/60 mt-8">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-black underline hover:no-underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
