import React from 'react'
import { useState, useEffect } from 'react'

import JobCard from './JobCard'
import Spinner from './Spinner'

const JobListings = ({ isJobsPage = true }) => {
	const [jobs, setJobs] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchJobs = async () => {
			try {
				const limit = isJobsPage ? '' : '?_limit=3'
				const res = await fetch('/api/jobs'+limit)
				const data = await res.json()
				setJobs(data)
			} catch (error) {
				console.log('fetchJobs error', error)
			} finally {
				setLoading(false)
			}
		}

		setTimeout(fetchJobs, 500)

	}, [])

	// const jobListings = isJobsPage ? jobsJson.jobs : jobsJson.jobs.slice(0, 3)
	return (
		<section className="bg-blue-50 px-4 py-10">
			<div className="container-xl lg:container m-auto">
				<h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
					{isJobsPage ? 'Browse Jobs' : 'Recent Jobs'}
				</h2>
			
				{loading ? (
					<Spinner loading={loading} />
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{jobs.map((job) => (
							<JobCard key={job.id} job={job} />
						))}
					</div>
				)}
			</div>
		</section>
	)
}

export default JobListings