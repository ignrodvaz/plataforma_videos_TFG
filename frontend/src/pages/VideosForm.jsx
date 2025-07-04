import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { createVideo, deleteVideo, updateVideo, getVideo } from "../api/videos.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-hot-toast'
import { ChevronDown, ChevronUp } from "lucide-react";

export function VideosForm() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const [isUploading, setIsUploading] = useState(false);
    const [video, setVideo] = useState(null);
    const [showDescription, setShowDescription] = useState(false);

    const onSubmit = handleSubmit(async data => {
        if(isUploading) return;
        setIsUploading(true);

        try {
            if (params.id) {
                await updateVideo(params.id, data);
                toast.success("Video editado correctamente");
            } else {
                await createVideo(data);
                toast.success("Video subido correctamente");
            }
            navigate("/videos");
        } catch (error) {
            toast.error("Error: no autorizado o problema en la subida");
            console.error(error);
            if (error.response?.status === 401) {
                navigate("/login");
            }
        } finally {
            setIsUploading(false);
        }
    });


    useEffect(() => {
        const token = localStorage.getItem("access");
        if (!token) {
            navigate("/login");
            return;
        }

        async function loadVideo() {
            if (params.id) {
                try {
                    const res = await getVideo(params.id);
                    setVideo(res.data);
                    setValue("title", res.data.title);
                    setValue("description", res.data.description);
                } catch (error) {
                    console.error("Error al cargar el video:", error);
                    if (error.response?.status === 401) {
                        navigate("/login");
                    }
                }
            }
        }

        loadVideo();
    }, [navigate, params.id, setValue]);


    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-zinc-900 rounded-2xl shadow-lg text-white">

            {/* VIDEO PREVIEW SOLO AL EDITAR */}
            {params.id && video?.file_url && (
                <div className="mb-6">
                    <video controls className="w-full rounded-xl">
                        <source src={video.file_url} type="video/mp4" />
                        Tu navegador no soporta este video.
                    </video>
                </div>
            )}

            {/* INFO DE VIDEO EN MODO DETALLE */}
            {params.id && video && (
                <div className="mb-6 px-2">
                    <h2 className="text-xl font-semibold mb-1">{video.title}</h2>
                    <div className="flex items-center gap-6 text-sm text-zinc-400 mb-3">
                        <span>{video.views ?? 0} Visualizaciones</span>
                        <span>{new Date(video.created_at).toLocaleDateString()}</span>
                    </div>

                    <button
                        onClick={() => setShowDescription(!showDescription)}
                        className="flex items-center gap-1 text-sm text-violet-400 hover:underline focus:outline-none"
                    >
                        {showDescription ? (
                            <>
                                <ChevronUp size={16} /> Mostrar menos
                            </>
                        ) : (
                            <>
                                <ChevronDown size={16} /> Mostrar más
                            </>
                        )}
                    </button>

                    {showDescription && (
                        <p className="mt-3 text-sm text-zinc-300">{video.description}</p>
                    )}
                </div>
            )}

            {/* FORMULARIO DE EDICIÓN O CREACIÓN */}
            <form onSubmit={onSubmit} className="space-y-4">

                <input
                    type="text"
                    placeholder="Título"
                    {...register("title", { required: true })}
                    className="w-full p-3 bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.title && <span className="text-red-400 text-sm">El titulo es requerido</span>}

                <textarea
                    placeholder="Descripción"
                    {...register("description", { required: true })}
                    className="w-full p-3 bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows="4"
                />
                {errors.description && <span className="text-red-400 text-sm">La descripción es requerida</span>}

                <input
                    type="file"
                    accept="video/*"
                    {...register("videoFile", { required: true })}
                    className="w-full mt-4 bg-zinc-800 text-white rounded-md p-2"
                />
                {errors.videoFile && <span className="text-red-400 text-sm">El video es requerido</span>}


                <button
                    type="submit"
                    disabled={isUploading}
                    className={`w-full text-white py-2 px-4 rounded-md transition-colors ${isUploading
                            ? "bg-indigo-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-500"
                        }`}
                >
                    {isUploading ? "Subiendo..." : params.id ? "Actualizar" : "Subir"}
                </button>


                {params.id && (
                    <button
                        type="button"
                        onClick={async () => {
                            const accepted = window.confirm("¿Estás seguro de que quieres eliminar este video?");
                            if (accepted) {
                                await deleteVideo(params.id);
                                toast.success("Video eliminado correctamente");
                                navigate("/videos");
                            }
                        }}
                        className="w-full bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md transition-colors"
                    >
                        Eliminar
                    </button>
                )}
            </form>
        </div>
    );
}
