import React, { useEffect, useState } from 'react'
import * as _ from 'lodash'

import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts'

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

interface IAppProps {
	animes: Anime[]
}

export function AnimeChart(props: IAppProps) {
	const [chartData, setChartData] = useState<
		{ year: number; numAnime: number; animeTitles: string[] }[]
	>([])
	useEffect(() => {
		const groupedData = _.groupBy(props.animes, (anime: Anime) => {
			const date = new Date(anime.aired.from)
			return date.getFullYear()
		})

		const data = Object.keys(groupedData).map((year) => ({
			year: Number(year),
			numAnime: groupedData[year].length,
			animeTitles: groupedData[year].map((a) => a.title),
		}))
		const sortedData = _.sortBy(data, (d) => d.year)
		setChartData(sortedData)
	}, [props.animes])

	return (
		<div className='chart'>
			<AreaChart width={1300} height={400} data={chartData}>
				<defs>
					<linearGradient id='color' x1='0' y1='0' x2='1' y2='0'>
						<stop offset='5%' stopColor='#ff73a9' stopOpacity={0.7} />
						<stop offset='95%' stopColor='#000a9f' stopOpacity={0.7} />
					</linearGradient>
				</defs>
				<XAxis dataKey='year' tickFormatter={(year) => year.toString()} />
				<YAxis />
				<CartesianGrid vertical={false} strokeDasharray='3 0' />
				<Tooltip
					labelFormatter={(label) => {
						const animeTitles = chartData.find(
							(d) => d.year === label
						)?.animeTitles
						return (
							<div className='animeTitles'>
								<strong>{label}</strong>
								{animeTitles &&
									animeTitles.map((animeTitle) => <div>{animeTitle}</div>)}
							</div>
						)
					}}
				/>
				<Legend />
				<Area
					type='monotone'
					dataKey='numAnime'
					stroke='#8884d8'
					fill='url(#color)'
					activeDot={{ r: 8 }}
				/>
				<linearGradient id='colorUv' to='#82ca9d' />
			</AreaChart>
		</div>
	)
}
