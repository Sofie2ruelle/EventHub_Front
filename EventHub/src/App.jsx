import { useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Events } from './pages/Events'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NotFound } from './pages/NotFound'
import EventDetails from './pages/EventDetail'


function App() {


  return (
    <Router>
    <div
     className='flex flex-col justify-between bg-pink-50 text-gray-900 min-h-screen font-sans'>
     {/* HEADER  */}
      <Header />


      {/* PAGES  */}
      <div className='min-h-full'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/events' element={<Events />} />
          <Route path='/events/:slug' element={<EventDetails />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>

       {/* FOOTER  */}
       <Footer />
       
    </div>
    </Router>
  )
}

export default App