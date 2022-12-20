import React, { useEffect, useState } from 'react'
import { getAnimeList } from '../api'
import { AnimeItem } from './AnimeItem'
import './AnimeCard.css'
import { AnimeChart } from './AnimeChart'

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
	const [expandedCard, setExpandedCard] = useState<string | null>(null)
	const [clickedChildren, setClickedChildren] = useState<string[]>([])

	useEffect(() => {
		setClickedChildren([])
	}, [expandedCard])

	useEffect(() => {
		getAnimeList().then((data) => setAnimes(data))
	}, [])

	const handleClick = (title: string) => {
		setExpandedCard(expandedCard === title ? null : title)
		setClickedChildren([...clickedChildren, title])
	}

	return (
		<>
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
							handleClick={handleClick}
							expanded={anime.title === expandedCard}
						/>
					))}
			</div>
			<AnimeChart animes={animes} />
		</>
	)
}
