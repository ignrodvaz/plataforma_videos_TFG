// src/pages/RegisterPage.jsx
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: "", email: "", password: "" })
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:8000/api/register/", form)
      navigate("/login")
    } catch (err) {
      setError("No se pudo registrar. ¿Usuario ya existente?")
    }
  }

  const handleLoginRedirect = () => {
    navigate("/login")
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-zinc-800 p-6 rounded-lg shadow-lg">
      <h1 className="text-white text-2xl font-bold mb-6 text-center">Registro</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-zinc-700 text-white"
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
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
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          Registrarse
        </button>
        {error && <p className="text-red-400 mt-2">{error}</p>}
      </form>
      <p className="mt-4 text-white">¿Ya tienes cuenta?</p>
      <button
        onClick={handleLoginRedirect}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
        Iniciar Sesión
      </button>
    </div>
  )
}
