import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function Navigation() {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // <- control de carga

    useEffect(() => {
        const token = localStorage.getItem("access");

        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        axios.get("http://localhost:8000/api/user/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => setUser(res.data))
            .catch((err) => {
                console.error("Error al obtener usuario:", err);

                // Si hay error de autenticación, limpiar estado y redirigir
                if (err.response?.status === 401) {
                    localStorage.removeItem("access");
                    setUser(null);
                    navigate("/login");
                }
            })
            .finally(() => setLoading(false));
    }, [navigate]);


    const handleLogout = () => {
        localStorage.removeItem("access");
        setUser(null);
        navigate("/login");
    };


    const isFormPage = location.pathname === "/videos-create"
        || /^\/videos\/\d+$/.test(location.pathname)
        || /^\/videos-watch\/\d+$/.test(location.pathname);

    const isLoginPage = location.pathname === "/login";


    return (
        isLoginPage ? (

            <nav className="bg-zinc-850 px-6 py-4 flex items-center justify-between">
                <Link className="text-white text-2xl font-bold tracking-wide hover:text-violet-400 transition-colors">
                    Educativa
                </Link>
            </nav>

        ) : (

            <nav className="bg-zinc-850 px-6 py-4 flex items-center justify-between">
                <Link to={"/videos"} className="text-white text-2xl font-bold tracking-wide hover:text-violet-400 transition-colors">
                    Educativa
                </Link>

                <div className="flex items-center gap-6">
                    {!loading && (
                        user ? (
                            <>
                                <Link to={"/perfil"} className="text-white font-semibold">👤 {user.username}</Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-500 transition-colors shadow-md cursor-pointer"
                                >
                                    Cerrar sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to={"/login"} className="text-white hover:text-green-400 transition-colors">
                                    Login
                                </Link>
                                <Link to={"/register"} className="text-white hover:text-blue-400 transition-colors">
                                    Register
                                </Link>
                            </>
                        )
                    )}

                    {isFormPage ? (
                        <Link to="/videos" className="bg-gray-700 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors shadow-md">
                            Volver
                        </Link>
                    ) : (
                        <Link to="/videos-create" className="bg-violet-600 text-white px-4 py-2 rounded-xl hover:bg-violet-500 transition-colors shadow-md">
                            Crear Video
                        </Link>
                    )}
                </div>
            </nav>

        )
    );
}
