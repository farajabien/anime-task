import { useEffect, useState } from 'react'
import './AnimeCard.css'

interface IAppProps {
	title: string
	rank: number
	imageCover: string
	airedFrom: string
	airedUntil: string
	rating: string
	handleClick: (title: string) => void
	expanded: boolean
}

export function AnimeItem(props: IAppProps) {
	const [isExpanded, setIsExpanded] = useState(false)

	useEffect(() => {
		setIsExpanded(props.expanded)
	}, [props.expanded])

	const handleClick = () => {
		props.handleClick(props.title)
	}

	const convertDate = (date: string) => {
		const date_ = new Date(date)
		const formattedDate = date_.toLocaleDateString('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		})

		return formattedDate
	}

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
							{props.airedUntil === undefined ||
							null ||
							new Date(props.airedUntil).getTime() > Date.now()
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
