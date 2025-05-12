import { get, useForm } from "react-hook-form";
import { useEffect } from "react";
import { createVideo, deleteVideo, updateVideo, getVideo } from "../api/videos.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-hot-toast'

export function VideosForm() {

    const { register, handleSubmit, formState: { errors },
        setValue
    } = useForm();
    const navigate = useNavigate();
    const params = useParams();
    // console.log(params);

    // const onSubmit = handleSubmit(async data => {
    //     // const file = data.videoFile[0];
    //     // console.log("Archivo de video: ", file);
    //     const res = await createVideo(data);
    //     console.log(res);
    // })

    const onSubmit = handleSubmit(async data => {
        //const file = data.videoFile[0]; // ❌ No lo necesitas ahora
        if (params.id) {
            await updateVideo(params.id, data)
            toast.success("Video editado correctamente");
        } else {
            await createVideo(data); // data solo contiene title y description
            toast.success("Video creado correctamente");
        }
        navigate("/videos"); // Redirige a la página de videos después de crear el video
    });

    useEffect(() => {
        async function loadVideo() {
            if (params.id) {

                const res = await getVideo(params.id);
                setValue("title", res.data.title);
                setValue("description", res.data.description);

            }
        }
        loadVideo();
    }, [])


    return (
        <div className="max-w-xl mx-auto mt-10 bg-zinc-900 p-6 rounded-xl shadow-lg text-white">

            <form onSubmit={onSubmit} className="space-x-36">

                {/* CAMPO TITULO */}
                <input type="text" name="title" placeholder="Título"
                    {...register("title", { required: true })}
                    className="w-full p-3 bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.title && <span className="text-red-400 text-sm">El titulo es requerido</span>}

                {/* CAMPO DESCRIPCION */}
                <textarea name="description" placeholder="Descripción"
                    {...register("description", { required: true })}
                    className="w-full mt-4 p-3 bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows="4"
                />
                {errors.description && <span className="text-red-400 text-sm">La descripcón es requerida</span>}


                {/* ACTUALMENTE NO SUBE NINGUN VIDEO DEJA POR DEFECTO UN NOMBRE */}
                {/* CAMPO VIDEO
                Enlace vídeo:<input type="file" accept="video/*"
                    {...register("videoFile", { required: true })} />
                {errors.videoFile && <span>Este campo es requerido</span>} */}

                {/* CAMPO CATEGORIAS */}
                {/* <select name="categories" multiple>
                    {categories.map(cat => (
                        <option key={cat.category_id} value={cat.category_id}>{cat.name}</option>
                    ))}
                </select> */}

                {/* CAMPO PUBLICO */}
                {/* <label>
                    <input type="checkbox" name="isPublic" /> Público
                </label> */}

                <button type="submit" className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-md transition-colors"
                >{params.id ? "Actualizar" : "Subir"} </button>

                {
                params.id && (
                    <button onClick={async () => {
                        const accepted = window.confirm("Estas seguro?")
                        if (accepted) {
                            await deleteVideo(params.id)
                            toast.success("Video eliminado correctamente");
                            navigate("/videos");
                        }
                    }} className="w-full mt-4 bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md transition-colors">Eliminar</button>
                )
            }
            </form>

            


        </div>
    )
}
