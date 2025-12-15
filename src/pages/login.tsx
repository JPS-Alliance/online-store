import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";

export default function LoginPage() {
  const { user, login, logout } = useAppContext();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    // Simulate login (no backend)
    login({ name: "Guest User", email });
    router.push("/"); // redirect to home
  };

  // If user is logged in
  if (user) {
    return (
      <section className="bg-[#EFF3EB] flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10 text-center">
          <h1 className="text-3xl font-medium text-black mb-2">
            Welcome, {user.name}!
          </h1>
          <p className="text-black/70 mb-6">{user.email}</p>

          <Link
            href="/"
            className="inline-block bg-black text-[#ECFEA7] px-6 py-3 rounded-lg font-medium mb-4 w-full transition hover:border-[#cfe89a] border border-transparent"
          >
            Go to Home
          </Link>

          <button
            onClick={logout}
            className="inline-block bg-white text-black border border-black/20 px-6 py-3 rounded-lg font-medium w-full transition hover:bg-black hover:text-[#ECFEA7]"
          >
            Log Out
          </button>
        </div>
      </section>
    );
  }

  // If user is not logged in
  return (
    <section className="bg-[#EFF3EB] flex items-center justify-center py-20 px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10">
        {/* Heading */}
        <h1 className="text-3xl font-medium text-black mb-2 text-center">
          Welcome Back
        </h1>
        <p className="text-black/60 text-center mb-8">Sign in to your account</p>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
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

          {/* Forgot password */}
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-black/60 hover:text-black transition"
            >
              Forgot password?
            </Link>
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
            Sign In
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-sm text-black/60 mt-8">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-black underline hover:no-underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
}
