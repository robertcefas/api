import { useState } from 'react'

import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Route, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

function App() {

  return (
    <>
      <Header />
      <main>
        <Route>
          <Route path='/' element={<HomePage />}/>
        </Route>
      </main>
      <Footer />
    </>
  )
}

export default App
