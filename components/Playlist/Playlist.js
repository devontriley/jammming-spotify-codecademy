import React from 'react'
import Tracklist from '../Tracklist/Tracklist'
import Spotify from '@/utils/Spotify'

const Playlist = ({ playlistName, playlistTracks, onNameChange, onRemove, onSave }) => {
    const handleNameChange = (e) => {
        onNameChange(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave()
    }

    return (
        <div className="border border-white rounded p-5 bg-[rgb(255,255,255,0.1)]">
            <form onSubmit={handleSubmit}>
                <input 
                    className="w-full py-3 text-white outline-none border-b border-transparent focus:border-b focus:border-white font-bold text-2xl bg-transparent placeholder:text-white/70" 
                    type="text" 
                    onChange={handleNameChange}
                    value={playlistName} 
                    placeholder="Enter a playlist name" 
                />

                <Tracklist 
                    tracks={playlistTracks}
                    onRemove={onRemove}
                    isRemoval={true}
                />

                <button className="p-3 mt-5 rounded bg-black bg-opacity-40 hover:bg-opacity-70">
                    Save to Spotify
                </button>
            </form>
        </div>
    )
}

export default Playlist