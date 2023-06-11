const clientID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
const redirectURL = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL
let accessToken

const Spotify = {
    getAccessToken() {
        // If the access token exists return it
        if(accessToken) {
            return accessToken
        }

        // if ( window.localStorage.getItem('accessToken') ) {
        //     accessToken = window.localStorage.getItem('accessToken')
        // }

        // Check url for access_token and expires_in
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        
        // If the url contains access_token and expires_in params, 
        // start an expires timer and return the access token
        if ( accessTokenMatch && expiresInMatch ) {
            accessToken = accessTokenMatch[1]
            
            // Clear the access token once it expires so we can fetch a new one
            const expiresIn = Number(expiresInMatch[1])
            window.setTimeout(() => accessToken = '', expiresIn * 1000)

            // Clear url params so we can get a new one when the current one expires
            window.history.pushState('Access Token', null, '/')

            return accessToken

        // Otherwise fetch a new access token
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientID}&redirect_uri=${redirectURL}&scope=playlist-modify-public`
            window.location = accessURL
        }
    },

    async search(term) {
        const accessToken = this.getAccessToken()

        try {
            const searchResults = await fetch(`https://api.spotify.com/v1/search?type=track&limit=10&q=${encodeURIComponent(term)}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const jsonResponse = await searchResults.json()
            
            if ( !jsonResponse.tracks ) {
                return []
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }))
        } catch (error) {
            console.log(error)
        }
    },

    async savePlaylist( name, trackURIs ) {
        if ( !name || !trackURIs.length ) {
            return
        }

        const accessToken = this.getAccessToken()

        // Fetch user object
        const user = await this.getCurrentUser()
        if ( !user.id ) {
            console.log('User id not found', user)
            return
        }

        // Create playlist
        const createPlaylist = await fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${accessToken}` },
            body: JSON.stringify({name: name})
        })
        const createdPlaylistJSON = await createPlaylist.json()
        const playlistID = createdPlaylistJSON.id

        // Add tracks to playlist
        const addTracksToPlaylist = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${accessToken}` },
            body: JSON.stringify({uris: trackURIs})
        })
        return await addTracksToPlaylist.json()
    },

    async getCurrentUser() {
        const accessToken = this.getAccessToken()

        const fetchUser = await fetch(`https://api.spotify.com/v1/me`, { headers: { Authorization: `Bearer ${accessToken}` }})
        const userJSON = await fetchUser.json()
        console.log(userJSON)
        return userJSON
    }
}

export default Spotify