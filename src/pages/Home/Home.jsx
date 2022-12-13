import './Home.scss'
import Map from "../../components/02 - Molecules/Map/Map"
import Brocantist from "../../components/03 - Organisms/Brocantist/Brocantist"
import { useOutletContext } from 'react-router-dom'
import { useEffect } from 'react'

export default function Home() {    
    const {distance} = useOutletContext()

    return (
        <main className="home">
            <Map />
            <Brocantist distance={distance} />
        </main>
    )
}
