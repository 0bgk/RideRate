import MotorcycleCardDetail from '../../components/MotorcycleCardDetail/MotorcycleCardDetail'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useMotorcycleDetail } from '../../hooks/useMotorcycleDetail'
import { useMotorcycles } from '../../hooks/useMotorcycles'
import Search from '../../components/Search/Search'
import styles from './MotorcycleDetail.module.css'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/routes'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete (L.Icon.Default.prototype as any)._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const MotorcycleDetail = () => {
  const navigate = useNavigate()
  const { motorcycles, inputValue, setInputValue, setSearch } = useMotorcycles()
  const { selectedMotorcycle } = useMotorcycleDetail()
  const positions = motorcycles.map(({ id, nombre, modelo, coordenadas }) => ({
    id,
    lat: coordenadas.latitud,
    lng: coordenadas.longitud,
    name: nombre,
    model: modelo,
  }))

  return (
    <div className={styles.container}>
      <Search
        search={inputValue}
        setSearch={setInputValue}
        motorcycles={motorcycles}
        onSearch={() => setSearch(inputValue)}
        disable={true}
      />

      <section aria-labelledby="motorcycle-detail" className={styles.motorcyclesSection}>
        <div className={styles.heading}>
          <h2 id="motorcycle-detail" className={styles.headingTitle}>Motorcycle Detail</h2>
          <button
            className={styles.button}
            onClick={() => navigate(ROUTES.home)}
            aria-label="Go back"
            title="Go back"
          >
            Go back
          </button>
        </div>
        <div className={styles.cardDetailContainer}>
          {selectedMotorcycle ? (
            <MotorcycleCardDetail {...selectedMotorcycle} />
          ) : (
            <p className={styles.notFound}>No motorcycle found.</p>
          )}
        </div>
      </section>

      <section aria-labelledby="location-of-my-motorcycles" className={styles.motorcyclesSection}>
        <h2 id="location-of-my-motorcycles" className={styles.heading}>Location of my motorcycles</h2>
        <MapContainer
          center={[41.75, 2.40] as [number, number]}
          zoom={8}
          style={{ height: '550px', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {positions.map((pos, i) => (
            <Marker key={i} position={[pos.lat, pos.lng]}>
              <Popup>
                <span>Model: {pos.model}</span> 
                <br/>
                <span>Name: {pos.name}</span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </section>
    </div>
  )
}

export default MotorcycleDetail
