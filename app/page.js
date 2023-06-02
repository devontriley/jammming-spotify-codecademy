"use client";

import { useState } from "react";
import Image from "next/image";

import Spotify from "@/utils/Spotify"

// Import components
import SearchBar from "@/components/SearchBar/SearchBar";
import SearchResults from "@/components/SearchResults/SearchResult";
import Playlist from "@/components/Playlist/Playlist";

import { Play } from "next/font/google";

const sampleTracks = [
  {
	id: 0,
	name: "Semi-Charmed Life",
	artist: "Third Eye Blind",
	album: "Third Eye Blind",
	uri: "spotify:track:6rqhFgbbKwnb9MLmUQDhG6"
  },
  {
	id: 1,
	name: "Zero",
	artist: "Smashing Pumpkins",
	album: "Melancholy and the Infinite Sadness",
	uri: 'spotify:track:6rqhFgbbKwnb9MLmUQDh51'
  },
  {
	id: 2,
	name: "Father of Mine",
	artist: "Everclear",
	album: "So Much For the Afterglow",
	uri: 'spotify:track:6rqhFgbbKwnb9MLmUadasdad'
  }
];

export default function Home() {
	const [searchText, setSearchText] = useState("");
	const [searchResultsTracks, setTracks] = useState([]);
	const [playlist, setPlaylist] = useState({
		name: '',
		tracks: []
	});

	const handleSearchTextChange = (value) => {
		setSearchText(value);
	};

	const handleSearchSubmit = async () => {
		if(!searchText) return
		const searchResults = await Spotify.search(searchText)
		if(searchResults.length) {
			setTracks(searchResults)
		}
	}

	return (
		<main className="min-h-screen flex justify-center py-10">
			<div className="w-9/12">

				<h1 className="text-3xl font-bold italic text-center mb-5">Jammming</h1>

				<SearchBar value={searchText} onInputChange={handleSearchTextChange} onSearchSubmit={handleSearchSubmit} />

				<div className="grid grid-flow-cols grid-cols-2 gap-5 mt-10">
					<SearchResults searchResultsTracks={searchResultsTracks} playlist={playlist} setPlaylist={setPlaylist} />
					<Playlist searchResultsTracks={searchResultsTracks} playlist={playlist} setPlaylist={setPlaylist} />
				</div>

			</div>
		</main>
	);
}
