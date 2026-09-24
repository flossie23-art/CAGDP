import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../components/ui/Nav'
import Footer from '../components/ui/Footer'
import Loading from '../components/ui/Loading'
import { useAuth } from '../contexts/AuthContext'

export default function Layout() {
  const { isGuest, login } = useAuth()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav isGuest={isGuest} onLoginClick={() => login('Guest User', 'guest@example.com')} />
      <main style={{ flex: 1, padding: '2rem 0' }}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
