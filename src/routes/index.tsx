import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MotorcycleDetail from '../pages/MotorcycleDetail'
import MyMotorcycles from '../pages/MyMotorcycles'
import NotFound from '../pages/NotFound'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyMotorcycles />} />
        <Route path="/motorcycle/:id" element={<MotorcycleDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
