import React from 'react'
import Track from '../Track/Track'

const Tracklist = ({ tracks, onAdd, onRemove, isRemoval }) => {
    return (
        <ul>
            {tracks.map(track => (
                <Track 
                    key={track.id} 
                    track={track}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    isRemoval={isRemoval}
                />
            ))}
        </ul>
    )
}

export default Tracklist