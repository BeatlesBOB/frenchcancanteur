import './Main.scss'
import Sidebar from '../../03 - Organisms/Sidebar/Sidebar'
import { Outlet } from "react-router-dom"
import { useState } from 'react'

export default function Main() {
  const [distance,setDistance] = useState(3)

  const handleDistance = (e) => {
    setDistance(e.currentTarget.value)
  }

  return (
    <div className="main">
        <div className="main__container">
            <Sidebar handleDistance={handleDistance} />
            <Outlet context={{distance}} />
        </div>
    </div>
  )
}
