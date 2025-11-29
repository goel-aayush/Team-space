import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";

const LOGIN_QUERY = gql`
  query Login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
      user {
        id
        name
        role
      }
    }
  }
`;

export default function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  // 1. Remove 'onCompleted' from here
  const [login, { loading }] = useLazyQuery(LOGIN_QUERY, {
    fetchPolicy: "network-only",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      // 2. Wait for the result directly here
      const result = await login({
        variables: { name: formData.name, password: formData.password },
      });

      // 3. Manually check for data
      if (result.error) {
        throw new Error(result.error.message);
      }

      if (result.data && result.data.login) {
        // 4. Save to LocalStorage
        localStorage.setItem("token", result.data.login.token);
        localStorage.setItem("user", JSON.stringify(result.data.login.user));

        // 5. Trigger the parent update
        onLoginSuccess(result.data.login.user);
      } else {
        setErrorMsg("Invalid credentials or server error");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setErrorMsg(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-linear-to-br from-indigo-500 to-purple-600">
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Enter your credentials to access TeamSpace
        </p>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 text-center border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="e.g. Boss Man"
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-xs text-center text-gray-400">
          Hint: Use "Boss Man" (ADMIN) or "John Doe" (EMPLOYEE)
        </p>
      </div>
    </div>
  );
}
