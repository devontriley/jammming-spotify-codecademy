import React, { useState } from 'react'

const SearchBar = ({ onSearchSubmit }) => {
    const [term, setTerm] = useState('')

    const handleTermChange = (e) => {
        setTerm(e.target.value)
    }

    const search = (e) => {
        e.preventDefault()
        onSearchSubmit(term)
    }

    return (
        <form onSubmit={search} data-testid="searchForm" className="relative mx-auto max-w-[600px]">
            <input 
                aria-label="Enter a search keyword or phrase"
                className="w-full p-5 pr-16 text-black" 
                onChange={handleTermChange} 
                type="search" 
                value={term} 
                placeholder="Search for songs" 
            />
            <button 
                aria-label="Search for songs"
                className="absolute right-5 top-1/2 transform -translate-y-1/2" 
                type="submit"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-blue-500" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </button>
        </form>
    )
}

export default SearchBar