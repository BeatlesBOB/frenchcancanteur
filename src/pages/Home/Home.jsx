import VeterinaryList from '../../components/03 - Organisms/BrocantistList/BrocantistList'
import Heading from '../../components/01 - Atoms/Heading/Heading'
export default function Home() {
    
    return (
        <div className="home">
            <div className="home__container">
                <Heading Tag="h1">Oui</Heading>
                <h1 className="home__title">Home</h1>
                <VeterinaryList />
            </div>
        </div>
    )
}
