import type { Motorcycle } from '../MotorcycleCard/MotorcycleCard'
import bannerImage from '../../assets/images/banner.jpg'
import styles from './Search.module.css'
import React from 'react'

interface SearchProps {
  search: string
  setSearch: (value: string) => void
  motorcycles: Motorcycle[]
  onSearch: () => void 
}

const Search: React.FC<SearchProps> = ({ search, setSearch, motorcycles, onSearch }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() 
    onSearch()
  }

  return (
    <section className={styles.banner} aria-labelledby="search-motorcycles">
      <div className={styles.imageContainer}>
        <img
          src={bannerImage}
          alt="Front view of modern motorcycles on the road"
          className={styles.bannerImage}
          loading="lazy"
        />
      </div>

      <div className={styles.bannerContent}>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <div className={styles.searchFormTexts}>
            <label htmlFor="search">Search Motorcycles</label>
            <p>({motorcycles.length}) Motos</p>
          </div>

          <div className={styles.searchFormInputs}>
            <input
              id="search"
              type="text"
              placeholder="Honda CB500F"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              Search Inventory
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Search
