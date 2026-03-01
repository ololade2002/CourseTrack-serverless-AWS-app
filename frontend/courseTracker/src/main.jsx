import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CourseDetails from './components/dashboard/CourseDetails.jsx'
import { Toaster } from "@/components/ui/sonner"
import Dashboard from './Dashboard.jsx'
import DashboardLayout from './components/dashboard/DashboardLayout'
import Courses from '../src/Courses.jsx'
import { AuthProvider } from "react-oidc-context";
import RequireAuth from './components/dashboard/RequireAuth.jsx';

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_3jPufXkDY",
  client_id: "3j1a58ccpror7mna7fda8a7mv9",
  redirect_uri: "https://d11hc25q0b3oxs.cloudfront.net",
  response_type: "code",
  scope: "email openid phone",
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider {...cognitoAuthConfig}>
    <Router>
      <Routes>
       <Route path='/' element={<App />} />
      <Route element={<RequireAuth />}>
        <Route element={<DashboardLayout/>}>
         <Route path='/courses/:id' element={<CourseDetails/>}/>
         <Route path='/courses' element={<Courses/>}/>
         <Route path='/dashboard' element={<Dashboard/>}/>
        </Route>
      </Route>
      </Routes>
    </Router>
    <Toaster richColors position="top-right"/>
  </AuthProvider>
  </StrictMode>
)



