import React from 'react'
import DashboardStats from './DashboardStats'
import CoursesAnalytics from './CoursesAnalytics'
import Reminder from './Reminder'
import Team from './Team'
import TimeTracker from './TimeTracker'
import CoursesLayout from './CoursesLayout'

const Home = () => {
  return (
    <div className=''>
      <DashboardStats/>
      <div className='grid grid-cols-12 gap-4 px-4 font-raleway'>
      <CoursesAnalytics/>
      <Reminder/>
      <Team/>
      <CoursesLayout/>
      <TimeTracker/>
      </div>

    
    </div>
  )
}

export default Home