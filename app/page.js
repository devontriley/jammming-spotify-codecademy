"use client";

import { useState, useEffect } from "react";
// import Image from "next/image";
// import { Play } from "next/font/google";

import Spotify from "@/utils/Spotify"

// Import components
import SearchBar from "@/components/SearchBar/SearchBar";
import SearchResults from "@/components/SearchResults/SearchResult";
import Playlist from "@/components/Playlist/Playlist";

export default function Home() {
	// const [error, setError] = useState('')
	// const [userName, setUserName] = useState('')
	const [searchResults, setSearchResults] = useState([])
	const [playlistName, setPlaylistName] = useState('')
	const [playlistTracks, setPlaylistTracks] = useState([])

	// Fetch Spotify access token when the app loads
	useEffect(() => {
		Spotify.getAccessToken()
	}, [])

	const handleSearch = async (term) => {
		console.log(term)
		Spotify.search(term).then(setSearchResults)
	}

	const addTrack = (track) => {
		if ( playlistTracks.some((savedTrack) => savedTrack.id === track.id))
			return
		setPlaylistTracks((prevTracks) => [...prevTracks, track])
	}

	const removeTrack = (track) => {
		setPlaylistTracks((prevTracks => {
			prevTracks.filter((currentTrack) => currentTrack.id === track.id)
		}))
	}

	const updatePlaylistName = (name) => {
		setPlaylistName(name)
	}

	const savePlaylist = () => {
		if ( playlistName === '' ) return
		const trackURIs = playlistTracks.map(track => track.uri)
		Spotify.savePlaylist(playlistName, trackURIs).then(() => {
			setPlaylistName('')
			setPlaylistTracks([])
		})
	}

	// Testing MSW by automatically sending GET request to Spotify for user data
	// useEffect(() => {
	// 	const fetchUser = async () => {
	// 		try {
	// 			const { display_name } = await Spotify.getCurrentUser()
	// 			setUserName(display_name)
	// 		} catch (error) {
	// 			setError(error)
	// 		}
	// 	}
	// 	fetchUser()
	// }, [])

	return (
		<main className="min-h-screen flex justify-center py-10">
			<div className="w-9/12">

				<h1 className="text-3xl font-bold italic text-center mb-5">Jammming</h1>

				{/* <div>
					{ userName }
				</div> */}

				<SearchBar onSearchSubmit={handleSearch} />

				<div className="grid grid-flow-cols md:grid-cols-2 gap-5 mt-5">
					<SearchResults searchResults={searchResults} onAdd={addTrack} />
					<Playlist 
						playlistName={playlistName}
						playlistTracks={playlistTracks} 
						onNameChange={updatePlaylistName}
						onRemove={removeTrack}
						onSave={savePlaylist}
					/>
				</div>

			</div>
		</main>
	);
}
