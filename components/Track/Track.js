import React from 'react'

const Track = ({ searchResultsTracks, playlist, track, isPlaylist, setPlaylist }) => {
    const { id, name, artist, album } = track

    const removeTrack = (trackId) => {
        setPlaylist(prevState => ({
            ...prevState,
            tracks: prevState.tracks.filter(track => track.id !== trackId)
        }))
    }

    const addTrack = () => {
        const exists = playlist.tracks.some(playlistTrack => playlistTrack.id === id)

        if (exists ) return

        const newTrack = track
        setPlaylist(prevState => ({
            ...prevState,
            tracks: [...prevState.tracks, newTrack]
        }))
    }

    const buttonClasses = "absolute top-1/2 transform -translate-y-1/2 right-0 w-7 h-7 rounded-full bg-black"
    const button = ( isPlaylist ) 
        ? <button className={buttonClasses} onClick={() => removeTrack(id)}>-</button> 
        : <button className={buttonClasses} onClick={() => addTrack()}>+</button>

    return (
        <div className="relative border-b last:border-b-0 py-3 pr-5">
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-sm">{artist} | {album}</p>
            {button}
        </div>
    )
}

export default Track