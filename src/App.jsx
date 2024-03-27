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
	
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<MainLayout />}>
				<Route index element={<HomePage />} />
				<Route path='/jobs' element={<JobsPage />} />
				<Route path="/jobs/:id" element={<JobPage />} loader={jobLoader} />
				<Route path="/jobs/add" element={<JobAddPage addJobOnSubmit={addJob} />} />
	
				<Route path='*' element={<NotFoundPage />} />
			</Route>
		)
	)

	return <RouterProvider router={router} />
}

export default App