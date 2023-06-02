import React from 'react'
import Track from '../Track/Track'

const Tracklist = ({ searchResultsTracks, playlist, tracks, isPlaylist, setPlaylist }) => {
    return (
        <ul>
            {tracks.map(track => (
                <Track key={track.id} searchResultsTracks={searchResultsTracks} playlist={playlist} track={track} isPlaylist={isPlaylist} setPlaylist={setPlaylist} />
            ))}
        </ul>
    )
}

export default Tracklist