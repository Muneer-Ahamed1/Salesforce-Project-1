import React from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './pages/Navbar'

function App() {
  return (
<div className="App container bg-slate-100 min-h-[100vh] ">
  <Navbar/>
  <Outlet/>
</div>  )
}

export default App