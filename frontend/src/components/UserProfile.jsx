import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { VideosCard } from './VideosCard';
import axios from '../api/axiosConfig.js';

const UserProfile = () => {
    const [user, setUser] = useState({});
    const [videos, setVideos] = useState([]);
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const token = localStorage.getItem('access'); // Asegúrate de que se llame así en tu app

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    useEffect(() => {
        // Obtener datos del usuario
        axios.get('/api/user/', { headers })
            .then(res => {
                console.log("VIDEO RESPONSE ", res.data);
                setUser(res.data);
                setEmail(res.data.email);
            })
            .catch(err => console.error(err));

        // Obtener videos del usuario
        axios.get('/api/user/videos/', { headers })
            .then(res => setVideos(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleEmailChange = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put('/api/user/update-email/', { email }, { headers });
            toast.success(res.data.message || 'Email actualizado correctamente');

            setUser((prevUser) => ({
                ...prevUser,
                email: email,  // el nuevo valor
            }));
        } catch (err) {
            toast.error(err.response?.data?.error || 'Error al actualizar el email');
        }
    };



    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                '/api/user/change-password/',
                { old_password: oldPassword, new_password: newPassword },
                { headers }
            );
            toast.success(res.data.message || 'Contraseña actualizada correctamente');

            // Limpia los campos
            setOldPassword('');
            setNewPassword('');
        } catch (err) {
            toast.error(err.response?.data?.error || 'Error al cambiar la contraseña');
        }
    };


    const handleDeleteAccount = async () => {
        const confirm = window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.');
        if (!confirm) return;

        try {
            await axios.delete('/api/user/delete-account/', { headers });
            toast.success('Cuenta eliminada correctamente');

            localStorage.clear();
            // Espera un poco para mostrar el toast antes de redirigir
            setTimeout(() => {
                window.location.href = '/login'; // o tu ruta de inicio de sesión
            }, 1500);
        } catch (err) {
            toast.error('Error al eliminar la cuenta');
        }
    };


    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Perfil de Usuario</h2>

            <div className="mb-6">
                <p><strong>Usuario:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>

            <form onSubmit={handleEmailChange} className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Cambiar Email</h3>
                <input
                    type="email"
                    className="border p-2 w-full mb-2"
                    placeholder="Nuevo Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">Actualizar Email</button>
            </form>

            <form onSubmit={handlePasswordChange} className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Cambiar Contraseña</h3>
                <input
                    type="password"
                    className="border p-2 w-full mb-2"
                    placeholder="Contraseña actual"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                    type="password"
                    className="border p-2 w-full mb-2"
                    placeholder="Nueva contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">Actualizar Contraseña</button>
            </form>

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Mis Videos</h3>
                <div className="flex space-x-4 overflow-x-auto p-2">
                    {videos.map(video => (
                        <div key={video.video_id} className="flex-shrink-0 w-64">
                            <VideosCard video={video} />
                        </div>
                    ))}
                </div>
            </div>



            <button onClick={handleDeleteAccount} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer">
                Eliminar Cuenta
            </button>

            {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}
        </div>
    );
};

export default UserProfile;
