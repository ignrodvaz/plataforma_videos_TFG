// src/pages/VideosWatch.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVideo, getAllVideos } from "../api/videos.api";
import { VideosCard } from "../components/VideosCard"; // Asegúrate de que la ruta sea correcta

export function VideosWatch() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [otherVideos, setOtherVideos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getVideo(id);
        setVideo(res.data);

        const allRes = await getAllVideos();
        // Excluir el video actual
        const filtered = allRes.data.filter((v) => v.video_id !== parseInt(id));
        setOtherVideos(filtered);
      } catch (error) {
        console.error("❌ Error al cargar videos", error);
      }
    }
    fetchData();
  }, [id]);

  if (!video) return <p className="text-white p-4">Cargando video...</p>;

  return (
    <div className="flex max-w-7xl mx-auto mt-10 gap-6 px-4">
      {/* Columna izquierda: Video principal */}
      <div className="w-2/3 bg-zinc-900 p-6 rounded-2xl shadow-lg text-white">
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

      {/* Columna derecha: Otros videos con scroll */}
      <div className="w-100 max-h-[167vh] overflow-y-auto space-y-4 p-5">
        {otherVideos.map((v) => (
          <VideosCard key={v.video_id} video={v} />
        ))}
      </div>
    </div>
  );
}
