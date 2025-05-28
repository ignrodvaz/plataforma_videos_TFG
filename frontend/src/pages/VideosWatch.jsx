// src/pages/VideosWatch.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVideo } from "../api/videos.api";

export function VideosWatch() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    async function fetchVideo() {
      const res = await getVideo(id);
      setVideo(res.data);
    }
    fetchVideo();
  }, [id]);

  if (!video) return <p className="text-white p-4">Cargando video...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-zinc-900 rounded-2xl shadow-lg text-white">
      <video controls className="w-full rounded-xl mb-6">
        <source src={video.file_url} type="video/mp4" />
        Tu navegador no soporta este video.
      </video>

      <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
      <div className="flex items-center gap-6 text-sm text-zinc-400 mb-3">
        <span>{video.views ?? 0} Visualizaciones</span>
        <span>{new Date(video.created_at).toLocaleDateString()}</span>
      </div>

      <p className="text-sm text-zinc-300">{video.description}</p>
    </div>
  );
}
