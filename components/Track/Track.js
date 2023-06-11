import React from 'react'

const Track = ({ track, onAdd, onRemove, isRemoval }) => {
    const addTrack = () => {
        onAdd(track)
    }

    const removeTrack = () => {
        onRemove(track)
    }

    const buttonClasses = "absolute top-1/2 transform -translate-y-1/2 right-0 w-7 h-7 rounded-full bg-black bg-opacity-40 hover:bg-opacity-80"
    const button = ( isRemoval ) 
        ? <button className={buttonClasses} onClick={removeTrack}>-</button> 
        : <button className={buttonClasses} onClick={addTrack}>+</button>

    return (
        <li data-testid="track" className="relative border-b last:border-b-0 py-3 pr-5">
            <h3 className="font-bold text-lg">{track.name}</h3>
            <p className="text-sm">{track.artist} | {track.album}</p>
            {button}
        </li>
    )
}

export default Track