import React from 'react'
import Tracklist from './../Tracklist/Tracklist'

const SearchResults = ({ searchResultsTracks, playlist, setPlaylist }) => {
    return (
        <div className="border border-white rounded p-5 bg-[rgb(255,255,255,0.1)]">
            {searchResultsTracks.length > 0 && <Tracklist searchResultsTracks={searchResultsTracks} playlist={playlist} tracks={searchResultsTracks} isPlaylist={false} setPlaylist={setPlaylist} />}
        </div>
    )
}

export default SearchResults