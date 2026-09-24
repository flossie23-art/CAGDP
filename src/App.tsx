import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './layouts/Layout'
import Loading from './components/ui/Loading'
import { AuthProvider } from './contexts/AuthContext'

const Home = lazy(() => import('./pages/Home'))
const Questionnaire = lazy(() => import('./pages/Questionnaire'))
const Results = lazy(() => import('./pages/Results'))
const Careers = lazy(() => import('./pages/Careers'))
const Courses = lazy(() => import('./pages/Courses'))
const Institutions = lazy(() => import('./pages/Institutions'))
const InstitutionDetail = lazy(() => import('./pages/InstitutionDetail'))
const Scholarships = lazy(() => import('./pages/Scholarships'))
const CareerDetail = lazy(() => import('./pages/CareerDetail'))
const CourseDetail = lazy(() => import('./pages/CourseDetail'))
const Profile = lazy(() => import('./pages/Profile'))

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/CAGDP">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="questionnaire" element={<Questionnaire />} />
              <Route path="results" element={<Results />} />
              <Route path="careers" element={<Careers />} />
              <Route path="careers/:id" element={<CareerDetail />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses/:id" element={<CourseDetail />} />
              <Route path="institutions" element={<Institutions />} />
              <Route path="institutions/:id" element={<InstitutionDetail />} />
              <Route path="scholarships" element={<Scholarships />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  )
}
