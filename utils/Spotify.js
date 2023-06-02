const clientID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
const redirectURL = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL
let accessToken
let userID

function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}

const Spotify = {
    getAccessToken() {
        // If the access token exists return it
        if(accessToken) {
            return accessToken
        }

        // Check url for access token
        let params = getHashParams()
	    let accessTokenParam = params.access_token
        let expiresIn = params.expires_in
        
        // If the url contains access_token and expires_in params, start an expires timer and return the access token
        if ( accessTokenParam && expiresIn ) {
            accessToken = accessTokenParam
            // Clear the access token once it expires so we can fetch a new one
            window.setTimeout(() => accessToken = '', Number(expiresIn) * 1000)
            // Clear url params so we can get a new one when the current one expires
            window.history.pushState('Access Token', null, '/')
            return accessToken
        // Otherwise fetch a new access token
        } else {
            const scope = 'playlist-modify-public'
            const spotifyURL = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientID}&redirect_uri=${redirectURL}&scope=${scope}`
            window.location = spotifyURL
        }
    },

    async search(term) {
        this.getAccessToken()

        const searchResults = await fetch(`https://api.spotify.com/v1/search?type=track&limit=10&q=${encodeURIComponent(term)}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if(!searchResults.ok) {
            throw new Error(`Error: ${searchResults.satus}`)
        }
        const searchResultsJSON = await searchResults.json()
        const { tracks } = searchResultsJSON

        if(tracks.items.length) {
            return tracks.items.map(item => ({
                id: item.id,
                name: item.name,
                artist: item.artists[0].name,
                album: item.album.name,
                uri: item.uri
            }))
        } else {
            return 'No results'
        }
    },

    async savePlaylist( name, trackURIs ) {
        this.getAccessToken()

        // Get user ID
        const fetchUserID = await fetch(`https://api.spotify.com/v1/me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if ( !fetchUserID.ok ) {
            throw new Error(`Error: ${fetchUserID.status}`)
        }
        const userIDJSON = await fetchUserID.json()
        if ( userIDJSON.id ) {
            userID = userIDJSON.id
        }

        // Save playlist
        const body = {
            name: name,
            description: 'Playlist created from the Jammming app'
        }
        const createPlaylist = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        if ( !createPlaylist.ok ) {
            throw new Error(`Error: ${createPlaylist.status}`)
        }
        const createdPlaylistJSON = await createPlaylist.json()
        const playlistID = createdPlaylistJSON.id
        if ( !playlistID ) {
            throw new Error('Playlist not created')
        }

        // Add tracks to playlist
        const bodyTracks = {
            uris: trackURIs
        }
        const addTracksToPlaylist = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(bodyTracks)
        })
        if ( !addTracksToPlaylist.ok ) {
            throw new Error(`Error: ${addTracksToPlaylist.status}`)
        }
        const addTracksToPlaylistJSON = await addTracksToPlaylist.json()
        console.log(addTracksToPlaylistJSON)
    }
}

export default Spotify