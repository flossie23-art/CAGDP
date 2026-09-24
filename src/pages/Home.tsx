import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { careers } from '../data/careers'
import { courses } from '../data/courses'
import { scholarships } from '../data/scholarships'
import { onlineCourses } from '../data/onlineCourses'

export default function Home() {
  const { isGuest, login } = useAuth()

  const handleGetStarted = () => {
    if (isGuest) {
      login('Guest User', 'guest@example.com')
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)',
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center',
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
            Find Your Career Path
          </h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2rem', opacity: 0.9 }}>
            Discover educational and career opportunities tailored to your interests, strengths, and goals.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/questionnaire" className="btn btn-lg" style={{ background: 'white', color: '#2563eb' }}>
              Find My Career Path
            </Link>
            <Link to="/careers" className="btn btn-lg btn-outline" style={{ borderColor: 'white', color: 'white' }}>
              Explore Careers
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 className="section-title text-center">How It Works</h2>
          <p className="section-subtitle text-center">
            Answer a few questions and get personalized recommendations
          </p>
          <div className="grid-3">
            {[
              { step: '1', title: 'Take the Questionnaire', desc: 'Answer questions about your interests, strengths, subjects, and goals.' },
              { step: '2', title: 'Get Recommendations', desc: 'Our engine analyzes your answers and suggests matching careers and courses.' },
              { step: '3', title: 'Explore Opportunities', desc: 'Discover universities, courses, scholarships, and online learning options.' },
            ].map(item => (
              <div key={item.step} className="card text-center">
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-primary)',
                  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', fontWeight: 700, margin: '0 auto 1rem'
                }}>
                  {item.step}
                </div>
                <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Recommend */}
      <section style={{ padding: '4rem 0', background: 'var(--color-surface)' }}>
        <div className="container">
          <h2 className="section-title text-center">What We Recommend</h2>
          <p className="section-subtitle text-center">
            Based on your profile, we suggest relevant careers, courses, and opportunities
          </p>
          <div className="grid-3">
            {[
              { icon: '🎯', title: 'Career Paths', desc: 'Personalized career recommendations based on your interests and strengths.' },
              { icon: '📚', title: 'Courses', desc: 'University and polytechnic courses that align with your profile.' },
              { icon: '💰', title: 'Scholarships', desc: 'Scholarship opportunities to help fund your education.' },
            ].map(item => (
              <div key={item.title} className="card text-center">
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Career Areas */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 className="section-title text-center">Popular Career Areas</h2>
          <div className="grid-4">
            {careers.slice(0, 4).map(career => (
              <Link key={career.id} to={`/careers/${career.id}`} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{career.name}</h3>
                <span className="badge" style={{ background: 'var(--color-primary)', color: 'white' }}>
                  {career.industry}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Opportunities */}
      <section style={{ padding: '4rem 0', background: 'var(--color-surface)' }}>
        <div className="container">
          <h2 className="section-title text-center">Educational Opportunities</h2>
          <div className="grid-2">
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Top Courses</h3>
              {courses.slice(0, 3).map(course => (
                <div key={course.id} className="card" style={{ marginBottom: '0.75rem' }}>
                  <h4 style={{ fontWeight: 600 }}>{course.name}</h4>
                  <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>{course.field} • {course.duration}</p>
                </div>
              ))}
            </div>
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Online Learning</h3>
              {onlineCourses.slice(0, 3).map(course => (
                <div key={course.id} className="card" style={{ marginBottom: '0.75rem' }}>
                  <h4 style={{ fontWeight: 600 }}>{course.title}</h4>
                  <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>{course.provider} • {course.level}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scholarships */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div className="flex-between" style={{ marginBottom: '2rem' }}>
            <div>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Featured Scholarships</h2>
              <p className="section-subtitle" style={{ marginBottom: 0 }}>Opportunities to fund your education</p>
            </div>
            <Link to="/scholarships" className="btn btn-outline">View All</Link>
          </div>
          <div className="grid-2">
            {scholarships.slice(0, 2).map(scholarship => (
              <div key={scholarship.id} className="card">
                <h3 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{scholarship.name}</h3>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{scholarship.provider}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge" style={{ background: 'var(--color-border)', color: 'var(--color-text)' }}>
                    📅 {scholarship.deadline}
                  </span>
                  <a href={scholarship.applicationUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                    Apply
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section style={{
        background: 'var(--color-primary)',
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center',
      }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
            Ready to Find Your Path?
          </h2>
          <p style={{ fontSize: '1.125rem', maxWidth: '500px', margin: '0 auto 2rem', opacity: 0.9 }}>
            Take the first step towards your dream career. No commitment required.
          </p>
          <Link to="/questionnaire" className="btn btn-lg" style={{ background: 'white', color: 'var(--color-primary)' }}>
            Start the Questionnaire
          </Link>
        </div>
      </section>
    </div>
  )
}
