// src/components/LoginForm.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContent";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../api";

function LoginForm() {
  const { isAuthenticated, login, logout } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/blogs");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      const response = await authenticateUser(username, password);
      if (!response.succeeded) {
        throw new Error(response.messages[0]);
      }
      localStorage.setItem("user", JSON.stringify(response.data));
      login();
      navigate("/blogs");
    } catch (error) {
      setError(error.message);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-slate-500 my-5">Login to See Blogs</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-4 max-w-md mx-auto min-h-[60vh]"
      >
        <input
          type="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Email"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white p-2 rounded cursor-pointer"
        >
          Login
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </>
  );
}

export default LoginForm;
