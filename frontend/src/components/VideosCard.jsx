import { useNavigate } from "react-router-dom"

export function VideosCard({ video }) {
  const navigate = useNavigate()

  return (
    <div
      className="bg-zinc-800 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer overflow-hidden"
      onClick={() => navigate(`/videos/${video.video_id}`)}
    >
      <video className="w-full h-48 object-cover" controls>
        <source src={video.file_url} type="video/mp4" />
        Tu navegador no soporta el video.
      </video>
      <div className="p-4">
        <h2 className="text-white font-semibold text-lg mb-1 truncate">{video.title}</h2>
        <p className="text-gray-400 text-sm mb-2 line-clamp-2">{video.description}</p>
        <div className="text-gray-500 text-xs">Views: {video.views}</div>
      </div>
    </div>
  )
}