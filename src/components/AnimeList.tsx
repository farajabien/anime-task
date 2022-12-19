import React, { useEffect, useState } from 'react'
import { getAnimeList } from '../api'
import { AnimeItem } from './AnimeItem'
import './AnimeCard.css'

interface Anime {
	rank: number
	images: {
		jpg: {
			image_url: string
		}
	}
	title: string
	aired: {
		from: string
		to: string
	}
	rating: string
}

export function AnimeList() {
	const [animes, setAnimes] = useState<Anime[]>([])

	useEffect(() => {
		getAnimeList().then((data) => setAnimes(data))
	}, [])

	useEffect(() => {
		console.log('First: ', animes[0])
	}, [animes])

	return (
		<div className='container'>
			{animes &&
				animes.map((anime, idx) => (
					<AnimeItem
						key={idx}
						title={anime.title}
						rank={anime.rank}
						imageCover={anime.images.jpg.image_url}
						airedFrom={anime.aired.from}
						airedUntil={anime.aired.to}
						rating={anime.rating}
					/>
				))}
		</div>
	)
}
