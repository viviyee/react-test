import React from 'react'
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider
} from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import JobsPage from './pages/JobsPage'
import JobPage, { jobLoader } from './pages/JobPage'
import JobAddPage from './pages/JobAddPage'
import NotFoundPage from './pages/NotFoundPage'
import JobEditPage from './pages/JobEditPage'


const App = () => {

	const addJob = async (newJob) => {
		const res = await fetch('/api/jobs', {
			method: 'POST',
			headers: {
				'Content-Type': "application/json"
			},
			body: JSON.stringify(newJob)
		})
		return;
	}

	const deleteJob = async (id) => {
		const res = await fetch(`/api/jobs/${id}`, {
			method: "DELETE"
		})
		return;
	}

	const updateJob = async (job) => {
		const res = await fetch(`/api/jobs/${job.id}`, {
			method: "PATCH",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(job)
		})
		return;
	}
	
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<MainLayout />}>
				<Route index element={<HomePage />} />
				<Route path='/jobs' element={<JobsPage />} />
				<Route path="/jobs/:id" element={<JobPage deleteJob={ deleteJob}/>} loader={jobLoader}  />
				<Route path="/jobs/:id/edit" element={<JobEditPage updateJobOnSubmit={updateJob} />} loader={jobLoader} />
				<Route path="/jobs/add" element={<JobAddPage addJobOnSubmit={addJob} />} />
	
				<Route path='*' element={<NotFoundPage />} />
			</Route>
		)
	)

	return <RouterProvider router={router} />
}

export default App