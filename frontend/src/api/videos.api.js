import axios from 'axios';
import { get } from 'react-hook-form';

// export const getAllVideos = () => {
//     const token = localStorage.getItem('token');
//     return axios.get('http://localhost:8000/api/videos/')
//     headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//     }
// }

const getAuthHeaders = () => {
    const token = localStorage.getItem("access");
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
}

export const getAllVideos = () => {
    return axios.get("http://localhost:8000/api/videos/", getAuthHeaders());
  };
  

export const getVideo = (id) => {
    return axios.get(`http://localhost:8000/api/videos/${id}/`, getAuthHeaders());
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

// export const createVideo = (video) => {
//     const formData = new FormData();
//     formData.append("title", video.title);
//     formData.append("description", video.description);

//     // Aquí aseguramos que se suba el archivo correcto
//     if (video.videoFile && video.videoFile.length > 0) {
//         formData.append("videoFile", video.videoFile[0]);
//     }

//     return axios.post('http://localhost:8000/api/videos/', formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         }
//     });
// };

export const createVideo = (videoData) => {
    const formData = new FormData();
    formData.append("title", videoData.title);
    formData.append("description", videoData.description);
    formData.append("videoFile", videoData.videoFile[0]); // recuerda que es un array
  
    return axios.post('http://localhost:8000/api/videos/', formData, {
      ...getAuthHeaders(),
      headers: {
        ...getAuthHeaders().headers,
        "Content-Type": "multipart/form-data"
      }
    });
  };


export const deleteVideo = (id) => {
    return axios.delete(`http://localhost:8000/api/videos/${id}/`, getAuthHeaders());
}

export const updateVideo = (id, video) => {
    return axios.put(`http://localhost:8000/api/videos/${id}/`, video, getAuthHeaders());
}

export const addViewToVideo = (id) => {
    return axios.post(`http://localhost:8000/api/videos/${id}/add-view/`, getAuthHeaders());
  };  