import { useState } from 'react'
import './style/App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import AddTask from './components/AddTask'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<h1>Task List</h1>} />
        <Route path='/add' element={<AddTask />}/>
      </Routes>
    </>
  )
}

export default App
