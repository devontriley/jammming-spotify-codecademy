import React from 'react'
import Tracklist from '../Tracklist/Tracklist'
import Spotify from '@/utils/Spotify'

const Playlist = ({ searchResultsTracks, playlist, setPlaylist }) => {
    const { name, tracks } = playlist

    const handlePlaylistNameChange = (e) => {
		const newName = e.target.value
		setPlaylist(prevState => ({
			...prevState,
			name: newName
		}))
	}

    const savePlaylist = () => {
        // Check that we have at least one song in our playlist and a name has been entered
        if ( !tracks.length && name == '' ) return

        // Create array of track uris
        const trackURIs = tracks.map(track => track.uri)

        // Create playlist and add tracks to it
        Spotify.savePlaylist( name, trackURIs )

        // Clear the playlist and reset the name
        setPlaylist({
            name: '',
            tracks: []
        })
    }

    return (
        <div className="border border-white rounded p-5 bg-[rgb(255,255,255,0.1)]">
            <input className="w-full text-white font-bold text-2xl bg-transparent" type="text" onChange={handlePlaylistNameChange} value={name} placeholder="Enter a playlist name" />
            {tracks.length > 0 && <Tracklist searchResultsTracks={searchResultsTracks} playlistTracks={tracks} tracks={tracks} isPlaylist={true} setPlaylist={setPlaylist} />}
            <div className="text-center">
                <button className="p-3 rounded bg-purple-900" onClick={savePlaylist}>Save to Spotify</button>
            </div>
        </div>
    )
}

export default Playlist