import axios from 'axios';

export const getAllVideos = () => {
    return axios.get('http://localhost:8000/api/videos/')
}

export const getVideo = (id) => {
    return axios.get(`http://localhost:8000/api/videos/${id}/`)
}

// export const createVideo = (video) => {
//     const formData = new FormData();
//     for (let key in video) {
//         formData.append(key, video[key]);
//     }

//     return axios.post('http://localhost:8000/api/videos/', formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         }
//     });
// }

export const createVideo = (video) => {
    const formData = new FormData();
    formData.append("title", video.title);
    formData.append("description", video.description);

    // Aquí aseguramos que se suba el archivo correcto
    if (video.videoFile && video.videoFile.length > 0) {
        formData.append("videoFile", video.videoFile[0]);
    }

    return axios.post('http://localhost:8000/api/videos/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};


export const deleteVideo = (id) => {
    return axios.delete(`http://localhost:8000/api/videos/${id}/`)
}

export const updateVideo = (id, video) => {
    return axios.put(`http://localhost:8000/api/videos/${id}/`, video)
}

export const addViewToVideo = (id) => {
    return axios.post(`http://localhost:8000/api/videos/${id}/add-view/`);
  };  