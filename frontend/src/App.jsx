import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { VideosPage } from './pages/VideosPage'
import { VideosForm } from './pages/VideosForm'
import { Navigation } from './components/Navigation'
import { Toaster } from 'react-hot-toast'

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