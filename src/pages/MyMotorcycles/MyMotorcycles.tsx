import MotorcycleCard from '../../components/MotorcycleCard/MotorcycleCard'
import Search from '../../components/Search/Search'
import styles from './MyMotorcycles.module.css'
import { useMotorcycles } from '../../hooks/useMotorcycles'

const MyMotorcycles = () => {
  const {
    motorcycles,
    filteredMotorcycles,
    inputValue,
    setInputValue,
    setSearch,
    visibleCount,
    showMore,
  } = useMotorcycles()

  return (
    <div className={styles.container}>
      <Search
        search={inputValue}
        setSearch={setInputValue}
        motorcycles={motorcycles}
        onSearch={() => setSearch(inputValue)} 
      />

      <section aria-labelledby="my-bikes-heading" className={styles.motorcyclesSection}>
        <h2 id="my-bikes-heading" className={styles.heading}>My Motorcycles</h2>
        <ul className={styles.motorcycleGrid}>
          {filteredMotorcycles.slice(0, visibleCount).map(motorcycle => (
            <MotorcycleCard key={motorcycle.id} {...motorcycle} /> 
          ))}
        </ul>

        {visibleCount < filteredMotorcycles.length && (
          <div className={styles.showMoreContainer}>
            <button className={styles.showMoreButton} onClick={showMore}>
              Show More
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export default MyMotorcycles
