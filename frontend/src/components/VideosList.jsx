import { useEffect, useState } from "react"
import { getAllVideos } from "../api/videos.api";
import { VideosCard } from "./VideosCard";
import { useNavigate } from "react-router-dom";

export function VideosList() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-10 bg-zinc-850 min-h-screen">
      {videos.map(video => (
        <VideosCard video={video} key={video.video_id} />
      ))}
    </div>
  );
}
