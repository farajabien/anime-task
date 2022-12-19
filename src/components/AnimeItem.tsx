import { useEffect, useState } from 'react'
import './AnimeCard.css'

interface IAppProps {
	title: string
	rank: number
	imageCover: string
	airedFrom: string
	airedUntil: string
	rating: string
}

export function AnimeItem(props: IAppProps) {
	const [isExpanded, setIsExpanded] = useState(false)

	const handleClick = () => {
		setIsExpanded((prev) => !prev)
	}

	const convertDate = (date: string) => {
		const date_ = new Date(date)
		// Use the toLocaleDateString method to format the date
		const formattedDate = date_.toLocaleDateString('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		})

		return formattedDate
	}

	useEffect(() => {
		const date = new Date(props.airedFrom)
	}, [props])

	return (
		<div
			className={`anime-card ${isExpanded ? 'expanded' : ''}`}
			onClick={handleClick}>
			<img src={props.imageCover} alt={props.title} />
			<div>
				<div className='title'>{props.title}</div>
				<div className='rank'>{props.rank}</div>
				{isExpanded && (
					<div className='expandedItems'>
						<div className='airedFrom'>
							<strong>Release: </strong>
							{convertDate(props.airedFrom)}
						</div>
						<div className='airedUntil'>
							<strong>Latest: </strong>
							{props.airedUntil === undefined || null
								? 'now'
								: convertDate(props.airedUntil)}
						</div>
						<div className='rating'>
							<strong>Rating: </strong>
							{props.rating}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
