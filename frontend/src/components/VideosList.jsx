import { useEffect, useState } from "react"
import { getAllVideos } from "../api/videos.api";
import { VideosCard } from "./VideosCard";

export function VideosList() {

  const [videos, setVideos] = useState([])

  useEffect(() => {
    async function loadVideos() {
      const res = await getAllVideos()
      setVideos(res.data)
    }
    loadVideos()
  }, []);

  return <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-zinc-850 min-h-screen">
    {videos.map(video => (
      <VideosCard video = {video} key={video.video_id} />
    ))}
  </div>
}
