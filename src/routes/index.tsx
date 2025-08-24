import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MotorcycleDetail from '../pages/MotorcycleDetail'
import MyMotorcycles from '../pages/MyMotorcycles/MyMotorcycles'
import Layout  from '../components/Layout/Layout'
import NotFound from '../pages/NotFound'
import { ROUTES } from './routes'

 const AppRoutes= () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<MyMotorcycles />} />
          <Route path={ROUTES.motorcycles} element={<MyMotorcycles />} />
          <Route path={ROUTES.motorcycleDetail} element={<MotorcycleDetail />} />
          <Route path="/" element={<Navigate to={ROUTES.motorcycles} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
