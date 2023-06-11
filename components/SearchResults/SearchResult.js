import React from 'react'
import Tracklist from './../Tracklist/Tracklist'

const SearchResults = ({ searchResults, onAdd }) => {
    return (
        <div data-testid="searchResults" className="max-h-[400px] md:max-h-none overflow-y-scroll border border-white rounded p-5 bg-[rgb(255,255,255,0.1)]">
            <Tracklist 
                tracks={searchResults} 
                onAdd={onAdd}
                // playlist={playlist} 
                // tracks={searchResultsTracks} 
                // isPlaylist={false} 
                // setPlaylist={setPlaylist} 
            />
        </div>
    )
}

export default SearchResults