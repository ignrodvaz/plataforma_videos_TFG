// src/pages/LoginPage.jsx
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: "", password: "" })
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:8000/api/token/", form)
      localStorage.setItem("access", res.data.access)
      localStorage.setItem("refresh", res.data.refresh)
      const userRes = await axios.get("http://localhost:8000/api/user/", {
        headers: {
          Authorization: `Bearer ${res.data.access}`,
        }
      });
      localStorage.setItem("userId", userRes.data.id);
      navigate("/")
      window.location.reload();

    } catch (err) {
      setError("Credenciales incorrectas")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-zinc-800 p-6 rounded-lg shadow-lg">
      <h1 className="text-white text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-zinc-700 text-white"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-zinc-700 text-white"
        />
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
          Iniciar Sesión
        </button>
        {error && <p className="text-red-400 mt-2">{error}</p>}
      </form>
    </div>
  )
}
