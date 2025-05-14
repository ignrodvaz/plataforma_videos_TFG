import { Link, useLocation } from "react-router-dom"

export function Navigation() {
    const location = useLocation();
    const isFormPage = location.pathname === "/videos-create" || /^\/videos\/\d+$/.test(location.pathname);
    return (
        <nav className="bg-zinc-850 px-6 py-4 flex items-center justify-between">
            <Link to={"/videos"} className="text-white text-2xl font-bold tracking-wide hover:text-violet-400 transition-colors">
                Video App
            </Link>

            {isFormPage ? (
                <Link to="/videos" className="bg-gray-700 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors shadow-md">
                    Volver
                </Link>
            ) : (
                <Link to="/videos-create" className="bg-violet-600 text-white px-4 py-2 rounded-xl hover:bg-violet-500 transition-colors shadow-md">
                    Crear Video
                </Link>
            )}
        </nav>
    )
}