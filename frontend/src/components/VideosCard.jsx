import { useNavigate } from "react-router-dom";
import { addViewToVideo } from "../api/videos.api";
import { useState } from "react";

export function VideosCard({ video }) {
  const navigate = useNavigate();
  const [views, setViews] = useState(video.views ?? 0);
  const userId = localStorage.getItem("userId");

  const handleClick = async () => {
    try {
      const res = await addViewToVideo(video.video_id);
      setViews(res.data.views); // actualiza las vistas localmente
    } catch (error) {
      console.error("❌ Error al sumar visualización", error);
    } finally {
      if (String(video.user) === userId) {
        navigate(`/videos/${video.video_id}`);
      } else {
        navigate(`/videos-watch/${video.video_id}`);
      }
    }
  };

  return (
    <div
      className="bg-zinc-800 h-85 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      <video className="w-full h-55 object-cover" controls>
        <source src={video.file_url} type="video/mp4" />
        Tu navegador no soporta el video.
      </video>
      <div className="p-4">
        <h2 className="text-white font-semibold text-lg mb-1 truncate">{video.title}</h2>
        <p className="text-gray-400 text-sm mb-2 line-clamp-2">{video.description}</p>
        <div className="text-gray-500 text-xs">Visualizaciones: {views}</div>
      </div>
    </div>
  );
}
