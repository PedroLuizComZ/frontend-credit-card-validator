"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setCookie } from "nookies";
import { privateApiClient } from "@/services/api";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    isAdmin: false,
  });
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError("Fill in all fields!");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const response = await privateApiClient.post("/user/login", {
          username: formData.username,
          password: formData.password,
        });

        setCookie(null, "token", response.data.token, {
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        });

        if (response.data.user.isAdmin) {
          router.push("/admin");
        } else {
          router.push("/questionnaire");
        }
      } else {
        await privateApiClient.post("/user/register", {
          username: formData.username,
          password: formData.password,
          isAdmin: formData.isAdmin,
        });

        setIsLogin(true);
        setError("Registration successful! Please log in.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.error || "An error occurred. Please try again."
        );
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white">
          {isLogin ? "Login" : "Register"}
        </h2>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form className="mt-4" onSubmit={handleSubmit}>
          <label className="block text-white">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 mt-1 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500"
            placeholder="Enter your username"
          />

          <label className="block mt-4 text-white">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mt-1 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500"
            placeholder="Enter your password"
          />

          {!isLogin && (
            <label className="block mt-4 text-white">
              <input
                type="checkbox"
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={handleChange}
                className="mr-2"
              />
              Register as admin
            </label>
          )}

          <button
            type="submit"
            className={`w-full mt-4 p-2 text-white rounded bg-blue-600 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : isLogin ? "Log in" : "Register"}
          </button>
        </form>

        <p className="text-center text-white mt-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? "Register" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
