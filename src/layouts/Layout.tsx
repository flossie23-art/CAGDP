import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../components/ui/Nav'
import Footer from '../components/ui/Footer'
import Loading from '../components/ui/Loading'

export default function Layout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <main style={{ flex: 1, padding: '2rem 0' }}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
