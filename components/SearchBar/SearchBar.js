import React from 'react'

const SearchBar = ({ value, onInputChange, onSearchSubmit }) => {
    const handleChange = (e) => {
        onInputChange(e.target.value)
    }

    return (
        <div className="mx-auto w-6/12">
            <input 
                className="w-full p-5 text-black" 
                onChange={handleChange} 
                type="text" 
                value={value} 
                placeholder="Search for songs by name" 
            />
            <button onClick={onSearchSubmit}>Search</button>
        </div>
    )
}

export default SearchBar