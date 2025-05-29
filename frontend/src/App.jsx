import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { VideosPage } from './pages/VideosPage'
import { VideosForm } from './pages/VideosForm'
import { VideosWatch } from './pages/VideosWatch'
import { Navigation } from './components/Navigation'
import { Toaster } from 'react-hot-toast'
import { User } from 'lucide-react'
import UserProfile from './components/UserProfile'

function App() {
  return (
    <BrowserRouter>
      <div className='container mx-auto'>
        <Navigation />
        <Routes>
          <Route path='/' element={<Navigate to="/Videos" />} />
          <Route path='/videos' element={<VideosPage />} />
          <Route path='/videos-create' element={<VideosForm />} />
          <Route path='/videos/:id' element={<VideosForm />} />
          <Route path='/videos-watch/:id' element={<VideosWatch />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='/perfil' element={<UserProfile />} />
        </Routes>
        <Toaster
          position="top-right"
          reverseOrder={true}
          toastOptions={{
            duration: 2000,
          }}/>
      </div>
    </BrowserRouter>
  )
}

export default App