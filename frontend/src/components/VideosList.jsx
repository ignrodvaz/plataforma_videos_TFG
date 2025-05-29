import { useEffect, useState } from "react"
import { getAllVideos } from "../api/videos.api";
import { VideosCard } from "./VideosCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function VideosList() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchVideos = async (searchTerm = "") => {
    try {
      const token = localStorage.getItem("access");

      const response = await axios.get(`http://localhost:8000/api/videos/?search=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setVideos(response.data);
    } catch (error) {
      console.error("Error cargando videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
    async function loadVideos() {
      try {
        const res = await getAllVideos();
        setVideos(res.data);
      } catch (error) {
        console.error("No autorizado o error al cargar videos:", error);
        navigate("/login");  // Redirige si no está autorizado
      }
    }

    loadVideos();
  }, [navigate]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchVideos(value);
  }

  return (
    <div className="px-4">
      <input
        type="text"
        placeholder="Buscar videos..."
        value={search}
        onChange={handleSearchChange}
        className="w-full p-2 mb-4 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-10 bg-zinc-850 min-h-screen">
        {videos.map(video => (
          <VideosCard video={video} key={video.video_id} />
        ))}
      </div>
    </div>
  );
}
