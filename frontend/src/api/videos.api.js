import axios from 'axios';

export const getAllVideos = () => {
    return axios.get('http://localhost:8000/api/videos/')
}

export const getVideo = (id) => {
    return axios.get(`http://localhost:8000/api/videos/${id}/`)
}

export const createVideo = (video) => {
    return  axios.post('http://localhost:8000/api/videos/', video)
}

export const deleteVideo = (id) => {
    return axios.delete(`http://localhost:8000/api/videos/${id}/`)
}

export const updateVideo = (id, video) => {
    return axios.put(`http://localhost:8000/api/videos/${id}/`, video)
}